import React, { useContext, useEffect, useState } from "react";
import Profile_info from "./Profile_info";
import Profile_Cars from "./Profile_Cars";
import jsCookie from "js-cookie";
import Router from "next/router";
import { REQUEST_GET_USER_INFO } from "../../API";
import context_user from "../../context/User_info.js";
import { NextSeo } from "next-seo";
import { guard_controller } from "../../../utils/guard_controller";

const Profile_container = ({ language }: IProfile_container) => {
  const [is_mine, setIs_mine] = useState(false);
  const [profile_Id, setProfile_Id] = useState(null);
  const [data, setData] = useState(null);
  const user = useContext(context_user);

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => {
    const user_id = jsCookie.get("user_id");

    const user_cars_info: any = await REQUEST_GET_USER_INFO({
      id: Router.router.query.id,
    });
    window["dataLayer"].push({
      event: "page_view",
      pageURL: window.location.href,
      pagePath: `/user/${user_cars_info.id}`,
      pageTitle: `${language.next_seo.title.start}${
        user_cars_info.company_name
          ? user_cars_info.company_name
          : user_cars_info.name
      }${language.next_seo.title.otoli}`,
    });
    if (user_id == user_cars_info.id) {
      setIs_mine(true);
      const guard = guard_controller();
      if (guard !== "auth") {
        Router.router.push(`/${guard}`);
        return;
      }
    }
    setProfile_Id(user_cars_info.id);
    setData(user_cars_info);
  };

  return (
    <article className='responsive minHeight profile_container'>
      {data ? (
        <>
          <NextSeo
            title={`${language.next_seo.title.start}${
              data.company_name ? data.company_name : data.name
            }${language.next_seo.title.otoli}`}
            description={language.next_seo.description}
            openGraph={{
              title: `${language.next_seo.title.start}${
                data.company_name ? data.company_name : data.name
              }${language.next_seo.title.otoli}`,
              description: language.next_seo.description,
            }}
            twitter={{
              handle: language.next_seo.handle,
              site: language.next_seo.site,
              cardType: language.next_seo.cardType,
            }}
          />
          <Profile_info
            data={data}
            is_mine={is_mine}
            language={language.profile_info}
          />
          <Profile_Cars
            is_mine={is_mine}
            profile_Id={profile_Id}
            language={language.profile_cars}
          />
        </>
      ) : (
        <NextSeo
          title={`${language.next_seo.title.start}${language.next_seo.title.otoli}`}
          description={language.next_seo.description}
        />
      )}
    </article>
  );
};

interface IProfile_container {
  language: any;
}

export default Profile_container;
