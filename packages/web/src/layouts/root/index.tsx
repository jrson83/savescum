import { Footer, Header, Main, Navbar } from '@/components'

const DefaultLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header>
        <Navbar />
      </Header>
      <Main>{children}</Main>
      <Footer>Footer</Footer>
    </>
  )
}

export default DefaultLayout
