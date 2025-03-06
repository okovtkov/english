export function getCookie(ctx, name) {
  const cookieHeader = ctx.req.headers.cookie || '';
  const cookiesArray = cookieHeader.split('; ');
  const cookies = Object.fromEntries(cookiesArray.map((c) => c.split('=')));
  return cookies[name];
}
