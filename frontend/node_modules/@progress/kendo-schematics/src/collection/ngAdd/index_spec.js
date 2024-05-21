"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const testing_1 = require("@angular-devkit/schematics/testing");
const path = require("path");
const test_1 = require("../utils/test");
const utils_1 = require("../utils");
const collectionPath = path.join(__dirname, '../../collection.json');
const fileContent = (tree, path) => tree.get(path).content.toString();
const createAppTree = (options) => {
    let appTree = test_1.createCliConfig(schematics_1.Tree.empty(), options);
    appTree = test_1.createAppModule(appTree);
    appTree = test_1.createMainBootstrap(appTree);
    appTree = test_1.createPackageJson(appTree);
    return appTree;
};
describe('ng add', () => {
    const runner = new testing_1.SchematicTestRunner('@progress/kendo-schematics', collectionPath);
    const defaultOptions = {
        package: 'grid',
        mainNgModule: 'GridModule',
        peerDependencies: {},
        project: 'cli6',
        export: false,
        skipInstall: true // `true` just for the tests
    };
    let appTree;
    beforeEach(() => {
        appTree = createAppTree({ useTargets: false });
    });
    it('imports package modules in app NgModule', () => {
        const options = Object.assign({}, defaultOptions);
        const tree = runner.runSchematic('ng-add', options, appTree);
        const content = fileContent(tree, '/src/app/app.module.ts');
        expect(content).toMatch(/imports: \[GridModule, BrowserAnimationsModule]/);
        expect(content).toMatch("import { GridModule } from '@progress/kendo-angular-grid';");
        expect(content).toMatch("import { BrowserAnimationsModule } from '@angular/platform-browser/animations';");
        expect(content).not.toMatch("import 'hammerjs';");
    });
    it('imports hammerjs in app NgModule', () => {
        const options = Object.assign({}, defaultOptions, { importHammerjs: true });
        const tree = runner.runSchematic('ng-add', options, appTree);
        const content = fileContent(tree, '/src/app/app.module.ts');
        expect(content).toMatch("import 'hammerjs';");
        expect(content).toMatch(/imports: \[GridModule, BrowserAnimationsModule]/);
    });
    it('imports additional modules in app NgModule', () => {
        const options = Object.assign({}, defaultOptions, { dependencies: [
                {
                    import: 'MyModule',
                    from: 'MyPackage'
                },
                {
                    import: 'MyModuleFromMyPackage',
                    from: 'MyPackage'
                },
                {
                    import: 'MyOtherModule',
                    from: 'MyOtherPackage'
                }
            ] });
        const tree = runner.runSchematic('ng-add', options, appTree);
        const content = fileContent(tree, '/src/app/app.module.ts');
        expect(content).toMatch(/imports: \[GridModule, BrowserAnimationsModule, MyModule, MyModuleFromMyPackage, MyOtherModule]/);
        expect(content).toMatch("import { GridModule } from '@progress/kendo-angular-grid';");
        expect(content).toMatch("import { BrowserAnimationsModule } from '@angular/platform-browser/animations';");
        expect(content).toMatch("import { MyModule, MyModuleFromMyPackage } from 'MyPackage';");
        expect(content).toMatch("import { MyOtherModule } from 'MyOtherPackage';");
    });
    it('exports package modules from app NgModule', () => {
        const options = Object.assign({}, defaultOptions, { export: true });
        const tree = runner.runSchematic('ng-add', options, appTree);
        const content = fileContent(tree, '/src/app/app.module.ts');
        expect(content).toMatch(/exports: \[GridModule]/);
    });
    it('imports the theme', () => {
        const options = Object.assign({}, defaultOptions, { theme: 'material' });
        const tree = runner.runSchematic('ng-add', options, appTree);
        const workspace = utils_1.getWorkspace(tree);
        const project = utils_1.getProjectFromWorkspace(workspace, options.project);
        const styles = project.architect.build.options.styles;
        expect(styles[0].input).toMatch(/kendo-theme-material/);
    });
    it('imports the theme once', () => {
        const options = Object.assign({}, defaultOptions, { theme: 'default' });
        const packageJSON = utils_1.stringify({
            dependencies: {
                '@progress/kendo-theme-material': 'latest'
            }
        });
        appTree.create('package.json', packageJSON);
        const tree = runner.runSchematic('ng-add', options, appTree);
        const workspace = utils_1.getWorkspace(tree);
        const project = utils_1.getProjectFromWorkspace(workspace, options.project);
        const styles = project.architect.build.options.styles;
        expect(styles).toEqual(['src/styles.css']);
    });
    it('updates package.json', () => {
        const options = Object.assign({}, defaultOptions, { theme: 'material' });
        const packageJSON = utils_1.stringify({
            dependencies: {}
        });
        appTree.create('package.json', packageJSON);
        const tree = runner.runSchematic('ng-add', options, appTree);
        const json = JSON.parse(fileContent(tree, 'package.json')).dependencies;
        expect(json['@progress/kendo-theme-material']).toBe('latest');
        expect(json['@progress/kendo-dependency']).toBe('^1.0.0');
        expect(json['hammerjs']).toBe(undefined);
    });
    it('adds @angular/localize for Angular 9.x projects', () => {
        const options = Object.assign({}, defaultOptions, { theme: 'material' });
        const packageJSON = utils_1.stringify({
            dependencies: {
                '@angular/core': '^9.1.2'
            }
        });
        appTree.create('package.json', packageJSON);
        const tree = runner.runSchematic('ng-add', options, appTree);
        const json = JSON.parse(fileContent(tree, 'package.json')).dependencies;
        expect(json['@angular/localize']).toBe('^9.1.2');
    });
    it('adds @angular/localize for Angular 10.x projects', () => {
        const options = Object.assign({}, defaultOptions, { theme: 'material' });
        const packageJSON = utils_1.stringify({
            dependencies: {
                '@angular/core': '^10.2.3'
            }
        });
        appTree.create('package.json', packageJSON);
        const tree = runner.runSchematic('ng-add', options, appTree);
        const json = JSON.parse(fileContent(tree, 'package.json')).dependencies;
        expect(json['@angular/localize']).toBe('^10.2.3');
    });
    it('adds @angular/localize for Angular projects with tagged version', () => {
        const options = Object.assign({}, defaultOptions, { theme: 'material' });
        const packageJSON = utils_1.stringify({
            dependencies: {
                '@angular/core': 'next'
            }
        });
        appTree.create('package.json', packageJSON);
        const tree = runner.runSchematic('ng-add', options, appTree);
        const json = JSON.parse(fileContent(tree, 'package.json')).dependencies;
        expect(json['@angular/localize']).toBe('next');
    });
    it('does not adds @angular/localize for Angular 8.x projects', () => {
        const options = Object.assign({}, defaultOptions, { theme: 'material' });
        const packageJSON = utils_1.stringify({
            dependencies: {
                '@angular/core': '^8.1.2'
            }
        });
        appTree.create('package.json', packageJSON);
        const tree = runner.runSchematic('ng-add', options, appTree);
        const json = JSON.parse(fileContent(tree, 'package.json')).dependencies;
        expect(json['@angular/localize']).toBe(undefined);
    });
    it('update package.json with hammerjs', () => {
        const options = Object.assign({}, defaultOptions, { theme: 'material', importHammerjs: true });
        const packageJSON = utils_1.stringify({
            dependencies: {}
        });
        appTree.create('package.json', packageJSON);
        const tree = runner.runSchematic('ng-add', options, appTree);
        const json = JSON.parse(fileContent(tree, 'package.json')).dependencies;
        expect(json['@progress/kendo-theme-material']).toBe('latest');
        expect(json['@progress/kendo-dependency']).toBe('^1.0.0');
        expect(json['hammerjs']).toBe('^2.0.0');
    });
    describe('in projects with "targets"', () => {
        beforeEach(() => {
            appTree = createAppTree({ useTargets: true });
        });
        it('imports the theme', () => {
            const options = Object.assign({}, defaultOptions, { theme: 'material' });
            const tree = runner.runSchematic('ng-add', options, appTree);
            const workspace = utils_1.getWorkspace(tree);
            const project = utils_1.getProjectFromWorkspace(workspace, options.project);
            const styles = project.targets.build.options.styles;
            expect(styles[0].input).toMatch(/kendo-theme-material/);
        });
    });
    describe('in projects without "test" target', () => {
        beforeEach(() => {
            appTree = createAppTree({ skipTests: true });
        });
        it('imports the theme', () => {
            const options = Object.assign({}, defaultOptions, { theme: 'material' });
            const tree = runner.runSchematic('ng-add', options, appTree);
            const content = fileContent(tree, '/src/app/app.module.ts');
            expect(content).toMatch("import { GridModule } from '@progress/kendo-angular-grid';");
        });
    });
});
