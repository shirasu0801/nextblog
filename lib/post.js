//mdファイルで記述したデータをここに取り出す
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'//mdファイルのメタデータを分析するモジュール
import {remark} from "remark"
import html from 'remark-html'



//////記事のデータが入っているpostsディレクトリから取得する
const postsDirectory = path.join(process.cwd(), "posts")//process.cwd()はカレントディレクトリ(blog)を指す


//////⭐️メインページに対するSSG用の関数
//////mdファイルのデータを取り出す関数(index.jsのgetStaticProps関数へ渡される)
export function getPostsData() {
  //※外部APIやDBからデータを持ってくる場合のデータの取得
  //const fetchData = await fetch("endpoint") => fetchの引数内にはエンドポイントとして取得するデータのURLなどを指定する(ユーザがpostリクエストした際にここからデータを持ってくる)
  const fileNames = fs.readdirSync(postsDirectory)//引数postsDirectoryで指定したもの(mdファイル)をオブジェクトの配列として認識する
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "")//replace(/\.md$/)でmdファイルの拡張子を取り除く => idはファイル名

    //////mdファイルの中身を文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName)//fileNameはmap関数で取り出した各mdファイルを指し、それらのpathを取得する
    const fileContents = fs.readFileSync(fullPath, 'utf8')//取得した各mdファイルの中身を文字列として読み込む

    const matterResult = matter(fileContents)//メタデータ(title,date,thumbnail)を取り出す

    return {//ここのreturnはallPostData変数へ代入される
      id,
      ...matterResult.data,//メタデータであるtitle.date,thumbnailが入ってる => index.jsのgetStaticProps関数へ
    }
  })
  return allPostsData//getPostsData関数に対する返り値
}


///////⭐️ブログページに対するgetStaticPath用の処理
///////getStaticPath関数のreturn内で使われるpathの内容を出力する関数
// => getStaticPaths関数へ(return中のpathはオブジェクト形式にする必要)
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)//ファイル名がidになるので、ファイル名を取得する
  return fileNames.map((fileName) => {//🟢
    return {
      params: {
        //params以下はpages/posts/[id].jsの[]の中の名前と同じにする必要がある
        id: fileName.replace(/\.md$/, "")//idはファイル名(拡張子を除く)
      }
    }
  })
}
// 🟢のreturnが返すもの
// [
//   {
//     params: {
//       id: "ssg-ssr"
//     }
//   }
// ]



//////⭐️ブログページに対するgetStaticProps用の関数
//////id(ファイル名)に基づいてブログ投稿データを返す関数
export async function getBlogData(id) {//どの記事か識別するためにidをとる
  const fullPath = path.join(postsDirectory, `${id}.md`)//第二引数にファイル名の正式名称を取る
  const fileContent = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContent)
  const blogContent = await remark().use(html).process(matterResult.content)//remarkによってmdファイルの記事データの文字列をHTMLに変換できるように
  const blogContentHTML = blogContent.toString()//string型に変換する
  
  return {
    id,
    blogContentHTML,//記事の中身
    ...matterResult.data,//title,data,thumbnailが入っている
  }

}

