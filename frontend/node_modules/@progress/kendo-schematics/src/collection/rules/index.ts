import {
    Rule,
    Tree,
    SchematicContext,
    apply,
    branchAndMerge,
    chain,
    template,
    filter,
    mergeWith,
    url,
    noop
} from '@angular-devkit/schematics';

import { strings } from '@angular-devkit/core';

import * as ts from 'typescript';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {
    addDeclarationToModule,
    asObservable,
    buildSelector,
    folderName,
    stringify
} from '../utils';

export function applyChanges(host: Tree, path: string, changes: any[]): void {
    const recorder = host.beginUpdate(path);

    for (const change of changes) {
        recorder.insertLeft(change.position, change.toAdd);
    }

    host.commitUpdate(recorder);
}

export function addDeclarationToNgModule(options: any): Rule {
    return (host: Tree) => {
        const modulePath = options.module;

        if (!modulePath) {
            return host;
        }

        const sourceText = host.read(modulePath).toString('utf-8');
        const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
        const changes = addDeclarationToModule({
            source,
            symbolName: options.symbolName,
            modulePath: options.symbolImport
        });

        applyChanges(host, modulePath, changes);

        return host;
    }
}

export function addToPackageJson(options: any): Rule {
    return (host: Tree) => {
        if (!host.exists('package.json')) return host;

        const dependencies: object = options.dependencies;
        const text = host.read('package.json').toString('utf-8');
        const json = JSON.parse(text);

        json['dependencies'] = Object.assign({}, json['dependencies'], dependencies);

        host.overwrite('package.json', stringify(json));

        return host;
    }
}

const inlineTemplate = ({ inlineTemplate }) =>
    inlineTemplate ? filter((path: string) => !path.endsWith('html')) : noop();

const inlineStyle = ({ inlineStyle }) =>
    inlineStyle ? filter((path: string) => !path.endsWith('__styleext__')) : noop();

export type ComponentTemplate = (context: SchematicContext) => Observable<{}>;

export function withBase(componentTemplate: ComponentTemplate, rules: Rule): Function {
    return (options: any) => (host: Tree, context: SchematicContext) => {
        const extendTemplateContext = (additional = {}) => template({
            ...strings,
            ...options,
            'folder-name': folderName(options),
            'full-path': `${options.sourceDir}/${options.path}`,
            selector: buildSelector(options),
            ...additional
        });

        const baseComponent = (templateContext: any) => {
            const templateSource = apply(url('../component/files'), [
                inlineTemplate(options),
                inlineStyle(options),
                extendTemplateContext(templateContext)
            ]);

            const allRules = chain([
                branchAndMerge(mergeWith(templateSource)),
                rules
            ]);

            return asObservable(allRules(host, context));
        }

        return componentTemplate(context).pipe(
            switchMap(baseComponent)
        );
    }
}
