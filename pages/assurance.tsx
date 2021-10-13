import { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../src/Layout'));
// import Layout from "../src/Layout";
// import { logPageView } from "../utils/analytics";

const assurance = ({ locale }) => {
  useEffect(() => {
    window['dataLayer'].push({
      event: 'page_view',
      pageURL: window.location.href,
      pagePath: '/assurance',
      pageTitle: locale.assurance.next_seo.title,
    });
    // logPageView();
  }, []);
  return (
    <Layout showToTop={true}>
      <NextSeo
        title={locale.assurance.next_seo.title}
        description={locale.assurance.next_seo.description}
        openGraph={{
          title: locale.assurance.next_seo.title,
          description: locale.assurance.next_seo.description,
        }}
        twitter={{
          handle: locale.assurance.next_seo.handle,
          site: locale.assurance.next_seo.site,
          cardType: locale.assurance.next_seo.cardType,
        }}
      />
      {/* Most of the static pages have a same class named 'static_pages' which set some common style for the main wrapper box*/}
      <article className="responsive static_pages minHeight">
        <h1>{locale.assurance.h3}</h1>
        <p>{locale.assurance.p} </p>
        <ul>
          <li>{locale.assurance.li_1}</li>
          <li>{locale.assurance.li_2}</li>
          <li>{locale.assurance.li_3}</li>
          <li>{locale.assurance.li_4}</li>
          <li>{locale.assurance.li_5}</li>
          <li>{locale.assurance.li_6}</li>
        </ul>
      </article>
    </Layout>
  );
};

export default assurance;
