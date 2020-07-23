import { AppContainer, ProjectContainer, DashboardContainer } from 'containers'
import {
  Projects,
  SelectFolder,
  Depend,
  PageNotFound,
  DBoard,
  CreateProject,
  Active,
  Statistics
} from 'pages'

/** Url's основных страниц */
export enum Routes {
  MAIN = '/',
  PROJECT = '/project',
  DASHBOARD = '/dashboard',
  DASHBOARD_ACTIVE = '/dashboard/active',
  DASHBOARD_STATS = '/dashboard/stats',
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
  main: {
    paths: {
      root: Routes.MAIN
    },
    exact: true,
    Component: AppContainer
  },
  projects: {
    paths: {
      root: Routes.PROJECT,
      project: {
        paths: {
          root: Routes.PROJECT
        },
        exact: true,
        Component: Projects
      },
      projectSelect: {
        paths: {
          root: Routes.PROJECT_SELECT
        },
        exact: true,
        Component: SelectFolder
      },
      projectCreate: {
        paths: {
          root: Routes.PROJECT_CREATE
        },
        exact: true,
        Component: CreateProject
      },
      projectImport: {
        paths: {
          root: Routes.PROJECT_IMPORT
        },
        exact: true,
        Component: SelectFolder
      }
    },
    exact: false,
    Component: ProjectContainer
  },
  dashboard: {
    paths: {
      root: Routes.DASHBOARD,
      project: {
        paths: {
          root: Routes.DASHBOARD
        },
        exact: true,
        Component: DBoard
      },
      dashboardActive: {
        paths: {
          root: Routes.DASHBOARD_ACTIVE
        },
        exact: true,
        Component: Active
      },
      dashboardStats: {
        paths: {
          root: Routes.DASHBOARD_STATS
        },
        exact: true,
        Component: Statistics
      }
    },
    exact: false,
    Component: DashboardContainer
  },
  dependencies: {
    paths: {
      root: Routes.DEPENDENCIES
    },
    exact: true,
    Component: Depend
  },
  notFound: {
    paths: {
      root: '*'
    },
    exact: true,
    Component: PageNotFound
  }
}
