import ProjectContainer from 'containers/ProjectContainer'

/** Url's основных страниц */
export enum Routes {
  MAIN = '/',
  PROJECT = '/project',
}

export const routes = {
  [Routes.PROJECT]: {
    label: 'domofon',
    paths: {
      domofons: Routes.PROJECT
    },
    Component: ProjectContainer
  }
}
