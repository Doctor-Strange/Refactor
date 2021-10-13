import { useEffect } from "react";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("../src/Layout"));
// const Search_result = dynamic(() => import("../src/containers/Search_result"));
// import Layout from "../src/Layout";
import { NextSeo } from "next-seo"; 
// import { logPageView } from "../utils/analytics";
import { payBackInString } from "../utils/date-range-creator";
import Search_result from "../src/containers/Search_result";
import { useRouter } from "next/router";

const SearchResult = ({ page_title, locale }) => {
  const router = useRouter();
  useEffect(() => {
    const searchedLocation = localStorage["searchedLocation"]
      ? localStorage["searchedLocation"]
      : router.query?.location_name
      ? router.query.location_name
      : "all";

    window["dataLayer"].push({
      event: "page_view",
      pageURL: window.location.href,
      pagePath: "/search-result",
      pageTitle: `${locale.searchResult.next_seo.title.start}${locale.searchResult.next_seo.title.otoli}`,
      searchedLocation,
    });
    // logPageView();
  }, []);

  return (
    <Layout>
      <NextSeo
        title={`${locale.searchResult.next_seo.title.start}${locale.searchResult.next_seo.title.otoli}`}
        description={locale.searchResult.nextSeo_description}
        openGraph={{
          title: `${locale.searchResult.next_seo.title.start}${locale.searchResult.next_seo.title.otoli}`,
          description: locale.searchResult.next_seo.description,
          site_name: locale.searchResult.next_seo.site_name,
        }}
        twitter={{
          handle: locale.searchResult.next_seo.handle,
          site: locale.searchResult.next_seo.site,
          cardType: locale.searchResult.next_seo.cardType,
        }}
      />
      <Search_result language={locale.searchResult} />
    </Layout>
  );
};

export async function getServerSideProps(props) {
  const page_title = {
    // param_location_name: null,
    param_start_date: null,
    param_end_date: null,
  };
  if (Object.keys(props.query).length !== 0 && page_title.param_start_date) {
    const { location_name, start_date, end_date } = props.query;
    // page_title.param_location_name = location_name;
    page_title.param_start_date = start_date;
    page_title.param_end_date = end_date;
  } else {
    const { start_date, end_date } = payBackInString(6, 3);
    // page_title.param_location_name = "تهران";
    page_title.param_start_date = start_date;
    page_title.param_end_date = end_date;
  }
  return {
    props: { page_title },
  };
}

export default SearchResult;
