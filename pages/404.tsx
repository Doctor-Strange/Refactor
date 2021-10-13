import { useEffect } from "react";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("../src/Layout"));
// import Layout from "../src/Layout";
import { NextSeo } from "next-seo";
import Link from "next/link";
import _404 from "../public/image/404.png"; 
// import { logPageView } from "../utils/analytics";

const page_404 = ({locale}) => {
  useEffect(() => {
    window["dataLayer"].push({
      event: "page_view",
      pageURL: window.location.href,
      pagePath: "/404",
      pageTitle: locale._404.title,
    });
    // logPageView();
  }, []);
  return (
    <Layout>
      <NextSeo
        title={locale._404.title}
        description={locale._404.description}
        openGraph={{
          title: locale._404.title,
          description: locale._404.description,
        }}
        twitter={{
          handle: locale._404.handle,
          site: locale._404.site,
          cardType: locale._404.cardType,
        }}
      />
      <article className="minHeight">
        <img src={_404} alt="404" className="_404PageImage" />
        <Link href="/" prefetch={false}>
          <a className="_404PageAnchor Blue_BTN">{locale._404.return_to_home}</a>
        </Link>
      </article>
    </Layout>
  );
};

export default page_404;
