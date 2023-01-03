type Route = {
  pathname: string
  headerMenuName: string
}

const routes = [
  {
    pathname: '/',
    headerMenuName: 'Home',
  },
  {
    pathname: '/films',
    headerMenuName: '映画',
  },
  {
    pathname: '/collection-history',
    headerMenuName: 'コレクションヒストリー',
  },
  {
    pathname: '/load-more',
    headerMenuName: 'LoadMore',
  },
  {
    pathname: '/neat-pagination',
    headerMenuName: 'Neat Pagination',
  },
]

const matchedActivePage = (currentPathname: string): Route | undefined => {
  return routes.find((route: Route) => {
    return (
      route.pathname !== '/' && currentPathname.indexOf(route.pathname) !== -1
    )
  })
}

export { routes, matchedActivePage }
