////ブログの各記事に対するレイアウトページ
import Layout from '../../components/layout'
import {getAllPostIds, getBlogData} from "../../lib/post"
import utilStyle from '../../styles/utils.module.css'
import {useRouter} from 'next/router'
import Head from 'next/head'


/////getStaticPaths(getStaticProps関数と一緒に使う必要がある)
export async function  getStaticPaths() {
  const paths = getAllPostIds()//getAllPostIds関数でreturnされたものが入る

  return {
    paths,
    fallback: false,//pathに含めれていないpathにアクセスした際に404が表示される設定(trueにするとエラーが出る(エラーが出るまでの動的なページを作ることもできる))
  }
}


//Blogの記事データを渡すgetStaticProps関数(post.jsのgetBlogData関数でreturnされたものが来る)
export async function getStaticProps({params}) {//params.idでファイル名を取得できる
  const blogData = await getBlogData(params.id)//getBlogData関数は非同期だったので、こちらも非同期にする必要

  return {
    props: {
      blogData
    }
  }
}

export default function Post({blogData}) {

  // 予期しないurlにアクセスした際に、エラーが起きるまでの時間に表示する内容を書くことができる
  const router = useRouter()
  if(router.isFallback) {
    return <div>読み込み中...</div>
  }
  return (
    <Layout>
      <Head>
        <title>{blogData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyle.headingX1}>{blogData.title}</h1>
        <div className={utilStyle.lightText}>{blogData.date}</div>
        {/* blogContentHTML内に含まれるhtmlのタグを非表示になるよう隠す(セキュリティ的に問題があるのでサニタイズが必要) */}
        <div dangerouslySetInnerHTML={{__html: blogData.blogContentHTML}} />
      </article>
    </Layout>
  )
}
