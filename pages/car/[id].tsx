import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("../../src/Layout"));
// const CarPage = dynamic(() => import("../../src/containers/car/carpage"));
// import Layout from "../../src/Layout";

import language from "../../public/languages/fa/carpage.json";
// import { logPageView } from "../../utils/analytics";
import { REQUEST_GET_RENTAL_CAR } from "../../src/API";
import { useRouter } from "next/router";
import { payBackInString } from "../../utils/date-range-creator";
import { useEffect } from "react";

import CarPage from "../../src/containers/car/carpage";

const Car = ({
  car_Information,
  is_mine,
  initial_search_id,
  id,
  expired,
  owner_name,
  car_name,
  start_date,
  end_date,
  _404,
}) => {
  const router = useRouter();
  useEffect(() => {
    if (_404) {
      router.push("/404");
    } else {
      window["dataLayer"].push({
        event: "page_view",
        pageURL: window.location.href,
        pagePath: `/car/${id}`,
        pageTitle: car_Information
          ? `${
              car_Information.owner.company_name
                ? car_Information.owner.company_name
                : car_Information.owner.first_name +
                  " " +
                  car_Information.owner.last_name
            } - ${car_Information.car.name.fa}${language.next_seo.title.otoli}`
          : `${owner_name} - ${car_name}${language.next_seo.title.otoli}`,
        searchedLocation: localStorage["searchedLocation"]
          ? localStorage["searchedLocation"]
          : "",
      });
    }
    // logPageView();
  }, []);

  return (
    <Layout>
      {car_Information ? (
        <NextSeo
          noindex={true}
          title={`${
            car_Information.owner.company_name
              ? car_Information.owner.company_name
              : car_Information.owner.first_name +
                " " +
                car_Information.owner.last_name
          } - ${car_Information.car.name.fa}${language.next_seo.title.otoli}`}
          // description={language.next_seo.description}
          openGraph={{
            title: `${
              car_Information.owner.company_name
                ? car_Information.owner.company_name
                : car_Information.owner.first_name +
                  " " +
                  car_Information.owner.last_name
            } - ${car_Information.car.name.fa}${language.next_seo.title.otoli}`,
            // description: language.next_seo.description,
            images:
              car_Information.media_set.length !== 0
                ? [
                    {
                      url: car_Information.media_set[0].thumbnail_url,
                      width: car_Information.media_set[0].thumbnail_width,
                      height: car_Information.media_set[0].thumbnail_height,
                      alt: `تصویر خودرو ${car_Information.car.slug.fa}`,
                    },
                  ]
                : [],
            site_name: language.next_seo.site_name,
          }}
          twitter={{
            handle: language.next_seo.handle,
            site: language.next_seo.site,
            cardType: language.next_seo.cardType,
          }}
        />
      ) : (
        <NextSeo
          noindex={true}
          title={`${owner_name} - ${car_name}${language.next_seo.title.otoli}`}
          description={language.next_seo.description}
          openGraph={{
            title: `${owner_name} - ${car_name}${language.next_seo.title.otoli}`,
            description: language.next_seo.description,
            site_name: language.next_seo.site_name,
          }}
          twitter={{
            handle: language.next_seo.handle,
            site: language.next_seo.site,
            cardType: language.next_seo.cardType,
          }}
        />
      )}
      <CarPage
        language={language}
        is_mine={is_mine}
        car_Information={car_Information}
        initial_search_id={initial_search_id}
        id={id}
        start_date={start_date}
        end_date={end_date}
        expired={expired}
      />
    </Layout>
  );
};

export async function getServerSideProps(props) {
  let {
    search_id,
    id,
    owner,
    owner_name,
    car_name,
    start_date,
    end_date,
  } = props.query;
  try {
    const generated_start_date = payBackInString(6, 3).start_date;
    const generated_end_date = payBackInString(6, 3).end_date;

    if (owner_name) {
      return {
        props: {
          owner_name,
          car_name,
          car_Information: null,
          is_mine: owner ? owner : null,
          initial_search_id: search_id ? search_id : null,
          expired: false,
          start_date: start_date ? start_date : generated_start_date,
          end_date: end_date ? end_date : generated_end_date,
          id,
        },
      };
    } else {
      let param = null;
      if (search_id) {
        param = { search_id };
      } else {
        if (start_date) {
          param = { id, start_date, end_date };
        } else {
          param = {
            id,
            start_date: generated_start_date,
            end_date: generated_end_date,
          };
        }
      }

      const res: any = await REQUEST_GET_RENTAL_CAR(param);
      return {
        props: {
          car_Information: res,
          is_mine: owner ? owner : null,
          initial_search_id: search_id ? search_id : null,
          start_date: res.start_date
            ? res.start_date
            : start_date
            ? start_date
            : generated_start_date,
          end_date: res.end_date
            ? res.end_date
            : end_date
            ? end_date
            : generated_end_date,
          id,
        },
      };
    }
  } catch (error) {
    let init_props = {
      car_Information: null,
      is_mine: false,
      initial_search_id: null,
      id,
    };
    if (error === "Not found!") {
      init_props["expired"] = true;
      init_props["_404"] = true;
    }
    if (error === "INVALID_SEARCH_ID") {
      init_props["expired"] = true;
    }
    return {
      props: init_props,
    };
  }
}

export default Car;
