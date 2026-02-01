import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic';
import { fields, collection, config as config$1 } from '@keystatic/core';
import { jsxs, jsx } from 'react/jsx-runtime';
import { wrapper } from '@keystatic/core/content-components';
/* empty css                                               */
export { renderers } from '../../../renderers.mjs';

var setCookie = {exports: {}};

var hasRequiredSetCookie;

function requireSetCookie () {
	if (hasRequiredSetCookie) return setCookie.exports;
	hasRequiredSetCookie = 1;

	var defaultParseOptions = {
	  decodeValues: true,
	  map: false,
	  silent: false,
	};

	function isNonEmptyString(str) {
	  return typeof str === "string" && !!str.trim();
	}

	function parseString(setCookieValue, options) {
	  var parts = setCookieValue.split(";").filter(isNonEmptyString);

	  var nameValuePairStr = parts.shift();
	  var parsed = parseNameValuePair(nameValuePairStr);
	  var name = parsed.name;
	  var value = parsed.value;

	  options = options
	    ? Object.assign({}, defaultParseOptions, options)
	    : defaultParseOptions;

	  try {
	    value = options.decodeValues ? decodeURIComponent(value) : value; // decode cookie value
	  } catch (e) {
	    console.error(
	      "set-cookie-parser encountered an error while decoding a cookie with value '" +
	        value +
	        "'. Set options.decodeValues to false to disable this feature.",
	      e
	    );
	  }

	  var cookie = {
	    name: name,
	    value: value,
	  };

	  parts.forEach(function (part) {
	    var sides = part.split("=");
	    var key = sides.shift().trimLeft().toLowerCase();
	    var value = sides.join("=");
	    if (key === "expires") {
	      cookie.expires = new Date(value);
	    } else if (key === "max-age") {
	      cookie.maxAge = parseInt(value, 10);
	    } else if (key === "secure") {
	      cookie.secure = true;
	    } else if (key === "httponly") {
	      cookie.httpOnly = true;
	    } else if (key === "samesite") {
	      cookie.sameSite = value;
	    } else if (key === "partitioned") {
	      cookie.partitioned = true;
	    } else {
	      cookie[key] = value;
	    }
	  });

	  return cookie;
	}

	function parseNameValuePair(nameValuePairStr) {
	  // Parses name-value-pair according to rfc6265bis draft

	  var name = "";
	  var value = "";
	  var nameValueArr = nameValuePairStr.split("=");
	  if (nameValueArr.length > 1) {
	    name = nameValueArr.shift();
	    value = nameValueArr.join("="); // everything after the first =, joined by a "=" if there was more than one part
	  } else {
	    value = nameValuePairStr;
	  }

	  return { name: name, value: value };
	}

	function parse(input, options) {
	  options = options
	    ? Object.assign({}, defaultParseOptions, options)
	    : defaultParseOptions;

	  if (!input) {
	    if (!options.map) {
	      return [];
	    } else {
	      return {};
	    }
	  }

	  if (input.headers) {
	    if (typeof input.headers.getSetCookie === "function") {
	      // for fetch responses - they combine headers of the same type in the headers array,
	      // but getSetCookie returns an uncombined array
	      input = input.headers.getSetCookie();
	    } else if (input.headers["set-cookie"]) {
	      // fast-path for node.js (which automatically normalizes header names to lower-case
	      input = input.headers["set-cookie"];
	    } else {
	      // slow-path for other environments - see #25
	      var sch =
	        input.headers[
	          Object.keys(input.headers).find(function (key) {
	            return key.toLowerCase() === "set-cookie";
	          })
	        ];
	      // warn if called on a request-like object with a cookie header rather than a set-cookie header - see #34, 36
	      if (!sch && input.headers.cookie && !options.silent) {
	        console.warn(
	          "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
	        );
	      }
	      input = sch;
	    }
	  }
	  if (!Array.isArray(input)) {
	    input = [input];
	  }

	  if (!options.map) {
	    return input.filter(isNonEmptyString).map(function (str) {
	      return parseString(str, options);
	    });
	  } else {
	    var cookies = {};
	    return input.filter(isNonEmptyString).reduce(function (cookies, str) {
	      var cookie = parseString(str, options);
	      cookies[cookie.name] = cookie;
	      return cookies;
	    }, cookies);
	  }
	}

	/*
	  Set-Cookie header field-values are sometimes comma joined in one string. This splits them without choking on commas
	  that are within a single set-cookie field-value, such as in the Expires portion.

	  This is uncommon, but explicitly allowed - see https://tools.ietf.org/html/rfc2616#section-4.2
	  Node.js does this for every header *except* set-cookie - see https://github.com/nodejs/node/blob/d5e363b77ebaf1caf67cd7528224b651c86815c1/lib/_http_incoming.js#L128
	  React Native's fetch does this for *every* header, including set-cookie.

	  Based on: https://github.com/google/j2objc/commit/16820fdbc8f76ca0c33472810ce0cb03d20efe25
	  Credits to: https://github.com/tomball for original and https://github.com/chrusart for JavaScript implementation
	*/
	function splitCookiesString(cookiesString) {
	  if (Array.isArray(cookiesString)) {
	    return cookiesString;
	  }
	  if (typeof cookiesString !== "string") {
	    return [];
	  }

	  var cookiesStrings = [];
	  var pos = 0;
	  var start;
	  var ch;
	  var lastComma;
	  var nextStart;
	  var cookiesSeparatorFound;

	  function skipWhitespace() {
	    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
	      pos += 1;
	    }
	    return pos < cookiesString.length;
	  }

	  function notSpecialChar() {
	    ch = cookiesString.charAt(pos);

	    return ch !== "=" && ch !== ";" && ch !== ",";
	  }

	  while (pos < cookiesString.length) {
	    start = pos;
	    cookiesSeparatorFound = false;

	    while (skipWhitespace()) {
	      ch = cookiesString.charAt(pos);
	      if (ch === ",") {
	        // ',' is a cookie separator if we have later first '=', not ';' or ','
	        lastComma = pos;
	        pos += 1;

	        skipWhitespace();
	        nextStart = pos;

	        while (pos < cookiesString.length && notSpecialChar()) {
	          pos += 1;
	        }

	        // currently special character
	        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
	          // we found cookies separator
	          cookiesSeparatorFound = true;
	          // pos is inside the next cookie, so back up and return it.
	          pos = nextStart;
	          cookiesStrings.push(cookiesString.substring(start, lastComma));
	          start = pos;
	        } else {
	          // in param ',' or param separator ';',
	          // we continue from that comma
	          pos = lastComma + 1;
	        }
	      } else {
	        pos += 1;
	      }
	    }

	    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
	      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
	    }
	  }

	  return cookiesStrings;
	}

	setCookie.exports = parse;
	setCookie.exports.parse = parse;
	setCookie.exports.parseString = parseString;
	setCookie.exports.splitCookiesString = splitCookiesString;
	return setCookie.exports;
}

