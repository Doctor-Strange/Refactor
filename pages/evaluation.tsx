import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../src/Layout'));
import { NextSeo } from 'next-seo';
// import Layout from "../src/Layout";
// import { logPageView } from "../utils/analytics";

const evaluation = ({ locale }) => {
  useEffect(() => {
    window['dataLayer'].push({
      event: 'page_view',
      pageURL: window.location.href,
      pagePath: '/evaluation',
      pageTitle: locale.evaluation.next_seo.title,
    });
    // logPageView();
  }, []);
  return (
    <Layout showToTop={true}>
      <NextSeo
        title={locale.evaluation.next_seo.title}
        description={locale.evaluation.next_seo.description}
        openGraph={{
          title: locale.evaluation.next_seo.title,
          description: locale.evaluation.next_seo.description,
        }}
        twitter={{
          handle: locale.evaluation.next_seo.handle,
          site: locale.evaluation.next_seo.site,
          cardType: locale.evaluation.next_seo.cardType,
        }}
      />
      {/* Most of the static pages have a same class named 'static_pages' which set some common style for the main wrapper box*/}
      <article className="responsive static_pages minHeight">
        <h1>{locale.evaluation.h1}</h1>
        <p>{locale.evaluation.p_1}</p>
        <p>{locale.evaluation.p_2}</p>
        <ul>
          <li>{locale.evaluation.li_1}</li>
          <li>{locale.evaluation.li_2}</li>
          <li>{locale.evaluation.li_3}</li>
          <li>{locale.evaluation.li_4}</li>
          <li>{locale.evaluation.li_5}</li>
          <li>{locale.evaluation.li_6}</li>
        </ul>
        <p>{locale.evaluation.p_3}</p>
        <ul>
          <li>{locale.evaluation.li_7}</li>
          <li>{locale.evaluation.li_8}</li>
          <li>{locale.evaluation.li_9}</li>
        </ul>
        <p>{locale.evaluation.p_4}</p>
      </article>
    </Layout>
  );
};

export default evaluation;
