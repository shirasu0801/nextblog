import Link from "next/link"
import Head from "next/head"

export default function FirstFunction() {
  return (
    <div>
      <Head>
        <title>最初の投稿</title>
      </Head>
      <div>
        <h1>最初の投稿</h1>
        <Link href="/">戻る</Link>
      </div>
    </div>
  );
}