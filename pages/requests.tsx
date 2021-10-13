import { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../src/Layout'));
const Requests_page = dynamic(() => import('../src/containers/Requests_page'));
// import Layout from "../src/Layout";
// import { logPageView } from "../utils/analytics";
// import Requests_page from "../src/containers/Requests_page";

const Request = ({ locale }) => {
  useEffect(() => {
    window['dataLayer'].push({
      event: 'page_view',
      pageURL: window.location.href,
      pagePath: '/requests',
      pageTitle: locale.requestsPage.next_seo.title,
    });
    // logPageView();
  }, []);
  return (
    <Layout>
      <NextSeo
        title={locale.requestsPage.next_seo.title}
        description={locale.requestsPage.next_seo.description}
        openGraph={{
          title: locale.requestsPage.next_seo.title,
          description: locale.requestsPage.next_seo.description,
        }}
        twitter={{
          handle: locale.requestsPage.next_seo.handle,
          site: locale.requestsPage.next_seo.site,
          cardType: locale.requestsPage.next_seo.cardType,
        }}
      />
      <Requests_page language={locale.requestsPage.requests_page} />
    </Layout>
  );
};

export default Request;
