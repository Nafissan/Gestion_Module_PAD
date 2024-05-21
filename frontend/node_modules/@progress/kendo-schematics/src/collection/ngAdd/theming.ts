import { chain, noop, Rule, SchematicContext, SchematicsException } from '@angular-devkit/schematics';
import { Tree } from '@angular-devkit/schematics';
import { Schema as RegisterSchema } from './schema';
import { addToPackageJson } from '../rules';
import { getProjectFromWorkspace, getWorkspace, WorkspaceSchema } from '../utils';

const themePackageName = (options: RegisterSchema): string => {
    if (!options.theme) return '';

    return `@progress/kendo-theme-${options.theme}`;
}

const themePath = (name: string): string =>
    `node_modules/${name}/dist/all.css`;

export function importTheme(options: RegisterSchema): Rule {
    const theme = themePackageName(options);
    if (!theme) return noop();

    const dependencies = {
        [theme]: 'latest'
    };

    return (host: Tree, context: SchematicContext) => {
        const packageFile = host.get('package.json');
        if (packageFile) {
            const text = packageFile.content.toString();
            const json = JSON.parse(text);
            const dependencies = Object.keys(json.dependencies);
            const skipImport = dependencies.some(dep => dep.startsWith('@progress/kendo-theme-'));

            if (skipImport) {
                context.logger.info(`${theme} already installed, skipping styles registration.`);
                return host;
            }
        }

        return chain([
            addToPackageJson({ dependencies }),
            addStyles(theme, options)
        ]);
    };
}

function addStyles(theme: string, options: RegisterSchema): Rule {
    return (host: Tree) => {
        const supportedTargets = new Set(['build', 'test']);
        const workspace = getWorkspace(host);
        const project = getProjectFromWorkspace(workspace, options.project);
        const targets = project.architect || (<any> project).targets;

        if (!targets) {
            throw new SchematicsException(`${(<any>project).theme} does not have defined targets.`);
        }

        Object.keys(targets).filter(key => supportedTargets.has(key)).forEach(key => {
            addStyleToTarget(targets[key], host, themePath(theme), workspace);
        });

        return host;
    };
}

function addStyleToTarget(target: any, host: Tree, asset: string, workspace: WorkspaceSchema) {
    const styleEntry = {input: asset};

    // We can't assume that any of these properties are defined, so safely add them as we go
    // if necessary.
    if (!target.options) {
      target.options = {styles: [styleEntry]};
    } else if (!target.options.styles) {
      target.options.styles = [styleEntry];
    } else {
      const existingStyles = target.options.styles.map(s => typeof s === 'string' ? s : s.input);
      const hasGivenTheme = existingStyles.find(s => s.includes(asset));
      const hasOtherTheme = existingStyles.find(s => s.includes('@progress/kendo-theme'));

      if (!hasGivenTheme && !hasOtherTheme) {
        target.options.styles.splice(0, 0, styleEntry);
      }
    }

    host.overwrite('angular.json', JSON.stringify(workspace, null, 2));
  }
