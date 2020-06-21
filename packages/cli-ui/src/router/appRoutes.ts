import { AppContainer, ProjectContainer, DashboardContainer } from 'containers'
import {
  Projects,
  SelectCreateFolder,
  Import,
  Depend,
  PageNotFound,
  CreateProject
} from 'pages'

/** Url's основных страниц */
export enum Routes {
  MAIN = '/',
  PROJECT = '/project',
  DASHBOARD = '/dashboard',
  DEPENDENCIES = '/dependencies',
  PROJECT_SELECT = '/project/select',
  PROJECT_CREATE = '/project/create',
  PROJECT_IMPORT = '/project/import',
  NOT_FOUND = '/404',
}

export interface RouteEntity {
  Component: React.FC<React.ReactNode>;
  paths: {
    root: string;
    [key: string]: string | RouteEntity;
  };
  exact?: boolean;
}

type RoutesCollection = {
  [key: string]: RouteEntity;
};

export const AppRoutes: RoutesCollection = {
  [Routes.MAIN]: {
    paths: {
      root: Routes.MAIN
    },
    exact: true,
    Component: AppContainer
  },
  [Routes.PROJECT]: {
    paths: {
      root: Routes.PROJECT,
      [Routes.PROJECT]: {
        paths: {
          root: Routes.PROJECT
        },
        exact: true,
        Component: Projects
      },
      [Routes.PROJECT_SELECT]: {
        paths: {
          root: Routes.PROJECT_SELECT
        },
        exact: true,
        Component: SelectCreateFolder
      },
      [Routes.PROJECT_CREATE]: {
        paths: {
          root: Routes.PROJECT_CREATE
        },
        exact: true,
        Component: CreateProject
      },
      [Routes.PROJECT_IMPORT]: {
        paths: {
          root: Routes.PROJECT_IMPORT
        },
        exact: true,
        Component: Import
      }
    },
    exact: false,
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
