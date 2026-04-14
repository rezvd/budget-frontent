/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_ENABLE_MOCK: 'true' | 'false' | 'string';
  readonly VITE_ENABLE_SENTRY: 'true' | 'false' | 'string';
  readonly VITE_COOKIE_DOMAIN_VALUE: string;
  readonly VITE_LOGIN_URL: string;
  readonly VITE_RPC_BASE_URL: string;
  readonly VITE_WS_BASE_URL: string;
  readonly VITE_POLICY_URL: string;
  readonly VITE_SUPPORT_URL: string;
  readonly VITE_SENTRY_DSN: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.svg' {
  import * as React from 'react';
  const SvgComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export { SvgComponent };
}
