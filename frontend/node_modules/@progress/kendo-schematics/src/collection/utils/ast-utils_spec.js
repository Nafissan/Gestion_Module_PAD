"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const ast_utils_1 = require("./ast-utils");
const getTsSource = (content) => ts.createSourceFile('test.ts', content, ts.ScriptTarget.Latest, true);
describe('ast utils', () => {
    describe('insert import', () => {
        it('should not import, already imported', () => {
            const content = `
                import { MySymbol } from 'package';
            `;
            const source = getTsSource(content);
            const result = ast_utils_1.insertImport(source, 'MySymbol', 'package');
            expect(result.length).toEqual(0);
        });
        it('should not import, already imported (with varios import declarations)', () => {
            const content = `
                import { MySymbol } from 'package';
                import foo from other-package;
                import other-package;
            `;
            const source = getTsSource(content);
            const result = ast_utils_1.insertImport(source, 'MySymbol', 'package');
            expect(result.length).toEqual(0);
        });
        it('should not import, package is imported with *', () => {
            const content = `
                import * from 'package';
            `;
            const source = getTsSource(content);
            const result = ast_utils_1.insertImport(source, 'MySymbol', 'package');
            expect(result.length).toEqual(0);
        });
        it('should not import, package is imported with named *', () => {
            const content = `
                import * as foo from 'package';
            `;
            const source = getTsSource(content);
            const result = ast_utils_1.insertImport(source, 'MySymbol', 'package');
            expect(result.length).toEqual(0);
        });
        it('should import, other import declrations', () => {
            const content = `
                import OtherSymbol from 'other/package';
            `;
            const source = getTsSource(content);
            const result = ast_utils_1.insertImport(source, 'MySymbol', 'package');
            expect(result.length).toEqual(1);
            expect(result[0].toAdd).toMatch(`\nimport { MySymbol } from 'package';\n`);
        });
        it('should import, no other import declrations', () => {
            const content = '';
            const source = getTsSource(content);
            const result = ast_utils_1.insertImport(source, 'MySymbol', 'package');
            expect(result.length).toEqual(1);
            expect(result[0].toAdd).toEqual(`import { MySymbol } from 'package';\n`);
        });
        it('should import, use strict statement', () => {
            const content = `
                'use strict';
            `;
            const source = getTsSource(content);
            const result = ast_utils_1.insertImport(source, 'MySymbol', 'package');
            expect(result.length).toEqual(1);
            expect(result[0].toAdd).toMatch(`\nimport { MySymbol } from 'package';\n`);
        });
        it('should alter existing import declaration', () => {
            const content = `
                import { OtherSymbol } from 'package';
            `;
            const source = getTsSource(content);
            const result = ast_utils_1.insertImport(source, 'MySymbol', 'package');
            expect(result.length).toEqual(1);
            expect(result[0].toAdd).toEqual(`, MySymbol`);
        });
        it('should alter existing import declaration (add new line)', () => {
            const content = `
                import {
                    OtherSymbol
                } from 'package';
            `;
            const source = getTsSource(content);
            const result = ast_utils_1.insertImport(source, 'MySymbol', 'package');
            expect(result.length).toEqual(1);
            expect(result[0].toAdd).toMatch(/,\r?\n\s*MySymbol/m);
        });
        it('should alter existing import declaration, empty elements', () => {
            const content = `
                import { } from 'package';
            `;
            const source = getTsSource(content);
            const result = ast_utils_1.insertImport(source, 'MySymbol', 'package');
            expect(result.length).toEqual(1);
            expect(result[0].toAdd).toEqual(`MySymbol`);
        });
        describe('with side effects', () => {
            it('should not import, already imported', () => {
                const content = `
                    import 'package';
                `;
                const source = getTsSource(content);
                const result = ast_utils_1.insertImport(source, '', 'package');
                expect(result.length).toEqual(0);
            });
            it('should import', () => {
                const content = `
                    import OtherSymbol from 'other/package';
                `;
                const source = getTsSource(content);
                const result = ast_utils_1.insertImport(source, '', 'package');
                expect(result.length).toEqual(1);
                expect(result[0].toAdd).toMatch(`\nimport 'package';\n`);
            });
        });
    });
    describe('module meta', () => {
        it('should return null when there is no decorator', () => {
            const content = `
                import { NgModule } from '@angular/core';

                export class AppModule { }
            `;
            const source = getTsSource(content);
            const node = ast_utils_1.ngModuleMetadata(source);
            expect(node).toEqual(null);
        });
        it('should return null when there is no call expression', () => {
            const content = `
                import { NgModule } from '@angular/core';


                @NgModule
                export class AppModule { }
            `;
            const source = getTsSource(content);
            const node = ast_utils_1.ngModuleMetadata(source);
            expect(node).toEqual(null);
        });
        it('should return null when decorator is not NgModule', () => {
            const content = `
                import { NgModule } from '@angular/core';


                @OtherModule
                export class AppModule { }
            `;
            const source = getTsSource(content);
            const node = ast_utils_1.ngModuleMetadata(source);
            expect(node).toEqual(null);
        });
        it('should return a node when there is NgModel decorator', () => {
            const content = `
                import { NgModule } from '@angular/core';


                @NgModule({})
                export class AppModule { }
            `;
            const source = getTsSource(content);
            const node = ast_utils_1.ngModuleMetadata(source);
            expect(node).not.toEqual(null);
        });
        it('should return a node when NgModel decorator is prefixed', () => {
            const content = `
                import * as foo from '@angular/core';


                @foo.NgModule({})
                export class AppModule { }
            `;
            const source = getTsSource(content);
            const node = ast_utils_1.ngModuleMetadata(source);
            expect(node).not.toEqual(null);
        });
        it('should return null when called without object literal', () => {
            const content = `
                import { NgModule } from '@angular/core';


                @NgModule()
                export class AppModule { }
            `;
            const source = getTsSource(content);
            const node = ast_utils_1.ngModuleMetadata(source);
            expect(node).toEqual(null);
        });
        it('should return a node when called with object literal', () => {
            const content = `
                import { NgModule } from '@angular/core';


                @NgModule({})
                export class AppModule { }
            `;
            const source = getTsSource(content);
            const node = ast_utils_1.ngModuleMetadata(source);
            expect(node).not.toEqual(null);
        });
    });
    describe('add symbol', () => {
        it('should return noop when no meta is found', () => {
            const content = `
                import { NgModule } from '@angular/core';

                export class AppModule { }
            `;
            const source = getTsSource(content);
            const changes = ast_utils_1.addSymbolToMetadata(source, 'declarations', 'MyComponent');
            expect(changes.length).toEqual(0);
        });
        it('should add when the metadata field is missing', () => {
            const content = `
                import { NgModule } from '@angular/core';

                @NgModule({})
                export class AppModule { }
            `;
            const source = getTsSource(content);
            const changes = ast_utils_1.addSymbolToMetadata(source, 'declarations', 'MyComponent');
            expect(changes.length).toEqual(1);
            expect(changes[0].toAdd).toEqual('declarations: [MyComponent]');
        });
        it('should add when there is not such field in the metadata', () => {
            const content = `
                import { NgModule } from '@angular/core';

                @NgModule({
                    imports: []
                })
                export class AppModule { }
            `;
            const source = getTsSource(content);
            const changes = ast_utils_1.addSymbolToMetadata(source, 'declarations', 'MyComponent');
            expect(changes.length).toEqual(1);
            expect(changes[0].toAdd).toMatch(/,\r?\n\s*declarations: \[MyComponent]/m);
        });
        it('should return noop when the field is not array literal', () => {
            const content = `
                import { NgModule } from '@angular/core';

                const declarations = [];

                @NgModule({
                    declarations: declarations;
                })
                export class AppModule { }
            `;
            const source = getTsSource(content);
            const changes = ast_utils_1.addSymbolToMetadata(source, 'declarations', 'MyComponent');
            expect(changes.length).toEqual(0);
        });
        it('should return noop when the symbol is already defined', () => {
            const content = `
                import { NgModule } from '@angular/core';

                @NgModule({
                    declarations: [MyComponent]
                })
                export class AppModule { }
            `;
            const source = getTsSource(content);
            const changes = ast_utils_1.addSymbolToMetadata(source, 'declarations', 'MyComponent');
            expect(changes.length).toEqual(0);
        });
        it('should add when the symbol is missing (meta field exists)', () => {
            const content = `
                import { NgModule } from '@angular/core';

                @NgModule({
                    declarations: []
                })
                export class AppModule { }
            `;
            const source = getTsSource(content);
            const changes = ast_utils_1.addSymbolToMetadata(source, 'declarations', 'MyComponent');
            expect(changes.length).toEqual(1);
            expect(changes[0].toAdd).toMatch(/MyComponent/m);
        });
        it('should add on new line when the symbol is missing (meta field exists)', () => {
            const content = `
                import { NgModule } from '@angular/core';

                @NgModule({
                    declarations: [
                        AppComponent
                    ]
                })
                export class AppModule { }
            `;
            const source = getTsSource(content);
            const changes = ast_utils_1.addSymbolToMetadata(source, 'declarations', 'MyComponent');
            expect(changes.length).toEqual(1);
            expect(changes[0].toAdd).toMatch(/,\r?\n\s*MyComponent/m);
        });
        it('should add on same line when the symbol is missing (meta field exists)', () => {
            const content = `
                import { NgModule } from '@angular/core';

                @NgModule({
                    declarations: [
                    ]
                })
                export class AppModule { }
            `;
            const source = getTsSource(content);
            const changes = ast_utils_1.addSymbolToMetadata(source, 'declarations', 'MyComponent');
            expect(changes.length).toEqual(1);
            expect(changes[0].toAdd).toMatch(/MyComponent/m);
        });
    });
});
