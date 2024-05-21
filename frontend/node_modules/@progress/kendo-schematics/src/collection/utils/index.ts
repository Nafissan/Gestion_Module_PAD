import { strings } from '@angular-devkit/core';
import { Tree, SchematicsException } from '@angular-devkit/schematics';

import { Observable, of } from 'rxjs';

export {
    addSymbolToMetadata,
    addDeclarationToModule,
    addExportToModule,
    addImportToModule
} from './ast-utils';

export {
    findModule
} from './find-module';

export * from './workspace';

export { getAppModulePath } from './bootstrap-module';

export const folderName = (options: any) => (name: string) =>
  options.flat ? '' : strings.dasherize(name);

const prefix = (pre: string, name: string) =>
    (pre ? `${pre}-` : '') + name;

export const buildSelector = (options: any) => {
    const name = options.selector || strings.dasherize(options.name);

    return prefix(options.prefix, name);
}

export function stringify(json: any): string {
  return `${JSON.stringify(json, null, 2)}\n`;
}

declare const Symbol: Symbol & {
  readonly observable: symbol;
}

function isObservable(thunk: any): thunk is Observable<any> {
    if (!thunk || typeof thunk !== 'object') {
        return false;
    }

    if (Symbol.observable && Symbol.observable in thunk) {
        return true;
    }

    return typeof thunk.subscribe === 'function';
}

export function asObservable<T>(thunk: T): Observable<T> {
    if (isObservable(thunk)) {
        return thunk;
    }

    return of(thunk);
}

export function fileContent(tree: Tree, path: string): string {
    const content = tree.read(path);

    if (content === null) {
        throw new SchematicsException(`File ${path} does not exist.`);
    }

    return content.toString('utf-8');
}
