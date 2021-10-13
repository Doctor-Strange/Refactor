import { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import net_CTX from '../src/context/internetConnectionCTX';
import HelpCenterContainer from '../src/containers/helpCenterContainer';
const Layout = dynamic(() => import('../src/Layout'));
import { NextSeo } from 'next-seo';

const HelpCenter = ({ locale }) => {
  const [UrlList, UrlSetter] = useState([]);
  const netCTX = useContext(net_CTX);

  useEffect(() => {
    window['dataLayer'].push({
      event: 'page_view',
      pageURL: window.location.href,
      pagePath: '/help-center',
      pageTitle: locale.helpCenter.next_seo.title,
    });
    // logPageView();
  }, []);

  return (
    <Layout>
      <NextSeo
        title={locale.helpCenter.next_seo.title}
        description={locale.helpCenter.next_seo.description}
        openGraph={{
          title: locale.helpCenter.next_seo.title,
          description: locale.helpCenter.next_seo.description,
        }}
        twitter={{
          handle: locale.helpCenter.next_seo.handle,
          site: locale.helpCenter.next_seo.site,
          cardType: locale.helpCenter.next_seo.cardType,
        }}
      />
      <article className="responsive  minHeight help_center">
        <HelpCenterContainer />
      </article>
    </Layout>
  );
};

export default HelpCenter;
