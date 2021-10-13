import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../src/Layout'));
// import Layout from "../src/Layout";
import { NextSeo } from 'next-seo';
import Link from 'next/link';
// import { logPageView } from "../utils/analytics";

const guideRenter = ({ locale }) => {
  useEffect(() => {
    window['dataLayer'].push({
      event: 'page_view',
      pageURL: window.location.href,
      pagePath: '/guide-renter',
      pageTitle: locale.guideRenter.next_seo.title,
    });
    // logPageView();
  }, []);
  return (
    <Layout showToTop={true}>
      <NextSeo
        title={locale.guideRenter.next_seo.title}
        description={locale.guideRenter.next_seo.description}
        openGraph={{
          title: locale.guideRenter.next_seo.title,
          description: locale.guideRenter.next_seo.description,
        }}
        twitter={{
          handle: locale.guideRenter.next_seo.handle,
          site: locale.guideRenter.next_seo.site,
          cardType: locale.guideRenter.next_seo.cardType,
        }}
      />
      {/* Most of the static pages have a same class named 'static_pages' which set some common style for the main wrapper box*/}
      <section className="responsive static_pages minHeight">
        <h1>{locale.guideRenter.h1}</h1>
        <h2 id="guideForHostBeforeRent">{locale.guideRenter.h2_1}</h2>
        <ul>
          <li>{locale.guideRenter.h2_1_li_1}</li>
          <li>{locale.guideRenter.h2_1_li_2}</li>
          <li>{locale.guideRenter.h2_1_li_3}</li>
          <li>{locale.guideRenter.h2_1_li_4}</li>
        </ul>
        <h2 id="guideForHostAddCar">{locale.guideRenter.h2_2}</h2>
        <ul>
          <li>{locale.guideRenter.h2_2_li_1}</li>
          <li>{locale.guideRenter.h2_2_li_2}</li>
          <li>{locale.guideRenter.h2_2_li_3}</li>
          <li>{locale.guideRenter.h2_2_li_4}</li>
          <li>{locale.guideRenter.h2_2_li_5}</li>
          <li>{locale.guideRenter.h2_2_li_6}</li>
          {/* <li>
              در زمان ثبت خودرو، تمام شرایط موردنظر خود از جمله مبلغ ودیعه، مبلغ
              سفته و قوانین کنسلی رزرو را کامل شرح دهید.
            </li> */}
          <li>{locale.guideRenter.h2_2_li_7}</li>
          <li>{locale.guideRenter.h2_2_li_8}</li>
          {/* <li>
              از آنجایی که خرید بیمه از سمت مهمان هزینه خسارات را کمتر
              خواهد کرد، بهتر است برای مهمان‌هایی که بیمه می‌خرند، ودیعه
              کمتری درنظر بگیرید تا شانس اجاره خودرو شما بیشتر شود.
            </li>
            <li>
              بهتر است شما شرایط اجاره خودرو را در دو حالت «با خرید بیمه» و
              «بدون خرید بیمه» شرح دهید.
            </li> */}
          <li>{locale.guideRenter.h2_2_li_9}</li>
          <li>{locale.guideRenter.h2_2_li_10}</li>
          <li>{locale.guideRenter.h2_2_li_11}</li>
          <li>{locale.guideRenter.h2_2_li_12}</li>
        </ul>
        <h2 id="guideForHostCancelationPolicies">{locale.guideRenter.h2_3}</h2>
        <p className="TextIndenter">{locale.guideRenter.h2_3_p_1}</p>
        <p className="TextIndenter">{locale.guideRenter.h2_3_p_2}</p>
        <p className="TextIndenter">{locale.guideRenter.h2_3_p_3}</p>
        <p className="TextIndenter">{locale.guideRenter.h2_3_p_4}</p>
        <p className="TextIndenter">
          {locale.guideRenter.h2_3_p_have_link_1}
          <u>
            <Link href="/gps" prefetch={false}>
              <a>{locale.guideRenter.h2_3_p_have_link_a}</a>
            </Link>
          </u>
          {locale.guideRenter.h2_3_p_have_link_2}
        </p>
        <h2 id="guideForHostRequestManagment">{locale.guideRenter.h2_4}</h2>
        <ul>
          <li>{locale.guideRenter.h2_4_li_1}</li>
          <li>{locale.guideRenter.h2_4_li_2}</li>
          <li>{locale.guideRenter.h2_4_li_3}</li>
          <li>{locale.guideRenter.h2_4_li_4}</li>
          <li>{locale.guideRenter.h2_4_li_5}</li>
          <li>{locale.guideRenter.h2_4_li_6}</li>
          <li>{locale.guideRenter.h2_4_li_7}</li>
          <li>{locale.guideRenter.h2_4_li_8}</li>
        </ul>
        <h2 id="guideForHostDeliverCar">{locale.guideRenter.h2_5}</h2>
        <ul>
          <li>{locale.guideRenter.h2_5_li_1}</li>
          <li>{locale.guideRenter.h2_5_li_2}</li>
          <li>{locale.guideRenter.h2_5_li_3}</li>
          <li>{locale.guideRenter.h2_5_li_4}</li>
          <li>{locale.guideRenter.h2_5_li_5}</li>
          <li>{locale.guideRenter.h2_5_li_6}</li>
        </ul>
        <h2 id="guideForHostReturnCar">{locale.guideRenter.h2_6}</h2>
        <ul>
          <li>{locale.guideRenter.h2_6_li_1}</li>
          <li>{locale.guideRenter.h2_6_li_2}</li>
          <li>{locale.guideRenter.h2_6_li_3}</li>
          <li>{locale.guideRenter.h2_6_li_4}</li>
          <li>{locale.guideRenter.h2_6_li_5}</li>
        </ul>
      </section>
    </Layout>
  );
};

export default guideRenter;
