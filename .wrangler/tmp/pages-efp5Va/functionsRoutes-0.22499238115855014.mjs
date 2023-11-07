import { onRequest as __api_keys_ts_onRequest } from "/Users/michaelmurray/Documents/jwt/website/functions/api/keys.ts"
import { onRequest as __api_validate_ts_onRequest } from "/Users/michaelmurray/Documents/jwt/website/functions/api/validate.ts"
import { onRequestOptions as ___middleware_ts_onRequestOptions } from "/Users/michaelmurray/Documents/jwt/website/functions/_middleware.ts"
import { onRequest as ___middleware_ts_onRequest } from "/Users/michaelmurray/Documents/jwt/website/functions/_middleware.ts"

export const routes = [
    {
      routePath: "/api/keys",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_keys_ts_onRequest],
    },
  {
      routePath: "/api/validate",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_validate_ts_onRequest],
    },
  {
      routePath: "/",
      mountPath: "/",
      method: "OPTIONS",
      middlewares: [___middleware_ts_onRequestOptions],
      modules: [],
    },
  {
      routePath: "/",
      mountPath: "/",
      method: "",
      middlewares: [___middleware_ts_onRequest],
      modules: [],
    },
  ]