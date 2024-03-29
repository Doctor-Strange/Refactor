import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";
import { IoMdPerson } from "react-icons/io";
import { NextSeo } from "next-seo";
import language from "../public/languages/fa/login.json";

import { FaArrowRight } from "react-icons/fa";
import context_user from "../src/context/User_info";
import dynamic from "next/dynamic";
// import { logPageView } from "../utils/analytics";
// import jsCookie from "js-cookie";
// import Layout from "../src/Layout";

const Layout = dynamic(() => import("../src/Layout"));
const ConfirmCode = dynamic(() =>
  import("../src/containers/header/modals/ConfirmCode")
);
const GetUserCellPhone = dynamic(() =>
  import("../src/containers/header/modals/GetUserCellPhone")
);

const LoginPage = () => {
  const [change, setChange] = useState(false);
  const [deactivate_form, set_deactivate_form] = useState(false);
  const user = useContext(context_user);
  const router = useRouter();

  const panelController = () => {
    setChange(!change);
  };

  useEffect(() => {
    window["dataLayer"].push({
      event: "page_view",
      pageURL: window.location.href,
      pagePath: "/login",
      pageTitle: language.next_seo.title,
    });

    if (window["auth"]) {
      set_deactivate_form(true);
      // if (localStorage["history"] !== "/add-car") window.history.go(-1);
      // else router.push("/add-car");
      // if (window["complete_register"]) {
      //   let id = user.data?.id;
      //   router.push(`/user/${id}`);
      // }
    } else {
      set_deactivate_form(false);
    }
  }, []);

  return (
    <Layout>
      <NextSeo
        title={language.next_seo.title}
        description={language.next_seo.description}
        openGraph={{
          title: language.next_seo.title,
          description: language.next_seo.description,
        }}
        twitter={{
          handle: language.next_seo.handle,
          site: language.next_seo.site,
          cardType: language.next_seo.cardType,
        }}
      />
      <div className="Please_login_container minHeight">
        <div
          className={[
            "modal_box",
            change ? "confirm_code" : "login_modal",
          ].join(" ")}
        >
          {change ? (
            <div className="login_modal_title_confirm_code">
              <FaArrowRight
                onClick={panelController}
                size="2rem"
                color="#4ba3ce"
                className="login_person_icon"
              />
              <h2>{language.ConfirmCode.confirm_code_title}</h2>
            </div>
          ) : (
            <div className="login_modal_title">
              <IoMdPerson
                size="2rem"
                color="#fff"
                className="login_person_icon"
              />
              <h2>{language.GetUserCellPhone.log_sigh}</h2>
            </div>
          )}
          {change ? (
            <ConfirmCode
              language={language.ConfirmCode}
              panelController={panelController}
              customModalControl={true}
              deactivate_form={deactivate_form}
            />
          ) : (
            <GetUserCellPhone
              language={language.GetUserCellPhone}
              data-test-id="GetUserCellPhone"
              panelController={panelController}
              deactivate_form={deactivate_form}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
