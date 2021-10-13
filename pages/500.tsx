import React, { useEffect } from "react";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("../src/Layout"));
// import Layout from "../src/Layout";
import { NextSeo } from "next-seo";
import Link from "next/link";
import _500 from "../public/image/500.png"; 
// import { logPageView } from "../utils/analytics";

const page_500 = ({locale}) => {
  useEffect(() => {
    window["dataLayer"].push({
      event: "page_view",
      pageURL: window.location.href,
      pagePath: "/500",
      pageTitle: locale._500.title,
    });
    // logPageView();
  }, []);
  return (
    <Layout>
      <NextSeo
        title={locale._500.title}
        description={locale._500.description}
        openGraph={{
          title: locale._500.title,
          description: locale._500.description,
        }}
        twitter={{
          handle: locale._500.handle,
          site: locale._500.site,
          cardType: locale._500.cardType,
        }}
      />
      <article className="minHeight _500container">
        <img src={_500} alt="500" className="_404PageImage" />
        <span>{locale._500.span}</span>
        <p>{locale._500.p_1}</p>
        <p>
          {locale._500.dial} <a href={`tel:${locale._500.call}`}>{locale._500.call}</a>
        </p>
        <Link href="/" prefetch={false}>
          <a className="_404PageAnchor Blue_BTN">{locale._500.return}</a>
        </Link>
      </article>
    </Layout>
  );
};

export default page_500;
