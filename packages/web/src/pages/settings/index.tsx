import { useRouter } from '@/hooks'

export const Settings = () => {
  const { pathname } = useRouter()

  return (
    <div className='main__content'>
      <h1>Settings</h1>
      <p>Router: {pathname}</p>
    </div>
  )
}
