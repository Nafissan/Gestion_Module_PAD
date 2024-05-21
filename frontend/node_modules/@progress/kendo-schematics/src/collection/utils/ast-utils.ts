import * as ts from 'typescript';

type ModuleOptions = {
    source: ts.SourceFile,
    symbolName: string,
    modulePath?: string
};

export const addDeclarationToModule = (options: ModuleOptions) =>
    addToModule('declarations', options);

export const addImportToModule = (options: ModuleOptions) =>
    addToModule('imports', options);

export const addExportToModule = (options: ModuleOptions) =>
    addToModule('exports', options);

const addToModule = (metadataField: string, options: ModuleOptions) => {
    const result = addSymbolToMetadata(options.source, metadataField, options.symbolName);

    if (options.modulePath) {
        return result.concat(insertImport(options.source, options.symbolName, options.modulePath));
    }

    return result;
}

export const ngModuleMetadata = (source: ts.SourceFile) => {
    const decorator = decoratorMetadata(source, 'NgModule')
        .filter(node => ofKind(node.arguments[0], ts.SyntaxKind.ObjectLiteralExpression))[0];

    if (!decorator) { return null; }

    return decorator.arguments[0] as ts.ObjectLiteralExpression;
}

export const addSymbolToMetadata = (source: ts.SourceFile, metadataField: string, symbolName: string) => {
    if (!symbolName) return [];

    const node = ngModuleMetadata(source);

    if (!node) { return []; }

    const property = findProperty(node.properties, metadataField);

    if (!property) {
        return [
            addMetaField(node, `${metadataField}: [${symbolName}]`)
        ];
    }

    if (!ofKind(property.initializer, ts.SyntaxKind.ArrayLiteralExpression)) {
        //We cannot handle it if is not a array literal
        return [];
    }

    const elements = (<ts.ArrayLiteralExpression>property.initializer).elements;

    if (elements.length === 0) {
        return [{
            position: property.initializer.getEnd() - 1,
            toAdd: symbolName
        }];
    }

    const exists = elements.map(e => e.getText()).find(t => t === symbolName);

    //already there
    if (exists) { return []; }

    return [
        format(elements, symbolName)
    ];
}

const addMetaField = (node: ts.ObjectLiteralExpression, text: string) => {
    if (node.properties.length === 0) {
        return {
            position: node.getEnd() - 1,
            toAdd: text
        };
    }

    return format(node.properties, text);
}

const format = (nodes: ts.NodeArray<any>, text: string) => {
    let toAdd = `, ${text}`;

    const lastNode = nodes[nodes.length - 1];
    const matches = lastNode.getFullText().match(/^\r?\n\s*/);

    if (matches && matches.length > 0) {
        toAdd = `,${matches[0]}${text}`;
    }

    return {
        position: lastNode.getEnd(),
        toAdd
    };
}

const formatNode = (node: ts.Node, text: string) => {
    let toAdd = `${text}`;

    return {
        position: node.getStart(),
        toAdd
    };
}

const anyOf = (kind: ts.SyntaxKind, possible: ts.SyntaxKind[]): boolean =>
    possible.reduce((result, current) => result || current === kind, false);

const ofKind = (node: ts.Node, ...kinds: ts.SyntaxKind[]): boolean =>
    node && anyOf(node.kind, kinds);

const isNgModelIdentifier = (node: ts.Node, name: string) =>
    ofKind(node, ts.SyntaxKind.Identifier) && node.getText() === name;

export function findNode(node: ts.Node, kind: ts.SyntaxKind, text: string): ts.Node | null {
    if (node.kind === kind && node.getText() === text) {
        return node;
    }

    let foundNode: ts.Node | null = null;
    ts.forEachChild(node, childNode => {
        foundNode = foundNode || findNode(childNode, kind, text);
    });

    return foundNode;
}
      
