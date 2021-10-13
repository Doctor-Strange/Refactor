import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../src/Layout'));
import { NextSeo } from 'next-seo';
// import Layout from "../src/Layout";
// import { logPageView } from "../utils/analytics";

const AboutUs = ({ locale }) => {
  useEffect(() => {
    window['dataLayer'].push({
      event: 'page_view',
      pageURL: window.location.href,
      pagePath: '/sepris',
      pageTitle: locale.sepris.next_seo.title,
    });
    // logPageView();
  }, []);
  return (
    <Layout showToTop={true}>
      <NextSeo
        title={locale.sepris.next_seo.title}
        description={locale.sepris.next_seo.description}
        openGraph={{
          title: locale.sepris.next_seo.title,
          description: locale.sepris.next_seo.description,
        }}
        twitter={{
          handle: locale.sepris.next_seo.handle,
          site: locale.sepris.next_seo.site,
          cardType: locale.sepris.next_seo.cardType,
        }}
      />
      {/* Most of the static pages have a same class named 'static_pages' which set some common style for the main wrapper box*/}
      <section className="responsive static_pages minHeight OTILI">
        <h1>{locale.sepris.h1}</h1>
        <div className="PartOne_OTOLI">
          <div className="partOne_OTOLI_D1 D1_Left">
            <h2 className="diff_color">{locale.sepris.h2_1}</h2>
            <div>
              <h3>{locale.sepris.h3_1}</h3>
              <p>{locale.sepris.p_1}</p>
            </div>
            <div>
              <h3>{locale.sepris.h3_2}</h3>
              <p>{locale.sepris.p_2}</p>
            </div>
            <div>
              <h3>{locale.sepris.h3_3}</h3>
              <p>{locale.sepris.p_3}</p>
            </div>
            <div>
              <h3>{locale.sepris.h3_4}</h3>
              <p>{locale.sepris.p_4}</p>
            </div>
          </div>
          <div className="partOne_OTOLI_D1 D1_Right">
            <h2>{locale.sepris.h2_2}</h2>
            <div>
              <h3>{locale.sepris.h3_5}</h3>
              <p>{locale.sepris.p_5}</p>
            </div>
            <div>
              <h3>{locale.sepris.h3_6}</h3>
              <p>{locale.sepris.p_6}</p>
            </div>
            <div>
              <h3>{locale.sepris.h3_7}</h3>
              <p>{locale.sepris.p_7}</p>
            </div>
          </div>
        </div>
        <h2 className="OTOLI_MIDDLE_Dif">{locale.sepris.h2_3}</h2>
        <div className="PartOne_OTOLI">
          <div className="partOne_OTOLI_D1 D1_Left">
            <div>
              <h3>{locale.sepris.h3_8}</h3>
              <p>{locale.sepris.p_8}</p>
            </div>
          </div>
          <div className="partOne_OTOLI_D1 D1_Right">
            <div>
              <h3>{locale.sepris.h3_9}</h3>
              <p>{locale.sepris.p_9}</p>
            </div>
          </div>
        </div>
        <h2 className="OTOLI_MIDDLE_Dif">{locale.sepris.h2_4}</h2>
        <div className="PartOne_OTOLI">
          <div className="partOne_OTOLI_D1 D1_Left">
            <div>
              <h3>{locale.sepris.h3_10}</h3>
              <p>{locale.sepris.p_10}</p>
            </div>
          </div>
          <div className="partOne_OTOLI_D1 D1_Right">
            <div>
              <h3>{locale.sepris.h3_11}</h3>
              <p>{locale.sepris.p_11}</p>
            </div>
            <div>
              <h3>{locale.sepris.h3_12}</h3>
              <p>{locale.sepris.p_12}</p>
            </div>
          </div>
        </div>
        <h2 className="OTOLI_MIDDLE_Dif">{locale.sepris.h2_5}</h2>
        <div className="PartOne_OTOLI">
          <div className="partOne_OTOLI_D1 D1_Left">
            <div>
              <h3>{locale.sepris.h3_13}</h3>
              <p>{locale.sepris.p_13}</p>
            </div>
          </div>
          <div className="partOne_OTOLI_D1 D1_Right">
            <div>
              <h3>{locale.sepris.h3_14}</h3>
              <p>{locale.sepris.p_14}</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutUs;
