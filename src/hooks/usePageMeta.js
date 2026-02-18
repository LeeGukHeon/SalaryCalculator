import { useEffect } from "react";

const upsertMeta = (selector, attrs) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attrs).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

function usePageMeta({ title, description, canonicalPath = "/", structuredData }) {
  useEffect(() => {
    const previousTitle = document.title;
    const canonicalHref = `https://mysalarycalc.com${canonicalPath}`;

    document.title = title;

    upsertMeta('meta[name="description"]', {
      name: "description",
      content: description,
    });

    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: title,
    });

    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });

    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalHref,
    });

    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: title,
    });

    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalHref);

    let structuredScript;
    if (structuredData) {
      structuredScript = document.createElement("script");
      structuredScript.type = "application/ld+json";
      structuredScript.text = JSON.stringify(structuredData);
      structuredScript.dataset.dynamicSeo = "true";
      document.head.appendChild(structuredScript);
    }

    return () => {
      document.title = previousTitle;
      if (structuredScript) {
        structuredScript.remove();
      }
    };
  }, [title, description, canonicalPath, structuredData]);
}

export default usePageMeta;
