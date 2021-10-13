import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../src/Layout'));
const Complete_register_container = dynamic(() =>
  import('../src/containers/CompleteRegister'),
);
// import Layout from "../src/Layout";
// import Complete_register_container from "../src/containers/CompleteRegister";
import { NextSeo } from 'next-seo';
// import { logPageView } from "../utils/analytics";

const CompleteRegister = ({ locale }) => {
  useEffect(() => {
    window['dataLayer'].push({
      event: 'page_view',
      pageURL: window.location.href,
      pagePath: '/complete-register',
      pageTitle: locale.completeRegister.next_seo.title,
    });
    // logPageView();
  }, []);

  return (
    <Layout>
      <NextSeo
        title={locale.completeRegister.next_seo.title}
        description={locale.completeRegister.next_seo.description}
        openGraph={{
          title: locale.completeRegister.next_seo.title,
          description: locale.completeRegister.next_seo.description,
        }}
        twitter={{
          handle: locale.completeRegister.next_seo.handle,
          site: locale.completeRegister.next_seo.site,
          cardType: locale.completeRegister.next_seo.cardType,
        }}
      />
      <Complete_register_container language={locale.completeRegister} />
    </Layout>
  );
};

export default CompleteRegister;
