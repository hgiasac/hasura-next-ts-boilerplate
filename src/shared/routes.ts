export type RouteRecord = {
  readonly path: string
  readonly title: string
};

export const ROUTES = {
  home: {
    path: "/",
    title: "pageTitle.home"
  } as RouteRecord,
  login: {
    path: "/auth/login",
    title: "pageTitle.login"
  } as RouteRecord,
  register: {
    path: "/auth/register",
    title: "pageTitle.register"
  } as RouteRecord,
  resetPassword: {
    path: "/auth/reset-password",
    title: "pageTitle.resetPassword"
  } as RouteRecord,
  confirmResetPassword: {
    path: "/auth/confirm-reset-password",
    title: "pageTitle.resetPassword"
  } as RouteRecord
};
