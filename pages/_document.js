import Document, { Html, Head, Main, NextScript } from "next/document";

class RootDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <title>RagLab</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default RootDocument;
