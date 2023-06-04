import { useMatch, useRouter } from '@/hooks'

export const Savegame = () => {
  const { pathname } = useRouter()
  const match = useMatch('/savegame/:id', pathname)

  return (
    <div className='main__content'>
      <h1>Savegame</h1>
      <p>Router: {pathname}</p>
      <p>Params: {match?.params?.id}</p>
    </div>
  )
}
