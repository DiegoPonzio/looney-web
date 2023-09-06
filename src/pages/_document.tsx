import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className={"dark:bg-[#1A1A1A] dark:text-gray text-dark"}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
