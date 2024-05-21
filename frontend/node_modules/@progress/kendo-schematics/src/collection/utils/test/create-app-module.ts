import { Tree } from "@angular-devkit/schematics";

export function createAppModule(tree: Tree, path?: string): Tree {
    tree.create(path || '/src/app/app.module.ts', `
        import { NgModule } from '@angular/core';
        import { AppComponent } from './app.component';

        @NgModule({
            declarations: [
                AppComponent
            ],
            imports: []
        })
        export class AppModule { }
    `);

    return tree;
}
