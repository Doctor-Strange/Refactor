import { useEffect } from "react";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("../src/Layout"));
// import Layout from "../src/Layout";
import language from "../public/languages/fa/gps.json";
// import { logPageView } from "../utils/analytics";

const gps = () => {
  useEffect(() => {
    window["dataLayer"].push({
      event: "page_view",
      pageURL: window.location.href,
      pagePath: "/gps",
      pageTitle: language.next_seo.title,
    });
    // logPageView();
  }, []);
  return (
    <Layout showToTop={true}>
      <NextSeo
        title={language.next_seo.title}
        description={language.next_seo.description}
        openGraph={{
          title: language.next_seo.title,
          description: language.next_seo.description,
        }}
        twitter={{
          handle: language.next_seo.handle,
          site: language.next_seo.site,
          cardType: language.next_seo.cardType,
        }}
      />
      {/* Most of the static pages have a same class named 'static_pages' which set some common style for the main wrapper box*/}
      <article className="responsive static_pages minHeight">
        <h1>{language.h1}</h1>
        <p>{language.p_1}</p>
        <ul>
          <li>{language.li_1}</li>
          <li>{language.li_2}</li>
          <li>{language.li_3}</li>
          <li>{language.li_4}</li>
          <li>{language.li_5}</li>
          <li>{language.li_6}</li>
          <li>{language.li_7}</li>
          <li>{language.li_8}</li>
        </ul>
      </article>
    </Layout>
  );
};

export default gps;
