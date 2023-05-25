import { useRouter } from '@/hooks'

export const Dashboard = () => {
  const { pathname } = useRouter()

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Router: {pathname}</p>
    </div>
  )
}