var setCookieExports = /*@__PURE__*/ requireSetCookie();

function makeHandler(_config) {
  return async function keystaticAPIRoute(context) {
    var _context$locals, _ref, _config$clientId, _ref2, _config$clientSecret, _ref3, _config$secret;
    const envVarsForCf = (_context$locals = context.locals) === null || _context$locals === void 0 || (_context$locals = _context$locals.runtime) === null || _context$locals === void 0 ? void 0 : _context$locals.env;
    const handler = makeGenericAPIRouteHandler({
      ..._config,
      clientId: (_ref = (_config$clientId = _config.clientId) !== null && _config$clientId !== void 0 ? _config$clientId : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_GITHUB_CLIENT_ID) !== null && _ref !== void 0 ? _ref : tryOrUndefined(() => {
        return undefined                                          ;
      }),
      clientSecret: (_ref2 = (_config$clientSecret = _config.clientSecret) !== null && _config$clientSecret !== void 0 ? _config$clientSecret : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_GITHUB_CLIENT_SECRET) !== null && _ref2 !== void 0 ? _ref2 : tryOrUndefined(() => {
        return undefined                                              ;
      }),
      secret: (_ref3 = (_config$secret = _config.secret) !== null && _config$secret !== void 0 ? _config$secret : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_SECRET) !== null && _ref3 !== void 0 ? _ref3 : tryOrUndefined(() => {
        return undefined                                ;
      })
    }, {
      slugEnvName: "PUBLIC_KEYSTATIC_GITHUB_APP_SLUG"
    });
    const {
      body,
      headers,
      status
    } = await handler(context.request);
    let headersInADifferentStructure = /* @__PURE__ */ new Map();
    if (headers) {
      if (Array.isArray(headers)) {
        for (const [key, value] of headers) {
          if (!headersInADifferentStructure.has(key.toLowerCase())) {
            headersInADifferentStructure.set(key.toLowerCase(), []);
          }
          headersInADifferentStructure.get(key.toLowerCase()).push(value);
        }
      } else if (typeof headers.entries === "function") {
        for (const [key, value] of headers.entries()) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
        if ("getSetCookie" in headers && typeof headers.getSetCookie === "function") {
          const setCookieHeaders2 = headers.getSetCookie();
          if (setCookieHeaders2 !== null && setCookieHeaders2 !== void 0 && setCookieHeaders2.length) {
            headersInADifferentStructure.set("set-cookie", setCookieHeaders2);
          }
        }
      } else {
        for (const [key, value] of Object.entries(headers)) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
      }
    }
    const setCookieHeaders = headersInADifferentStructure.get("set-cookie");
    headersInADifferentStructure.delete("set-cookie");
    if (setCookieHeaders) {
      for (const setCookieValue of setCookieHeaders) {
        var _options$sameSite;
        const {
          name,
          value,
          ...options
        } = setCookieExports.parseString(setCookieValue);
        const sameSite = (_options$sameSite = options.sameSite) === null || _options$sameSite === void 0 ? void 0 : _options$sameSite.toLowerCase();
        context.cookies.set(name, value, {
          domain: options.domain,
          expires: options.expires,
          httpOnly: options.httpOnly,
          maxAge: options.maxAge,
          path: options.path,
          sameSite: sameSite === "lax" || sameSite === "strict" || sameSite === "none" ? sameSite : void 0
        });
      }
    }
    return new Response(body, {
      status,
      headers: [...headersInADifferentStructure.entries()].flatMap(([key, val]) => val.map((x) => [key, x]))
    });
  };
}
function tryOrUndefined(fn) {
  try {
    return fn();
  } catch {
    return void 0;
  }
}

