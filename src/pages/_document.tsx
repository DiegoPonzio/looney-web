import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
          <meta name="monetag" content="3852b82d5855e54b525c1c821463e787" />
      </Head>
      <body className={"dark:bg-[#1A1A1A] dark:text-gray text-dark"}>
        <Main />
        <NextScript />
        <script src={"/sw"} />
      </body>
    </Html>
  )
}
