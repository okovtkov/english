import { ThemeStateProvider, QueryProvider } from '@english/components';

export default function App({ Component, pageProps, theme }) {
  return (
    <ThemeStateProvider defaultTheme={theme}>
      <QueryProvider>
        <Component {...pageProps} />
      </QueryProvider>
    </ThemeStateProvider>
  );
}

App.getInitialProps = async (appContext) => {
  if (!appContext || !appContext.ctx.req) return {};

  return { theme: appContext.ctx.req.cookies.theme || 'light' };
};
