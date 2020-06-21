import { ProjectContainer, DashboardContainer } from 'containers'
import { Depend, PageNotFound } from 'pages'

/** Url's основных страниц */
export enum Routes {
  MAIN = '/',
  PROJECT = '/project',
  DASHBOARD = '/dashboard',
  DEPENDENCIES = '/dependencies',
  NOT_FOUND = '/404',
  PROJECT_SELECT = '/project/select',
  PROJECT_CREATE = '/project/create',
  PROJECT_IMPORT = '/project/import',
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
  [Routes.PROJECT]: {
    paths: {
      root: Routes.MAIN,
      projects: Routes.PROJECT,
      select: Routes.PROJECT_SELECT,
      import: Routes.PROJECT_IMPORT
    },
    exact: true,
    Component: ProjectContainer
  },
  [Routes.DASHBOARD]: {
    paths: {
      root: Routes.DASHBOARD
    },
    exact: true,
    Component: DashboardContainer
  },
  [Routes.DEPENDENCIES]: {
    paths: {
      root: Routes.DEPENDENCIES
    },
    exact: true,
    Component: Depend
  },
  [Routes.NOT_FOUND]: {
    paths: {
      root: '*'
    },
    exact: true,
    Component: PageNotFound
  }
}
