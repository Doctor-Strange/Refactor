import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../src/Layout'));
// import Layout from "../src/Layout";
import { NextSeo } from 'next-seo';
import Link from 'next/link'; 
// import { logPageView } from "../utils/analytics";

const guideForRent = ({ locale }) => {
  useEffect(() => {
    window['dataLayer'].push({
      event: 'page_view',
      pageURL: window.location.href,
      pagePath: '/guide-for-rent',
      pageTitle: locale.guideForRent.next_seo.title,
    });
    // logPageView();
  }, []);
  return (
    <Layout showToTop={true}>
      <NextSeo
        title={locale.guideForRent.next_seo.title}
        description={locale.guideForRent.next_seo.description}
        openGraph={{
          title: locale.guideForRent.next_seo.title,
          description: locale.guideForRent.next_seo.description,
        }}
        twitter={{
          handle: locale.guideForRent.next_seo.handle,
          site: locale.guideForRent.next_seo.site,
          cardType: locale.guideForRent.next_seo.cardType,
        }}
      />
      {/* Most of the static pages have a same class named 'static_pages' which set some common style for the main wrapper box*/}
      <section className="responsive static_pages minHeight">
        <h1>{locale.guideForRent.h1}</h1>
        <h2 id="guideForRentReserve">{locale.guideForRent.h2_1}</h2>
        <h3>{locale.guideForRent.h3_1}</h3>
        <ul>
          <li>{locale.guideForRent.h3_1_li_1}</li>
          <li>{locale.guideForRent.h3_1_li_2}</li>
          <li>{locale.guideForRent.h3_1_li_3}</li>
        </ul>
        <h3>{locale.guideForRent.h3_2}</h3>
        <ul>
          <li>{locale.guideForRent.h3_2_li_1}</li>
          <li>{locale.guideForRent.h3_2_li_2}</li>
          <li>{locale.guideForRent.h3_2_li_3}</li>
        </ul>
        <h3>{locale.guideForRent.h3_3}</h3>
        <ul>
          <li>
            {locale.guideForRent.h3_3_li_1_a_1}
            <Link href="/insurance-policies" prefetch={false}>
              <a>{locale.guideForRent.h3_3_li_1_insurance}</a>
            </Link>
            {locale.guideForRent.h3_3_li_1_a_2}
          </li>
          <li>{locale.guideForRent.h3_3_li_2}</li>
          <li>{locale.guideForRent.h3_3_li_3}</li>
          <li>{locale.guideForRent.h3_3_li_4}</li>
        </ul>
        <h3>{locale.guideForRent.h3_4}</h3>
        <ul>
          <li>{locale.guideForRent.h3_4_li_1}</li>
          <li>{locale.guideForRent.h3_4_li_2}</li>
          <li>{locale.guideForRent.h3_4_li_3}</li>
          <li>{locale.guideForRent.h3_4_li_4}</li>
        </ul>
        <h3>{locale.guideForRent.h3_5}</h3>
        <ul>
          <li>{locale.guideForRent.h3_5_li_1}</li>
          <li>{locale.guideForRent.h3_5_li_2}</li>
          <li>{locale.guideForRent.h3_5_li_3}</li>
        </ul>
        <h2 id="guideForRentCarDelivery">{locale.guideForRent.h2_2}</h2>
        <h3>{locale.guideForRent.h3_6}</h3>
        <ul>
          <li>{locale.guideForRent.h3_6_li_1}</li>
          <li>{locale.guideForRent.h3_6_li_2}</li>
          <li>{locale.guideForRent.h3_6_li_3}</li>
          <li>{locale.guideForRent.h3_6_li_4}</li>
          <li>{locale.guideForRent.h3_6_li_5}</li>
          <li>{locale.guideForRent.h3_6_li_6}</li>
          <li>{locale.guideForRent.h3_6_li_7}</li>
          <li>{locale.guideForRent.h3_6_li_8}</li>
        </ul>
        <h3>{locale.guideForRent.h3_7}</h3>
        <ul>
          <li>{locale.guideForRent.h3_7_li_1}</li>
          <li>{locale.guideForRent.h3_7_li_2}</li>
          <li>{locale.guideForRent.h3_7_li_3}</li>
          <li>{locale.guideForRent.h3_7_li_4}</li>
          <li>{locale.guideForRent.h3_7_li_5}</li>
        </ul>
        <h2 id="guideForRentTimeTravel">{locale.guideForRent.h2_3}</h2>
        <h3>{locale.guideForRent.h3_8}</h3>
        <ul>
          <li>{locale.guideForRent.h3_8_li_1}</li>
          <li>{locale.guideForRent.h3_8_li_2}</li>
          <li>{locale.guideForRent.h3_8_li_3}</li>
          <li>{locale.guideForRent.h3_8_li_4}</li>
          <li>{locale.guideForRent.h3_8_li_5}</li>
        </ul>
        <h2 id="guideForRentEndOfJourney">{locale.guideForRent.h2_4}</h2>
        <h3>{locale.guideForRent.h3_9}</h3>
        <ul>
          <li>{locale.guideForRent.h3_9_li_1}</li>
          <li>{locale.guideForRent.h3_9_li_2}</li>
          <li>{locale.guideForRent.h3_9_li_3}</li>
          <li>{locale.guideForRent.h3_9_li_4}</li>
          <li>{locale.guideForRent.h3_9_li_5}</li>
        </ul>
        <h3>{locale.guideForRent.h3_10}</h3>
        <ul>
          <li>{locale.guideForRent.h3_10_li}</li>
        </ul>
      </section>
    </Layout>
  );
};

export default guideForRent;
