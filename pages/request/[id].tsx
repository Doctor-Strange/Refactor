import { useEffect } from "react";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("../../src/Layout"));
// const Request_page = dynamic(() => import("../../src/containers/Request_page"));
// import Layout from "../../src/Layout"; 
// import { logPageView } from "../../utils/analytics";
import Request_page from "../../src/containers/Request_page";

const Request = ({locale}) => {
  useEffect(() => {
    window["dataLayer"].push({
      event: "page_view",
      pageURL: window.location.href,
      pagePath: "/request",
      pageTitle: locale.requestPage.next_seo.title,
    });
    // logPageView();
  }, []);
  return (
    <Layout>
      <NextSeo
        title={locale.requestPage.next_seo.title}
        description={locale.requestPage.next_seo.description}
        openGraph={{
          title: locale.requestPage.next_seo.title,
          description: locale.requestPage.next_seo.description,
        }}
        twitter={{
          handle: locale.requestPage.next_seo.handle,
          site: locale.requestPage.next_seo.site,
          cardType: locale.requestPage.next_seo.cardType,
        }}
      />
      <Request_page language={locale.requestPage.request_page} />
    </Layout>
  );
};

export default Request;
