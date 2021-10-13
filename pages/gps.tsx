import { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../src/Layout'));
// import Layout from "../src/Layout";
// import { logPageView } from "../utils/analytics";

const gps = ({ locale }) => {
  useEffect(() => {
    window['dataLayer'].push({
      event: 'page_view',
      pageURL: window.location.href,
      pagePath: '/gps',
      pageTitle: locale.gps.next_seo.title,
    });
    // logPageView();
  }, []);
  return (
    <Layout showToTop={true}>
      <NextSeo
        title={locale.gps.next_seo.title}
        description={locale.gps.next_seo.description}
        openGraph={{
          title: locale.gps.next_seo.title,
          description: locale.gps.next_seo.description,
        }}
        twitter={{
          handle: locale.gps.next_seo.handle,
          site: locale.gps.next_seo.site,
          cardType: locale.gps.next_seo.cardType,
        }}
      />
      {/* Most of the static pages have a same class named 'static_pages' which set some common style for the main wrapper box*/}
      <article className="responsive static_pages minHeight">
        <h1>{locale.gps.h1}</h1>
        <p>{locale.gps.p_1}</p>
        <ul>
          <li>{locale.gps.li_1}</li>
          <li>{locale.gps.li_2}</li>
          <li>{locale.gps.li_3}</li>
          <li>{locale.gps.li_4}</li>
          <li>{locale.gps.li_5}</li>
          <li>{locale.gps.li_6}</li>
          <li>{locale.gps.li_7}</li>
          <li>{locale.gps.li_8}</li>
        </ul>
      </article>
    </Layout>
  );
};

export default gps;
