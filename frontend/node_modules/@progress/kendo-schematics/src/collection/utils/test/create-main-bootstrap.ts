import { Tree } from "@angular-devkit/schematics";

export function createMainBootstrap(tree: Tree, path?: string): Tree {
    tree.create(path || '/src/main.ts', `
        import { enableProdMode } from '@angular/core';
        import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
        
        import { AppModule } from './app/app.module';
        import { environment } from './environments/environment';
        
        if (environment.production) {
        enableProdMode();
        }
        
        platformBrowserDynamic().bootstrapModule(AppModule)
        .catch(err => console.log(err));
    `);

    return tree;
}
