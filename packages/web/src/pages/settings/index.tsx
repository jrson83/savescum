import { useRouter } from '@/hooks'

export const Settings = () => {
  const { pathname } = useRouter()

  return (
    <div className='main__content'>
      <h2>Settings</h2>
      <p>Router: {pathname}</p>
    </div>
  )
}
