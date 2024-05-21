import {
    Rule,
    SchematicContext,
    Tree,
    noop
} from '@angular-devkit/schematics';

import {
    asObservable
} from '../utils';

import {
    addDeclarationToNgModule,
    addToPackageJson,
    withBase,
    ComponentTemplate 
} from '../rules';


const prepareTemplates: ComponentTemplate = (_context: SchematicContext) => 
    asObservable({
        templateContent: ''
    });

export function testComponent(options: any): Rule {
    return withBase(prepareTemplates, noop())(options);
}