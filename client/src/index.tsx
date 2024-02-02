import React, {FC, ReactNode} from 'react'
import { createRoot } from 'react-dom/client'
import styles from './index.module.sass'
import { Card } from '@features'

interface PropsText {
  text: string
}

const Text: FC<PropsText> = ({text}) => {
  return <p className={styles.red}>{text}</p>
}

const Home = (): ReactNode => {
  return <>
    <Text text='hello world!!!'/>
    <Card />
  </>
}

const domNode = document.getElementById('root')
const root = createRoot(domNode)

root.render(<Home />)
