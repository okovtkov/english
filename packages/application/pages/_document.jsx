import { Html, Head, Main, NextScript } from 'next/document';

export default function MyDocument({ cookieValue }) {
  return (
    <Html lang="ru">
      <Head />
      <body data-theme={cookieValue || 'light'}>
        <div id="portal" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx) => {
  const initialProps = await ctx.renderPage();
  const cookies = ctx.req?.headers.cookie || '';
  const theme = cookies.match(/theme=(dark|light)/)?.[1] || 'light';

  return { ...initialProps, cookieValue: theme };
};
