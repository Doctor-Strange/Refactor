import { useEffect } from "react";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("../src/Layout"));
// import Layout from "../src/Layout";
import { NextSeo } from "next-seo"; 
// import { logPageView } from "../utils/analytics";

const AboutUs = ({locale}) => {
  useEffect(() => {
    window["dataLayer"].push({
      event: "page_view",
      pageURL: window.location.href,
      pagePath: "/about-us",
      pageTitle: locale.aboutUs.next_seo.title,
    });
    // logPageView();
  }, []);
  return (
    <Layout showToTop={true}>
      <NextSeo
        title={locale.aboutUs.next_seo.title}
        description={locale.aboutUs.next_seo.description}
        openGraph={{
          title: locale.aboutUs.next_seo.title,
          description: locale.aboutUs.next_seo.description,
          site_name: locale.aboutUs.next_seo.site_name,
        }}
        twitter={{
          handle: locale.aboutUs.next_seo.handle,
          site: locale.aboutUs.next_seo.site,
          cardType: locale.aboutUs.next_seo.cardType,
        }}
      />
      {/* Most of the static pages have a same class named 'static_pages' which set some common style for the main wrapper box*/}
      <section className="responsive static_pages minHeight">
        <div className="AboutUsPage">
          <h1>{locale.aboutUs.h1}</h1>
          <p>{locale.aboutUs.p}</p>
          <br />
          <br />
          <h3>{locale.aboutUs.h3}</h3>
          <div className="indentation">
            <p>{locale.aboutUs.address}</p>
          </div>
          <h3>{locale.aboutUs.call_numbers}</h3>
          <div className="indentation">
            <a
              href="tel:02188567759"
              className="HEAP_Aboutus_Link_Phone call_numbers"
            >
              {locale.aboutUs.number_1}
            </a>
            ,
            <a
              href="tel:09391414574"
              className="HEAP_Aboutus_Link_Phone call_numbers"
            >
              {locale.aboutUs.number_2}
            </a>
          </div>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12948.97680269182!2d51.3639484!3d35.7693773!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x77421b950619d5b7!2z2LPZvtix24zYsyAoU2VwcmlzKQ!5e0!3m2!1sen!2s!4v1618646009243!5m2!1sfa!2s"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              data-loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutUs;
