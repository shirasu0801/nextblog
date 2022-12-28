///////メインページ
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link"
import Layout, {siteTitle} from "../components/layout" 
import utilStyle from '../styles/utils.module.css'
import {getPostsData} from "../lib/post"//getPostsData関数でreturnしたid,...matterResultが入る

////SSG
export async function getStaticProps() {
  //post.jsで定義したgetPostData関数を持ってきて、mdファイルの中身(記事)をSSGでプリレンダリングする
  const allPostsData = getPostsData()//id,title,date,thumbnail
  console.log(allPostsData)

  return {
    //Homeコンポーネントにpropsで渡す
    props: {
      allPostsData,
    },
  }
}

////SSR
export async function getServerSide(context) {//contextはユーザーがリクエストした情報
  return {
    props: {
      //この中にコンポーネントに渡すデータ
    }
  }

}

export default function Home({allPostsData}) {
  return (
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={utilStyle.headingMd}>
          <p>I'm Site Reliability Engineer</p>
        </section>

        <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
          <h2>💻エンジニアのブログ</h2>
          <div className={styles.grid}>
            {allPostsData.map(({id, title, date, thumbnail}) => (//allPostsDataには4つのmdファイルのデータがあり、それを1つずつ取り出してその中からid,title,date,thumbnailを取り出す
              <article key={id}>
                <Link href={`/posts/${id}`}>
                  <img src={`${thumbnail}`} className={styles.thumbnailImage} />
                </Link>
                <Link href={`/posts/${id}`}>{title}</Link>
                <br />
                <small className={utilStyle.lightText}>{date}</small>
              </article>
            ))}
          </div>
        </section>
      </Layout>
  )
}

