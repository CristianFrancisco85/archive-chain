import { NavBar } from './NavBar'

export default function MainLayout({children}:any) {
  return (
    <>
      <NavBar/>
      <main>{children}</main>
    </>
  )
}