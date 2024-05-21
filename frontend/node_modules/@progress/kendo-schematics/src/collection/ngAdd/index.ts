import { chain, Rule, SchematicContext, TaskId, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask,  } from '@angular-devkit/schematics/tasks';
import * as ts from 'typescript';
import { addToPackageJson, applyChanges } from '../rules';
import { addExportToModule, addImportToModule, fileContent, getAppModulePath, resolveProject } from '../utils';
import { Dependency, Schema as RegisterSchema } from './schema';
import { importTheme } from './theming';


const readSource = (modulePath: string) => (tree: Tree): ts.SourceFile => {
    const sourceText = fileContent(tree, modulePath);

    return ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
}

function updateNgModule(host: Tree, moduleToUpdate: string, data: Dependency) {
    const read = readSource(moduleToUpdate);

    const changes = addImportToModule({
        source: read(host),
        symbolName: data.import,
        modulePath: data.from
    });

    applyChanges(host, moduleToUpdate, changes);

    if (data.export) {
        const changes = addExportToModule({
            source: read(host),
            symbolName: data.import,
            modulePath: data.from
        });

        applyChanges(host, moduleToUpdate, changes);
    }
}

const runner = (deps, callback) => (...options) => 
    deps.forEach(dep => {
        if (!dep.hasOwnProperty('condition') || dep.condition) {
            callback(...options, dep);
        }
    });

function importAllModules(options: RegisterSchema): Rule {
    return (host: Tree) => {
        const moduleToUpdate = options.module;

        if (!moduleToUpdate) return host;

        const dependencies = [
            {
                import: options.mainNgModule,
                from: `@progress/kendo-angular-${options.package}`,
                export: options.export
            },
            {
                import: 'BrowserAnimationsModule',
                from: '@angular/platform-browser/animations'
            },
            {
                from: 'hammerjs',
                condition: options.importHammerjs
            },
            ...options.dependencies
        ];

        const run = runner(dependencies, updateNgModule);

        run(host, moduleToUpdate)

        return host;
    }
}

function npmInstall(options: RegisterSchema): Rule {
    return (host: Tree, context: SchematicContext) => {
        if (options.skipInstall) return;

        const installTask = context.addTask(new NodePackageInstallTask());
        if (needsLocalize(host)) {
            context.addTask(
                new RunSchematicTask('@angular/localize', 'ng-add', { project: options.project }),
                [ installTask ]
            );
        }
    }
}

const progressDependencies = (json: any, importHammerjs?: boolean) => {
    const hammerRegEx = importHammerjs ? '|hammerjs' : '';
    const validator = new RegExp(`^(@progress.*${hammerRegEx})$`);

    return Object.entries(json.peerDependencies)
        .filter(([k]) => validator.test(k))
        .reduce((s, [k, v]) => (s[k] = v, s), {});
}

function getPackageVersion(tree: Tree, name: string): string {
    if (!tree.exists('package.json')) {
        return null;
    }

    const packageJson = JSON.parse(fileContent(tree, 'package.json'));

    if (packageJson.dependencies && packageJson.dependencies[name]) {
        return packageJson.dependencies[name];
    }

    return null;
}

function getAngularVersionString(tree: Tree): string {
    return getPackageVersion(tree, '@angular/core');
}

function getAngularMajorVersion(tree: Tree): number {
    const version = getAngularVersionString(tree);
    if (!version) {
        return null;
    }

    const major = version.match(/(\d+)\./);
    if (major !== null && major.length === 2) {
        return parseInt(major[1], 10);
    }

    return null;
}

function needsLocalize(tree: Tree): boolean {
    const version = getAngularMajorVersion(tree);
    return version >= 9 || version === null;
}

function registerInPackageJson(options: RegisterSchema): Rule {
    return (tree: Tree, context: SchematicContext) => {
        const fullPackageName = `kendo-angular-${options.package}`;
        const content = fileContent(tree, `node_modules/@progress/${fullPackageName}/package.json`);

        const dependencies = {
            ...progressDependencies(JSON.parse(content), options.importHammerjs),
            ...options.peerDependencies
        };

        if (needsLocalize(tree)) {
            dependencies['@angular/localize'] = getAngularVersionString(tree);
        }

        return addToPackageJson({ dependencies })(tree, context);
    }
}

export function ngAdd(options: RegisterSchema): Rule {
    return (host: Tree, context: SchematicContext) => {
        const project = resolveProject(host, options.project);
        const targets = project.architect || (<any> project).targets;
        const mainPath = targets.build.options.main;

        options.module = getAppModulePath(host, mainPath);

        const toInstall = chain([
            registerInPackageJson(options),
            importTheme(options),
            npmInstall(options) //install as a last rule
        ]);

        return chain([
            importAllModules(options),
            toInstall
        ])(host, context);
    }
}
