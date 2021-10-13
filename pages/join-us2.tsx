import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../src/Layout'));
const Calculator = dynamic(() => import('../src/components/calculator'));
const Join_us_content_AB_test = dynamic(() =>
  import('../src/components/calculator/Join_us_content/AbTestContent'),
);
// import Layout from "../src/Layout";
import { NextSeo } from 'next-seo';
// import Calculator from "../src/components/calculator";
// import Join_us_content from "../src/components/calculator/Join_us_content";
// import Join_us_content_AB_test from "../src/components/calculator/Join_us_content/AbTestContent";
// import { logPageView } from "../utils/analytics";

const JoinUs = ({ BotScore, locale }) => {
  const [Score, SetScore] = useState(null);
  useEffect(() => {
    window['dataLayer'].push({
      event: 'page_view',
      pageURL: window.location.href,
      pagePath: '/join-us2',
      pageTitle: locale.joinUs.next_seo.title,
    });
    // logPageView();
  }, []);

  useEffect(() => {
    if (BotScore) {
      SetScore(BotScore);
    }
  }, [BotScore]);
  return (
    <Layout LinkControl={true}>
      <NextSeo
        title={locale.joinUs.next_seo.title}
        description={locale.joinUs.next_seo.description}
        openGraph={{
          title: locale.joinUs.next_seo.title,
          description: locale.joinUs.next_seo.description,
        }}
        twitter={{
          handle: locale.joinUs.next_seo.handle,
          site: locale.joinUs.next_seo.site,
          cardType: locale.joinUs.next_seo.cardType,
        }}
      />
      <article className="join_us">
        <section className="banner">
          <h1>{locale.joinUs.h1}</h1>
          <h2>{locale.joinUs.h2} </h2>
          <div className="responsive calculator_container">
            {/* You can set the Button text when you call the Calculator component */}
            <Calculator
              language={locale.joinUs.calculator}
              AbText={locale.joinUs.calculator_text}
            />
          </div>
          <p className="temporary_score">{Score}</p>
        </section>
        <Join_us_content_AB_test
          language={locale.joinUs.join_us_content}
          AbText={locale.joinUs.join_us_content_text}
        />
      </article>
    </Layout>
  );
};

export default JoinUs;
