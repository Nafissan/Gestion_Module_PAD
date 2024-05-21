import { experimental } from '@angular-devkit/core';
import { SchematicsException, Tree } from '@angular-devkit/schematics';

export type WorkspaceSchema = experimental.workspace.WorkspaceSchema;
export type WorkspaceProject = experimental.workspace.WorkspaceProject;

export function getWorkspace(host: Tree): WorkspaceSchema {
    const path = getWorkspacePath(host);
    const configBuffer = host.read(path);
    if (configBuffer === null) {
        throw new SchematicsException(`Could not find (${path})`);
    }
    const config = configBuffer.toString();

    return JSON.parse(config);
}

export function getWorkspacePath(host: Tree): string {
    const possibleFiles = ['/angular.json', '/.angular.json'];
    const path = possibleFiles.filter(path => host.exists(path))[0];

    return path;
}

/**
 * Gets a project from the Angular CLI workspace. If no project name is given, the first project
 * will be retrieved.
 */
export function getProjectFromWorkspace(config: WorkspaceSchema, projectName?: string): WorkspaceProject {
    if (!config.projects) throw new SchematicsException('No projects are defined');

    if (projectName) {
        const project = config.projects[projectName];

        if (!project) {
            throw new SchematicsException(`No project named "${projectName}" exists.`);
        }

        Object.defineProperty(project, 'name', { enumerable: false, value: projectName });

        return project;
    }

    // If there is exactly one non-e2e, non-library project, use that. 
    // Otherwise, project must be specified.
    const allProjectNames = Object.entries(config.projects)
        .filter(([name, value]) => value.projectType !== 'library')
        .filter(([name, _]) => !name.includes('e2e'));

    if (allProjectNames.length !== 1)  throw new SchematicsException('Multiple projects are defined; please specify a project name');

    const [name, _] = allProjectNames[0];
    const project = config.projects[name];

    Object.defineProperty(project, 'name', { enumerable: false, value: projectName });

    return project;
}

export function resolveProject(host: Tree, projectName?: string): WorkspaceProject {
    const workspace = getWorkspace(host);

    return getProjectFromWorkspace(workspace, projectName);
}
