import Head from 'next/head'
import Image from 'next/image'
import StoryTeller from '../components/storyteller'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Story Teller | AI Generated Story Teller</title>
        <meta name="description" content="Telling Stories since 1995." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StoryTeller />

    </div>
  )
}