import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DIKTQSas.mjs';
import { manifest } from './manifest_Dz5IzT4n.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/api/keystatic/_---params_.astro.mjs');
const _page4 = () => import('./pages/blog.astro.mjs');
const _page5 = () => import('./pages/blog/_---slug_.astro.mjs');
const _page6 = () => import('./pages/categories/_category_.astro.mjs');
const _page7 = () => import('./pages/categories.astro.mjs');
const _page8 = () => import('./pages/contact.astro.mjs');
const _page9 = () => import('./pages/examples/blogindex2.astro.mjs');
const _page10 = () => import('./pages/examples/feature-services.astro.mjs');
const _page11 = () => import('./pages/examples/hero-sections.astro.mjs');
const _page12 = () => import('./pages/examples/landing2.astro.mjs');
const _page13 = () => import('./pages/examples/landing3.astro.mjs');
const _page14 = () => import('./pages/examples/testimonial-faq.astro.mjs');
const _page15 = () => import('./pages/examples/testimonials-faq.astro.mjs');
const _page16 = () => import('./pages/keystatic/_---params_.astro.mjs');
const _page17 = () => import('./pages/overview.astro.mjs');
const _page18 = () => import('./pages/rss.xml.astro.mjs');
const _page19 = () => import('./pages/services/_---slug_.astro.mjs');
const _page20 = () => import('./pages/zh/404.astro.mjs');
const _page21 = () => import('./pages/zh/a-propos.astro.mjs');
const _page22 = () => import('./pages/zh/blog.astro.mjs');
const _page23 = () => import('./pages/zh/blog/_---slug_.astro.mjs');
const _page24 = () => import('./pages/zh/categories/_category_.astro.mjs');
const _page25 = () => import('./pages/zh/categories.astro.mjs');
const _page26 = () => import('./pages/zh/contact.astro.mjs');
const _page27 = () => import('./pages/zh/examples/blogindex2.astro.mjs');
const _page28 = () => import('./pages/zh/examples/feature-services.astro.mjs');
const _page29 = () => import('./pages/zh/examples/hero-sections.astro.mjs');
const _page30 = () => import('./pages/zh/examples/landing2.astro.mjs');
const _page31 = () => import('./pages/zh/examples/landing3.astro.mjs');
const _page32 = () => import('./pages/zh/examples/testimonial-faq.astro.mjs');
const _page33 = () => import('./pages/zh/examples/testimonials-faq.astro.mjs');
const _page34 = () => import('./pages/zh/overview.astro.mjs');
const _page35 = () => import('./pages/zh/rss.xml.astro.mjs');
const _page36 = () => import('./pages/zh/services/_---slug_.astro.mjs');
const _page37 = () => import('./pages/zh.astro.mjs');
const _page38 = () => import('./pages/zh/_---page_.astro.mjs');
const _page39 = () => import('./pages/index.astro.mjs');
const _page40 = () => import('./pages/_---page_.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.17.0_@netlify+blobs@10.5.0_@types+node@24.8.1_idb-keyval@6.2.2_jiti@2.6.1_light_62e8a205b77b5430ceef3338128a65fb/node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["node_modules/.pnpm/@keystatic+astro@5.0.6_@keystatic+core@0.5.48_react-dom@19.2.0_react@19.2.0__react@19.2_8a8705f09e58deaa5fb05b69dafc21fb/node_modules/@keystatic/astro/internal/keystatic-api.js", _page3],
    ["src/pages/blog/index.astro", _page4],
    ["src/pages/blog/[...slug].astro", _page5],
    ["src/pages/categories/[category].astro", _page6],
    ["src/pages/categories/index.astro", _page7],
    ["src/pages/contact.astro", _page8],
    ["src/pages/examples/blogIndex2.astro", _page9],
    ["src/pages/examples/feature-services.astro", _page10],
    ["src/pages/examples/hero-sections.astro", _page11],
    ["src/pages/examples/landing2.astro", _page12],
    ["src/pages/examples/landing3.astro", _page13],
    ["src/pages/examples/testimonial-faq.astro", _page14],
    ["src/pages/examples/testimonials-faq.astro", _page15],
    ["node_modules/.pnpm/@keystatic+astro@5.0.6_@keystatic+core@0.5.48_react-dom@19.2.0_react@19.2.0__react@19.2_8a8705f09e58deaa5fb05b69dafc21fb/node_modules/@keystatic/astro/internal/keystatic-astro-page.astro", _page16],
    ["src/pages/overview.astro", _page17],
    ["src/pages/rss.xml.ts", _page18],
    ["src/pages/services/[...slug].astro", _page19],
    ["src/pages/zh/404.astro", _page20],
    ["src/pages/zh/a-propos.astro", _page21],
    ["src/pages/zh/blog/index.astro", _page22],
    ["src/pages/zh/blog/[...slug].astro", _page23],
    ["src/pages/zh/categories/[category].astro", _page24],
    ["src/pages/zh/categories/index.astro", _page25],
    ["src/pages/zh/contact.astro", _page26],
    ["src/pages/zh/examples/blogIndex2.astro", _page27],
    ["src/pages/zh/examples/feature-services.astro", _page28],
    ["src/pages/zh/examples/hero-sections.astro", _page29],
    ["src/pages/zh/examples/landing2.astro", _page30],
    ["src/pages/zh/examples/landing3.astro", _page31],
    ["src/pages/zh/examples/testimonial-faq.astro", _page32],
    ["src/pages/zh/examples/testimonials-faq.astro", _page33],
    ["src/pages/zh/overview.astro", _page34],
    ["src/pages/zh/rss.xml.ts", _page35],
    ["src/pages/zh/services/[...slug].astro", _page36],
    ["src/pages/zh/index.astro", _page37],
    ["src/pages/zh/[...page].astro", _page38],
    ["src/pages/index.astro", _page39],
    ["src/pages/[...page].astro", _page40]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///Users/terryyan/Documents/GitHub/ccat-atlas/dist/client/",
    "server": "file:///Users/terryyan/Documents/GitHub/ccat-atlas/dist/server/",
    "host": "127.0.0.1",
    "port": 4321,
    "assets": "_astro",
    "experimentalStaticHeaders": false
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
