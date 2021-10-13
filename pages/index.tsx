import { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../src/Layout'));
const Search = dynamic(() => import('../src/containers/Search'));
// import Layout from "../src/Layout";
// import Search from "../src/containers/Search";
import { guard_controller } from '../utils/guard_controller';
import ContentHomePage from '../src/components/contentHomePage';
// import { logPageView } from "../utils/analytics";

const HomePage = ({ locale }) => {
  const [authorize, set_authorize] = useState(true);
  useEffect(() => {
    window['dataLayer'].push({
      event: 'page_view',
      pageURL: window.location.href,
      pagePath: '/',
      pageTitle: locale.index.next_seo.title,
    });
    const guard = guard_controller();
    if (guard !== 'auth') {
      set_authorize(false);
    }
    // logPageView();
  }, []);

  return (
    <Layout>
      <NextSeo
        canonical="https://sepris.com/"
        title={locale.index.next_seo.title}
        description={locale.index.next_seo.description}
        openGraph={{
          title: locale.index.next_seo.title,
          description: locale.index.next_seo.description,
          site_name: locale.index.next_seo.site_name,
        }}
        twitter={{
          handle: locale.index.next_seo.handle,
          site: locale.index.next_seo.site,
          cardType: locale.index.next_seo.cardType,
        }}
      />
      <article className="Homepage">
        <div className="banner">
          <h1>{locale.index.banner_h1}</h1>
          <h2>{locale.index.banner_h2}</h2>
          <div className="search_container responsive">
            {/* Render search box in the Home page */}
            <Search language={locale.index} />
          </div>
        </div>
        <ContentHomePage auth={authorize} language={locale.index} />
      </article>
    </Layout>
  );
};

export default HomePage;