const KeystaticAdmonition = ({ variant, children }) => {
  let color;
  if (variant === "tip") {
    color = "#6ee7b7";
  } else if (variant === "caution") {
    color = "#fcd34d";
  } else if (variant === "danger") {
    color = "#fca5a5";
  } else {
    color = "#7dd3fc";
  }
  return /* @__PURE__ */ jsxs("div", { className: "ks-admonition", style: { borderColor: color }, children: [
    /* @__PURE__ */ jsx("h5", { className: "ks-admonition__variant", children: variant }),
    /* @__PURE__ */ jsx("div", { children })
  ] });
};

const Admonition = wrapper({
  label: "Admonition",
  ContentView: (props) => /* @__PURE__ */ jsx(KeystaticAdmonition, { variant: props.value.variant, children: props.children }),
  schema: {
    variant: fields.select({
      label: "Variant",
      options: [
        { value: "info", label: "Info" },
        { value: "tip", label: "Tip" },
        { value: "caution", label: "Caution" },
        { value: "danger", label: "Danger" }
      ],
      defaultValue: "info"
    }),
    // This makes it so you can edit what is inside the admonition
    content: fields.child({
      kind: "block",
      formatting: { inlineMarks: "inherit", softBreaks: "inherit" },
      links: "inherit",
      editIn: "both",
      label: "Admonition Content",
      placeholder: "Enter your admonition content here"
    })
  }
});
const ComponentBlocks = {
  Admonition
};

