import { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../src/Layout'));
// import Layout from "../src/Layout";
// import { logPageView } from "../utils/analytics";
const car_insurance_page = ({ locale }) => {
  useEffect(() => {
    window['dataLayer'].push({
      event: 'page_view',
      pageURL: window.location.href,
      pagePath: '/car-insurance',
      pageTitle: locale.carInsurance.next_seo.title,
    });
    // logPageView();
  }, []);
  return (
    <Layout showToTop={true}>
      <NextSeo
        title={locale.carInsurance.next_seo.title}
        description={locale.carInsurance.next_seo.description}
        openGraph={{
          title: locale.carInsurance.next_seo.title,
          description: locale.carInsurance.next_seo.description,
        }}
        twitter={{
          handle: locale.carInsurance.next_seo.handle,
          site: locale.carInsurance.next_seo.site,
          cardType: locale.carInsurance.next_seo.cardType,
        }}
      />
      {/* Most of the static pages have a same class named 'static_pages' which set some common style for the main wrapper box*/}
      <article className="responsive static_pages minHeight">
        <h1>{locale.carInsurance.h1}</h1>
        <h2>{locale.carInsurance.h2}</h2>
        <p>{locale.carInsurance.p_1}</p>
        <ul>
          <li>
            <strong>{locale.carInsurance.string_1} </strong>
            {locale.carInsurance.li_1}
          </li>
          <li>
            <strong>{locale.carInsurance.string_2} </strong>{' '}
            {locale.carInsurance.li_2}
          </li>
          <li>
            <strong>{locale.carInsurance.string_3} </strong>
            {locale.carInsurance.li_3}
          </li>
          <li>
            <strong>{locale.carInsurance.li_4}</strong>
          </li>
          <li>
            <strong>{locale.carInsurance.li_5}</strong>
          </li>
        </ul>
        <p> {locale.carInsurance.li_6}</p>
      </article>
    </Layout>
  );
};

export default car_insurance_page;
