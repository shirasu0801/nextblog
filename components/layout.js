//共通部分(ヘッダー&中身)に関するレイアウトページ
import Head from 'next/head'
import styles from "./layout.module.css"
import utilStyles from "../styles/utils.module.css"
import Link from 'next/link'

const name = "喜楽"
export const siteTitle = "Next.js Blog"

export default function Layout({children, home}) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
      {/* homeがtrue(メインページ)の時だけプロフィールは大きくする*/}
        {home ? (
          <>
            <img src="/images/kiraku.JPG" className={`${utilStyles.borderCircleOnly} ${styles.headerHomeImage}`}/>
            <h1 className={utilStyles.heading2Xl}>{name}</h1> 
          </>
        )
        :
        (
          <>
            <img src="/images/kiraku.JPG" className={`${utilStyles.borderCircle}`}/>
            <h1 className={utilStyles.heading2Xl}>{name}</h1> 
          </>
        )
        }
      </header>
      <main>{children}</main>
      {/* メインページでない場合は戻るボタン(index.jsのメインページへ戻る)を表示する */}
      {!home && (
          <div>
            <Link href="/">ホームへ戻る</Link>
          </div>
        )}
    </div>
  );
}