const Blog = (locale) => collection({
  label: `Blog (${locale.toUpperCase()})`,
  slugField: "title",
  path: `src/data/blog/${locale}/*/`,
  columns: ["title", "pubDate"],
  entryLayout: "content",
  format: { contentField: "content" },
  schema: {
    title: fields.slug({
      name: { label: "Title" },
      slug: {
        label: "SEO-friendly slug",
        description: "Never change the slug once a file is published!"
      }
    }),
    description: fields.text({
      label: "Description",
      validation: { isRequired: true, length: { min: 1, max: 160 } }
    }),
    draft: fields.checkbox({
      label: "Draft",
      description: "Set this post as draft to prevent it from being published."
    }),
    authors: fields.array(
      fields.relationship({
        label: "Post author",
        collection: `authors`
        // authors field in keystatic.config.tsx must match the collection name here (like "authorsEN" or "authorsFR")
        // collection: `authors${locale.toUpperCase()}`,
      }),
      {
        label: "Authors",
        validation: { length: { min: 1 } },
        itemLabel: (props) => props.value || "Please select an author"
      }
    ),
    pubDate: fields.date({ label: "Publish Date" }),
    updatedDate: fields.date({
      label: "Updated Date",
      description: "If you update this post at a later date, put that date here."
    }),
    mappingKey: fields.text({
      label: "Mapping Key",
      description: "This is used to map entries between languages."
    }),
    heroImage: fields.image({
      label: "Hero Image",
      publicPath: "../",
      validation: { isRequired: true }
    }),
    categories: fields.array(fields.text({ label: "Category" }), {
      label: "Categories",
      description: "This is NOT case sensitive.",
      itemLabel: (props) => props.value,
      validation: { length: { min: 1 } }
    }),
    content: fields.mdx({
      label: "Content",
      options: {
        bold: true,
        italic: true,
        strikethrough: true,
        code: true,
        heading: [2, 3, 4, 5, 6],
        blockquote: true,
        orderedList: true,
        unorderedList: true,
        table: true,
        link: true,
        image: {
          directory: `src/data/blog/${locale}/`,
          publicPath: "../"
          // schema: {
          //   title: fields.text({
          //     label: "Caption",
          //     description:
          //       "The text to display under the image in a caption.",
          //   }),
          // },
        },
        divider: true,
        codeBlock: true
      },
      components: {
        Admonition: ComponentBlocks.Admonition
      }
    })
  }
});
const Authors = (locale) => collection({
  label: `Authors ${locale === "" ? "" : `(${locale.toUpperCase()})`} `,
  slugField: "name",
  path: `src/data/authors/${locale}/*/`,
  columns: ["name"],
  entryLayout: "content",
  format: { contentField: "bio" },
  schema: {
    name: fields.slug({
      name: {
        label: "Name",
        validation: {
          isRequired: true
        }
      },
      slug: {
        label: "SEO-friendly slug",
        description: "Never change the slug once this file is published!"
      }
    }),
    avatar: fields.image({
      label: "Author avatar",
      publicPath: "../",
      validation: { isRequired: true }
    }),
    about: fields.text({
      label: "About",
      description: "A short bio about the author",
      validation: { isRequired: true }
    }),
    email: fields.text({
      label: "The author's email",
      description: "This must look something like `you@email.com`",
      validation: { isRequired: true }
    }),
    authorLink: fields.url({
      label: "Author Website or Social Media Link",
      validation: { isRequired: true }
    }),
    bio: fields.mdx({
      label: "Full Bio",
      description: "The author's full bio",
      options: {
        bold: true,
        italic: true,
        strikethrough: true,
        code: true,
        heading: [2, 3, 4],
        blockquote: true,
        orderedList: true,
        unorderedList: true,
        table: false,
        link: true,
        image: {
          directory: "src/data/authors/",
          publicPath: "../"
        },
        divider: true,
        codeBlock: false
      }
    })
  }
});
const Services = (locale) => collection({
  label: `Services (${locale.toUpperCase()})`,
  slugField: "title",
  path: `src/data/services/${locale}/*/`,
  columns: ["title"],
  entryLayout: "content",
  format: { contentField: "content" },
  schema: {
    title: fields.slug({
      name: { label: "Title" },
      slug: {
        label: "SEO-friendly slug",
        description: "Never change the slug once a file is published!"
      }
    }),
    description: fields.text({
      label: "Description",
      validation: { isRequired: true, length: { min: 1, max: 160 } }
    }),
    image: fields.image({
      label: "Main Image",
      publicPath: "../",
      validation: { isRequired: true }
    }),
    draft: fields.checkbox({
      label: "Draft",
      description: "Set this page as draft to prevent it from being published."
    }),
    mappingKey: fields.text({
      label: "Mapping Key",
      description: "This is used to map entries between languages."
    }),
    content: fields.mdx({
      label: "Page Contents",
      options: {
        bold: true,
        italic: true,
        strikethrough: true,
        code: false,
        heading: [2, 3, 4],
        blockquote: true,
        orderedList: true,
        unorderedList: true,
        table: true,
        link: true,
        image: {
          directory: `src/data/services/${locale}/`,
          publicPath: "../"
        },
        divider: true,
        codeBlock: false
      }
      // components: {
      //   Admonition: ComponentBlocks.Admonition,
      // },
    })
  }
});
const OtherPages = (locale) => collection({
  label: `Other Pages (${locale.toUpperCase()})`,
  slugField: "title",
  path: `src/data/otherPages/${locale}/*/`,
  columns: ["title"],
  entryLayout: "content",
  format: { contentField: "content" },
  schema: {
    title: fields.slug({
      name: { label: "Title" },
      slug: {
        label: "SEO-friendly slug",
        description: "Never change the slug once a file is published!"
      }
    }),
    description: fields.text({
      label: "Description",
      validation: { isRequired: true, length: { min: 1, max: 160 } }
    }),
    draft: fields.checkbox({
      label: "Draft",
      description: "Set this page as draft to prevent it from being published."
    }),
    mappingKey: fields.text({
      label: "Mapping Key",
      description: "This is used to map entries between languages."
    }),
    content: fields.mdx({
      label: "Page Contents",
      options: {
        bold: true,
        italic: true,
        strikethrough: true,
        code: true,
        heading: [2, 3, 4, 5, 6],
        blockquote: true,
        orderedList: true,
        unorderedList: true,
        table: true,
        link: true,
        image: {
          directory: `src/data/otherPages/${locale}/`,
          publicPath: "../"
        },
        divider: true,
        codeBlock: true
      },
      components: {
        Admonition: ComponentBlocks.Admonition
      }
    })
  }
});
const Collections = {
  Blog,
  Authors,
  Services,
  OtherPages
};

const config = config$1({
  // works in local mode in dev, then cloud mode in prod
  storage: { kind: "cloud" },
  // cloud deployment is free to sign up (up to 3 users per team)
  // docs: https://keystatic.com/docs/cloud
  // create a Keystatic Cloud account here: https://keystatic.cloud/
  cloud: { project: "cosmic-themes/atlas" },
  ui: {
    brand: { name: "Cosmic Themes" }
  },
  collections: {
    blogEN: Collections.Blog("en"),
    blogZH: Collections.Blog("zh"),
    // for now there is a limitation with keystatic where relationship fields don't work well with i18n features
    // If you need multiple languages here (you might not) just create multiple variants of the same author
    // this might look like "author-1-en" and "author-1-fr"
    authors: Collections.Authors(""),
    servicesEN: Collections.Services("en"),
    servicesZH: Collections.Services("zh"),
    otherPagesEN: Collections.OtherPages("en"),
    otherPagesZH: Collections.OtherPages("zh")
  }
});

const all = makeHandler({ config });
const ALL = all;

const prerender = false;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  ALL,
  all,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
