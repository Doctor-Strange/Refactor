import { useEffect } from 'react';

import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../src/Layout'));
// import Layout from "../src/Layout";
import { NextSeo } from 'next-seo';
// import { logPageView } from "../utils/analytics";

const guidePicture = ({ locale }) => {
  useEffect(() => {
    window['dataLayer'].push({
      event: 'page_view',
      pageURL: window.location.href,
      pagePath: '/guide-picture',
      pageTitle: locale.guidePicture.next_seo.title,
    });
    // logPageView();
  }, []);
  return (
    <Layout showToTop={true}>
      <NextSeo
        title={locale.guidePicture.next_seo.title}
        description={locale.guidePicture.next_seo.description}
        openGraph={{
          title: locale.guidePicture.next_seo.title,
          description: locale.guidePicture.next_seo.description,
        }}
        twitter={{
          handle: locale.guidePicture.next_seo.handle,
          site: locale.guidePicture.next_seo.site,
          cardType: locale.guidePicture.next_seo.cardType,
        }}
      />
      {/* Most of the static pages have a same class named 'static_pages' which set some common style for the main wrapper box*/}
      <section className="responsive static_pages minHeight">
        <h1>{locale.guidePicture.h1}</h1>
        <p>{locale.guidePicture.p}</p>
        <h2 id="guidePictureHowTakePicture">{locale.guidePicture.h2_1}</h2>
        <ul>
          <li>{locale.guidePicture.li_1}</li>
          <li>{locale.guidePicture.li_2}</li>
          <li>{locale.guidePicture.li_3}</li>
          <li>{locale.guidePicture.li_4}</li>
          <li>{locale.guidePicture.li_5}</li>
          <li>{locale.guidePicture.li_6}</li>
          <li>{locale.guidePicture.li_7}</li>
          <li>{locale.guidePicture.li_8}</li>
        </ul>
        <h2 id="guidePictureDontMakeMistake">{locale.guidePicture.h2_2}</h2>
        <ul>
          <li>{locale.guidePicture.li_9}</li>
          <li>{locale.guidePicture.li_10}</li>
          <li>{locale.guidePicture.li_11}</li>
          <li>{locale.guidePicture.li_12}</li>
          <li>{locale.guidePicture.li_13}</li>
          <li>{locale.guidePicture.li_14}</li>
          <li>{locale.guidePicture.li_15}</li>
        </ul>
      </section>
    </Layout>
  );
};

export default guidePicture;
