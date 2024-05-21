import * as ts from 'typescript';
import { dirname } from 'path';
import { normalize } from '@angular-devkit/core';
import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { fileContent } from '.';
import { nodesByKind, findNode } from './ast-utils';

export function getAppModulePath(host: Tree, mainPath: string): string {
    const moduleRelativePath = findBootstrapModulePath(host, mainPath);
    const mainDir = dirname(mainPath);
    const modulePath = normalize(`/${mainDir}/${moduleRelativePath}.ts`);

    return modulePath;
}

export function findBootstrapModuleCall(host: Tree, mainPath: string): ts.CallExpression | null {
    const sourceText = fileContent(host, mainPath);
    const source = ts.createSourceFile(mainPath, sourceText, ts.ScriptTarget.Latest, true);

    const calls = nodesByKind(source, ts.SyntaxKind.CallExpression)
        .filter(call => findNode(call, ts.SyntaxKind.Identifier, 'bootstrapModule'));
    
    return calls[calls.length - 1] as ts.CallExpression;
}

export function findBootstrapModulePath(host: Tree, mainPath: string): string {
    const bootstrapCall = findBootstrapModuleCall(host, mainPath);

    if (!bootstrapCall) {
      throw new SchematicsException('Bootstrap call not found');
    }
  
    const bootstrapModule = bootstrapCall.arguments[0];
  
    const mainBuffer = host.read(mainPath);
    if (!mainBuffer) {
      throw new SchematicsException(`Client app main file (${mainPath}) not found`);
    }
    const mainText = mainBuffer.toString('utf-8');
    const source = ts.createSourceFile(mainPath, mainText, ts.ScriptTarget.Latest, true);
    const allImports = nodesByKind(source, ts.SyntaxKind.ImportDeclaration);
    const bootstrapModuleRelativePath = allImports 
      .filter(node => node.kind === ts.SyntaxKind.ImportDeclaration)
      .filter(imp => {
        return findNode(imp, ts.SyntaxKind.Identifier, bootstrapModule.getText());
      })
      .map((imp: ts.ImportDeclaration) => {
        const modulePathStringLiteral = <ts.StringLiteral> imp.moduleSpecifier;
  
        return modulePathStringLiteral.text;
      })[0];
  
    return bootstrapModuleRelativePath;
  }