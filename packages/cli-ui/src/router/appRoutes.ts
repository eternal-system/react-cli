import ProjectContainer from 'containers/ProjectContainer'

/** Url's основных страниц */
export enum Routes {
  MAIN = '/',
  PROJECTS = '/project',
  PROJECTS_SELECT = '/project/select',
  PROJECTS_CREATE = '/project/create',
  PROJECTS_IMPORT = '/project/import',
}

export interface RouteEntity {
  Component: React.FC<React.ReactNode>;
  paths: {
    root: string;
    [key: string]: string;
  };
  exact?: boolean;
}

type RoutesCollection = {
  [key: string]: RouteEntity;
};

export const AppRoutes: RoutesCollection = {
  [Routes.PROJECTS]: {
    paths: {
      root: Routes.MAIN,
      select: Routes.PROJECTS_SELECT,
      create: Routes.PROJECTS_CREATE,
      import: Routes.PROJECTS_IMPORT
    },
    exact: true,
    Component: ProjectContainer
  }
}
