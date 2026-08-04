const TRANSPARENT_HEADER_ROUTES = new Set([
  "/",
  "/job-application",
  "/contactus",
  "/ketchen",
  "/whoweare",
  "/news",
]);

export function shouldUseTransparentHeader(pathname = "/") {
  return TRANSPARENT_HEADER_ROUTES.has(pathname);
}
