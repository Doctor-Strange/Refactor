import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../src/Layout'));
// import Layout from "../src/Layout";
import { NextSeo } from 'next-seo';
// import { logPageView } from "../utils/analytics";

const InsurancePolicies = ({ locale }) => {
  useEffect(() => {
    window['dataLayer'].push({
      event: 'page_view',
      pageURL: window.location.href,
      pagePath: '/insurance-policies',
      pageTitle: locale.insurancePolicies.next_seo.title,
    });
    // logPageView();
  }, []);
  return (
    <Layout showToTop={true}>
      <NextSeo
        title={locale.insurancePolicies.next_seo.title}
        description={locale.insurancePolicies.next_seo.description}
        openGraph={{
          title: locale.insurancePolicies.next_seo.title,
          description: locale.insurancePolicies.next_seo.description,
        }}
        twitter={{
          handle: locale.insurancePolicies.next_seo.handle,
          site: locale.insurancePolicies.next_seo.site,
          cardType: locale.insurancePolicies.next_seo.cardType,
        }}
      />
      {/* Most of the static pages have a same class named 'static_pages' which set some common style for the main wrapper box*/}
      <section className="responsive static_pages minHeight">
        <h1>{locale.insurancePolicies.h1}</h1>
        <p>{locale.insurancePolicies.p_1}</p>
        <p>
          <strong>
            <u>{locale.insurancePolicies.p_2}</u>
          </strong>
        </p>
        <h2>
          <u>{locale.insurancePolicies.h2_1}</u>
        </h2>
        <p>{locale.insurancePolicies.p_3}</p>
        <ul>
          <li>{locale.insurancePolicies.p_3_ul_li_1}</li>
          <li>{locale.insurancePolicies.p_3_ul_li_2}</li>
          <li>{locale.insurancePolicies.p_3_ul_li_3}</li>
          <li>{locale.insurancePolicies.p_3_ul_li_4}</li>
          <li>{locale.insurancePolicies.p_3_ul_li_5}</li>
        </ul>
        <h2>{locale.insurancePolicies.h2_2}</h2>
        <p>{locale.insurancePolicies.p_4}</p>
        <p>
          <strong>{locale.insurancePolicies.p_5_strong} </strong>
          {locale.insurancePolicies.p_5}
        </p>
        <p>
          <strong>{locale.insurancePolicies.p_6_strong} </strong>
          {locale.insurancePolicies.p_6}
        </p>
        <p>
          <strong>{locale.insurancePolicies.p_7_strong} </strong>
          {locale.insurancePolicies.p_7}
        </p>
        <p>
          <strong>{locale.insurancePolicies.p_8_strong} </strong>
          {locale.insurancePolicies.p_8}
        </p>
        <p>
          <strong>{locale.insurancePolicies.p_9_strong} </strong>
          {locale.insurancePolicies.p_9}
        </p>
        <p>
          <strong>{locale.insurancePolicies.p_10_strong} </strong>
          {locale.insurancePolicies.p_10}
        </p>
        <p>
          <strong>{locale.insurancePolicies.p_11_strong} </strong>
          {locale.insurancePolicies.p_11}
        </p>
        <h2>
          <u>{locale.insurancePolicies.h2_3}</u>
        </h2>
        <h3>{locale.insurancePolicies.h2_3_h3_1}</h3>
        <p>{locale.insurancePolicies.p_12}</p>
        <ul>
          <li>{locale.insurancePolicies.p_12_ul_li_1}</li>
          <li>{locale.insurancePolicies.p_12_ul_li_2}</li>
          <li>{locale.insurancePolicies.p_12_ul_li_3}</li>
          <li>{locale.insurancePolicies.p_12_ul_li_4}</li>
          <li>{locale.insurancePolicies.p_12_ul_li_5}</li>
        </ul>
        <h3>{locale.insurancePolicies.h2_3_h3_2}</h3>
        <p>{locale.insurancePolicies.p_13}</p>
        <h2>
          <u>{locale.insurancePolicies.h2_4}</u>
        </h2>
        <h3>{locale.insurancePolicies.h2_4_h3_1}</h3>
        <p>{locale.insurancePolicies.p_14}</p>
        <ul>
          <li>{locale.insurancePolicies.p_14_ul_li_1}</li>
          <li>{locale.insurancePolicies.p_14_ul_li_2}</li>
          <li>{locale.insurancePolicies.p_14_ul_li_3}</li>
          <li>{locale.insurancePolicies.p_14_ul_li_4}</li>
          <li>{locale.insurancePolicies.p_14_ul_li_5}</li>
          <li>{locale.insurancePolicies.p_14_ul_li_6}</li>
        </ul>
        <h3>{locale.insurancePolicies.h2_4_h3_2}</h3>
        <p>{locale.insurancePolicies.p_15}</p>
        <ul>
          <li>{locale.insurancePolicies.p_15_ul_li_1}</li>
          <li>{locale.insurancePolicies.p_15_ul_li_2}</li>
          <li>{locale.insurancePolicies.p_15_ul_li_3}</li>
          <li>{locale.insurancePolicies.p_15_ul_li_4}</li>
          <li>{locale.insurancePolicies.p_15_ul_li_5}</li>
          <li>{locale.insurancePolicies.p_15_ul_li_6}</li>
          <li>{locale.insurancePolicies.p_15_ul_li_7}</li>
          <li>{locale.insurancePolicies.p_15_ul_li_8}</li>
          <li>{locale.insurancePolicies.p_15_ul_li_9}</li>
        </ul>
        <h2>
          <u>{locale.insurancePolicies.h2_5}</u>
        </h2>
        <h3>{locale.insurancePolicies.h2_5_h3_1}</h3>
        <p>{locale.insurancePolicies.p_16}</p>
        <h3>{locale.insurancePolicies.h2_5_h3_2}</h3>
        <p>{locale.insurancePolicies.p_17}</p>
        <h3>{locale.insurancePolicies.h2_5_h3_3}</h3>
        <p>{locale.insurancePolicies.p_18}</p>
        <h2>{locale.insurancePolicies.h2_6}</h2>
        <p>{locale.insurancePolicies.p_19}</p>
        <h2>{locale.insurancePolicies.h2_7}</h2>
        <p>{locale.insurancePolicies.p_20}</p>
        <h2>{locale.insurancePolicies.h2_8}</h2>
        <p>{locale.insurancePolicies.p_21}</p>
        <h2>
          <u>{locale.insurancePolicies.h2_9}</u>
        </h2>
        <h3>{locale.insurancePolicies.h2_9_h3_1}</h3>
        <p>{locale.insurancePolicies.p_22}</p>
        <h4>{locale.insurancePolicies.h2_9_h4_1}</h4>
        <ul>
          <li>{locale.insurancePolicies.h2_9_h4_1_li_1}</li>
          <li>{locale.insurancePolicies.h2_9_h4_1_li_2}</li>
          <li>{locale.insurancePolicies.h2_9_h4_1_li_3}</li>
        </ul>
        <h4>{locale.insurancePolicies.h2_9_h4_2}</h4>
        <ul>
          <li>{locale.insurancePolicies.h2_9_h4_2_li_1}</li>
          <li>{locale.insurancePolicies.h2_9_h4_2_li_2}</li>
        </ul>
        <h4>{locale.insurancePolicies.h2_9_h4_3}</h4>
        <p>{locale.insurancePolicies.p_23}</p>
        <h2>{locale.insurancePolicies.h2_10}</h2>
        <h3>{locale.insurancePolicies.h2_10_h3_1}</h3>
        <p>{locale.insurancePolicies.p_24}</p>
        <h3>{locale.insurancePolicies.h2_10_h3_2}</h3>
        <p>{locale.insurancePolicies.p_25}</p>
        <p>
          <strong>{locale.insurancePolicies.p_26_strong} </strong>
          {locale.insurancePolicies.p_26}
        </p>
        <p>
          <strong>{locale.insurancePolicies.p_27_strong} </strong>
          {locale.insurancePolicies.p_27}
        </p>
        <p>
          <strong>{locale.insurancePolicies.p_28_strong} </strong>
          {locale.insurancePolicies.p_28}
        </p>
        <p>
          <strong>{locale.insurancePolicies.p_29_strong} </strong>
          {locale.insurancePolicies.p_29}
        </p>
        <h3>{locale.insurancePolicies.h2_10_h3_3}</h3>
        <p>{locale.insurancePolicies.p_30}</p>
        <h2>
          <u>{locale.insurancePolicies.h2_11}</u>
        </h2>
        <p>{locale.insurancePolicies.p_31}</p>
        <p>
          <strong>{locale.insurancePolicies.p_32_strong} </strong>
          {locale.insurancePolicies.p_32}
        </p>
        <p>
          <u>
            <strong>{locale.insurancePolicies.p_33_strong} </strong>
            {locale.insurancePolicies.p_33}
          </u>
        </p>
        <h2>
          <u>{locale.insurancePolicies.h2_12}</u>
        </h2>
        <h3>{locale.insurancePolicies.h2_12_h3_1}</h3>
        <p>{locale.insurancePolicies.p_34}</p>
        <h3>{locale.insurancePolicies.h2_12_h3_2}</h3>
        <p>{locale.insurancePolicies.p_35}</p>
        <h3>{locale.insurancePolicies.h2_12_h3_3}</h3>
        <p>{locale.insurancePolicies.p_36}</p>
        <h3>{locale.insurancePolicies.h2_12_h3_4}</h3>
        <p>{locale.insurancePolicies.p_37}</p>

        <h2>{locale.insurancePolicies.h2_13}</h2>
        <h3>{locale.insurancePolicies.h2_13_h3}</h3>
        <p>
          <strong>{locale.insurancePolicies.p_38_strong} </strong>
          {locale.insurancePolicies.p_38}
        </p>
        <h2>{locale.insurancePolicies.h2_14}</h2>
        <ul>
          <li>
            <strong>{locale.insurancePolicies.h2_14_li_1}</strong>
          </li>
          <p className="intends">{locale.insurancePolicies.p_39}</p>
          <li>
            <strong>{locale.insurancePolicies.h2_14_li_2}</strong>
          </li>
          <ul className="intends">
            <li>{locale.insurancePolicies.h2_14_li_2_li_1}</li>
            <li>{locale.insurancePolicies.h2_14_li_2_li_2}</li>
            <li>{locale.insurancePolicies.h2_14_li_2_li_3}</li>
            <li>{locale.insurancePolicies.h2_14_li_2_li_4}</li>
            <li>{locale.insurancePolicies.h2_14_li_2_li_5}</li>
            <li>{locale.insurancePolicies.h2_14_li_2_li_6}</li>
            <li>{locale.insurancePolicies.h2_14_li_2_li_7}</li>
            <li>{locale.insurancePolicies.h2_14_li_2_li_8}</li>
            <li>{locale.insurancePolicies.h2_14_li_2_li_9}</li>
          </ul>

          <p>
            <strong>{locale.insurancePolicies.p_40_strong} </strong>
            {locale.insurancePolicies.p_40}
          </p>
          <p>
            <strong>{locale.insurancePolicies.p_41_strong} </strong>
            {locale.insurancePolicies.p_41}
          </p>
          <p>{locale.insurancePolicies.p_42}</p>
          <p>
            <strong>{locale.insurancePolicies.p_43_strong} </strong>
            {locale.insurancePolicies.p_43}
          </p>
          <li>
            <strong>{locale.insurancePolicies.h2_14_li_3}</strong>
          </li>
          <p>{locale.insurancePolicies.p_44}</p>
          <li>
            <strong>{locale.insurancePolicies.h2_14_li_4}</strong>
          </li>
          <p>{locale.insurancePolicies.p_45}</p>
          <ul className="intends">
            <li>{locale.insurancePolicies.p_45_li_1}</li>
            <li>{locale.insurancePolicies.p_45_li_2}</li>
          </ul>
          <p>
            <strong>{locale.insurancePolicies.p_46_strong}</strong>
            {locale.insurancePolicies.p_46}
          </p>
          <li>
            <strong>{locale.insurancePolicies.p_45_li_3}</strong>
          </li>
          <p>{locale.insurancePolicies.p_47}</p>
          <li>
            <u>
              <strong>{locale.insurancePolicies.p_45_li_4}</strong>
            </u>
          </li>
          <p>{locale.insurancePolicies.p_48}</p>
          <li>
            <strong>{locale.insurancePolicies.p_45_li_5}</strong>
          </li>
          <p>{locale.insurancePolicies.p_49}</p>
          <p>{locale.insurancePolicies.p_50}</p>
          <p>{locale.insurancePolicies.p_51}</p>
          <p>{locale.insurancePolicies.p_52}</p>
        </ul>
      </section>
    </Layout>
  );
};

export default InsurancePolicies;
