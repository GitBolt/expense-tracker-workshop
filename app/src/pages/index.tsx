import { Navbar } from '@/components/Navbar'
import { MyExpenses } from '@/components/MyExpenses'
import { DefaultHead } from '@/components/DefaultHead'


export default function Home() {
  return (
    <>

      <DefaultHead />
      <Navbar />

      <MyExpenses />
    </>
  )
}
