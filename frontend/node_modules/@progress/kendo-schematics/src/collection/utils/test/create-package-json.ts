import { Tree } from "@angular-devkit/schematics";
import { stringify } from "..";

const config = {
    "peerDependencies": {
        "@progress/kendo-dependency": "^1.0.0",
        "hammerjs": "^2.0.0"
    }
};

export function createPackageJson(tree: Tree, path?: string): Tree {
    tree.create(path || 'node_modules/@progress/kendo-angular-grid/package.json', stringify(config));

    return tree;
}
