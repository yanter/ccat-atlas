import { a as createComponent, r as renderComponent, b as renderTemplate } from '../../chunks/astro/server_B3iuuhTX.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const $$KeystaticAstroPage = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Keystatic", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/Users/terryyan/Documents/GitHub/ccat-atlas/node_modules/.pnpm/@keystatic+astro@5.0.6_@keystatic+core@0.5.48_react-dom@19.2.0_react@19.2.0__react@19.2_8a8705f09e58deaa5fb05b69dafc21fb/node_modules/@keystatic/astro/internal/keystatic-page.js", "client:component-export": "Keystatic" })}`;
}, "/Users/terryyan/Documents/GitHub/ccat-atlas/node_modules/.pnpm/@keystatic+astro@5.0.6_@keystatic+core@0.5.48_react-dom@19.2.0_react@19.2.0__react@19.2_8a8705f09e58deaa5fb05b69dafc21fb/node_modules/@keystatic/astro/internal/keystatic-astro-page.astro", void 0);

const $$file = "/Users/terryyan/Documents/GitHub/ccat-atlas/node_modules/.pnpm/@keystatic+astro@5.0.6_@keystatic+core@0.5.48_react-dom@19.2.0_react@19.2.0__react@19.2_8a8705f09e58deaa5fb05b69dafc21fb/node_modules/@keystatic/astro/internal/keystatic-astro-page.astro";
const $$url = undefined;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$KeystaticAstroPage,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
