import { Func } from '@prisma/client'
import axios from 'axios'
import Head from 'next/head'
import useSWR from 'swr'
import FuncCatalog from '../components/func-catalog'
import FuncEditor from '../components/func-editor'
import styles from '../styles/Home.module.css'

async function getFuncs(url): Promise<Func[]> {
  return (await axios.get<Func[]>(url)).data
}

export async function getStaticProps() {
  const initialFuncs = await getFuncs("/api/funcs")
  return { props: { initialFuncs } }
}

export default function Home({ initialFuncs }: { initialFuncs: Func[] }) {
  const { data: funcs } = useSWR('/api/posts', getFuncs, { initialData: initialFuncs })

  return (
    <div className={styles.container}>
      <Head>
        <title>Lightning Bug</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <FuncEditor />
        <FuncCatalog funcs={funcs} />

      </main>

      <footer className={styles.footer}>
      </footer>
    </div >
  )
}
