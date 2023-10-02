
import styles from './page.module.css'
import { data } from "@/data/data";
import { Container } from '@mui/material';
import dynamic from 'next/dynamic'
const Todo = dynamic(() => import("@/component/todo"), {
  ssr: false,
});
export default function Home() {
  
  return (
    <>
      <div >
        <Container >
          <Todo></Todo>
        </Container>
      </div>
    </>
  )
}
