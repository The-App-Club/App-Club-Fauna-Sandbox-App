export type HeaderMenu = {
  id: number
  name: string
  url: string
  canonicalURL: string | null
}

const headerMenus: HeaderMenu[] = [
  { id: 1, name: '映画', url: '/films', canonicalURL: null },
  {
    id: 2,
    name: 'コレクションヒストリー',
    url: '/collection-history',
    canonicalURL: null,
  },
]

export { headerMenus }
