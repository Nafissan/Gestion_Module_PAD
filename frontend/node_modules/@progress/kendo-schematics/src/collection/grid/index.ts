import {
    Rule,
    SchematicContext,
    Tree,
    chain,
    url
} from '@angular-devkit/schematics';

import { map } from 'rxjs/operators';

import {
    asObservable
} from '../utils';

import {
    addDeclarationToNgModule,
    addToPackageJson,
    withBase,
    ComponentTemplate 
} from '../rules';

const packageDeps = {
    "@progress/kendo-angular-grid": "latest"
};

const templateSource = url('files');
const templateContent = (t: Tree) => ({ 
    templateContent: t.read('content.tmpl').toString() 
});
const prepareTemplates: ComponentTemplate = (context: SchematicContext) =>
    asObservable(templateSource(context)).pipe(
        map(templateContent)
    );

export function grid(options: any): Rule {
    const moduleOptions = {
        module: options.module,
        symbolName: 'BarComponent',
        symbolImport: '@progress/kendo-bar'
    }; //resolve declr, imports, exports, etc.
    const dependencies = {}; //resolve package deps.

    const rules = chain([
        addDeclarationToNgModule(moduleOptions),
        addToPackageJson({ dependencies })
    ]);

    return withBase(prepareTemplates, rules)(options);
}
