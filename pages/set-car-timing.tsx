import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../src/Layout'));
const Set_car_timing = dynamic(() =>
  import('../src/containers/Set_car_timing'),
);
// import Layout from "../src/Layout";
// import Set_car_timing from "../src/containers/Set_car_timing";
import { NextSeo } from 'next-seo';
// import { logPageView } from "../utils/analytics";

const SetTimeAndPrice = ({ locale }) => {
  useEffect(() => {
    window['dataLayer'].push({
      event: 'page_view',
      pageURL: window.location.href,
      pagePath: '/set-car-timing',
      pageTitle: locale.setCarTiming.next_seo.title,
    });
    // logPageView();
  }, []);
  return (
    <Layout LinkControl={true}>
      <NextSeo
        title={locale.setCarTiming.next_seo.title}
        description={locale.setCarTiming.next_seo.description}
        openGraph={{
          title: locale.setCarTiming.next_seo.title,
          description: locale.setCarTiming.next_seo.description,
        }}
        twitter={{
          handle: locale.setCarTiming.next_seo.handle,
          site: locale.setCarTiming.next_seo.site,
          cardType: locale.setCarTiming.next_seo.cardType,
        }}
      />
      <Set_car_timing language={locale.setCarTiming} />
    </Layout>
  );
};

export default SetTimeAndPrice;
