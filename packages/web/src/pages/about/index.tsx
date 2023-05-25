import { useRouter } from '@/hooks'

export const About = () => {
  const { pathname } = useRouter()

  return (
    <div>
      <h1>About</h1>
      <p>Router: {pathname}</p>
    </div>
  )
}