export const nodesByKind = (source: ts.Node, kind: ts.SyntaxKind): ts.Node[] =>  {
    const nodes = [source];
    const result = [];
    let node: ts.Node;

    while (node = nodes.shift()) {
        if (ofKind(node, kind)) {
            result.push(node);
        }

        if (node.getChildCount()) {
            nodes.unshift(...node.getChildren());
        }
    }

    return result;
}

const findProperty = (props: ts.NodeArray<ts.ObjectLiteralElementLike>, metadataField: string) =>
    props
        .filter(prop => ofKind(prop, ts.SyntaxKind.PropertyAssignment))
        .filter(prop => {
            const name = prop.name;

            if (ofKind(name, ts.SyntaxKind.Identifier)) {
                return (<ts.Identifier>name).text === metadataField;
            }

            if (ofKind(name, ts.SyntaxKind.StringLiteral)) {
                return (<ts.StringLiteral>name).text === metadataField;
            }

            return false;
        })[0]  as ts.PropertyAssignment;

const decoratorMetadata = (source: ts.SourceFile, name: string) =>
    nodesByKind(source, ts.SyntaxKind.Decorator)
        .map(decorator => (<ts.Decorator>decorator).expression)
        .filter(expression => expression.kind === ts.SyntaxKind.CallExpression)
        .map(expression => expression as ts.CallExpression)
        .filter(node => {
            //@NgModule({ ... })
            let expr = node.expression;

            //@foo.NgModule({ ... })
            if (expr.kind === ts.SyntaxKind.PropertyAccessExpression) {
                expr = (<ts.PropertyAccessExpression>expr).name;
            }

            return isNgModelIdentifier(expr, name);
        });

export const insertImport = (source: ts.SourceFile, symbolName: string, importFrom: string) => {
    const isSideEffectsImport = !symbolName;
    const allImports = nodesByKind(source, ts.SyntaxKind.ImportDeclaration);

    const imports = allImports
        .filter(node => node.getChildren()
                .filter(child => ofKind(child, ts.SyntaxKind.StringLiteral))
                .map(child => (<ts.StringLiteral>child).text)
                .indexOf(importFrom) !== -1);

    if (imports.length) {
        return exitExisting(imports, symbolName);
    }

    let position = 0;
    let prefix = '';

    if (allImports.length) {
        position = allImports[allImports.length - 1].getEnd();
        prefix = '\n';
    } else {
        const useStrict = useStrictNode(source);

        if (useStrict.length) {
            position = useStrict[0].getEnd();
            prefix = '\n';
        }
    }

    // missing module declaration
    const toAdd = isSideEffectsImport ?
        `${prefix}import '${importFrom}';\n` :
        `${prefix}import { ${symbolName} } from '${importFrom}';\n`;

    return [{
        position,
        toAdd
    }];
}

const useStrictNode = (source: ts.SourceFile) =>
    nodesByKind(source, ts.SyntaxKind.StringLiteral)
        .filter(node => (node as ts.StringLiteral).text === 'use strict');

const exitExisting = (imports: ts.Node[], symbolName: string) => {
    const importAsterisk = imports.reduce((acc, cur) =>
    acc || nodesByKind(cur, ts.SyntaxKind.AsteriskToken).length > 0, false);

    // symbol is imported with * from the module
    // e.g import * from '...';
    if (importAsterisk) { return []; }

    const importsText = imports.reduce((acc, cur) =>
        [...acc, ...nodesByKind(cur, ts.SyntaxKind.Identifier)], [])
        .filter(node => (<ts.Identifier>node).text === symbolName);

    // module declaration
    // symbol is not imported
    if (importsText.length === 0) {
        const namedImport = nodesByKind(imports[0], ts.SyntaxKind.NamedImports)[0]  as ts.NamedImports;

        if (!namedImport) {
            // it should be import 'some-package';
            return [];
        }

        if (!namedImport.elements.length) {
            return [
                formatNode(namedImport.getLastToken(), symbolName)
            ];
        }

        return [
            format(namedImport.elements, symbolName)
        ];
    }

    // symbol already imported from the module
    return [];
}
