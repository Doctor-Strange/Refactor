import App from "next/app";
import Router from "next/router";
import * as Sentry from "@sentry/browser";
// import {
//   GoogleReCaptchaProvider,
//   GoogleReCaptcha,
// } from "react-google-recaptcha-v3";
// import Axios from "axios";
// import { initGA } from "../utils/analytics";
import { REQUEST_GET_USER_INFO, GET_USER_IP } from "../src/API";
import jsCookie from "js-cookie";
import user_context from "../src/context/User_info";
import logo from "../public/android-icon-48x48.png";
import { IoIosClose } from "react-icons/io";
import "../src/styles/main.scss";
import { InternetConnectionContextProvider } from "../src/context/internetConnectionCTX";
import axios from "axios";

Sentry.init({
  dsn: process.env.SENTRY,
});

Router.events.on("routeChangeError", (err, url) => {
  //console.log(`Error loading: ${url}`);
  // Router.push("/500");
});

Router.events.on("routeChangeComplete", (url) => {
  if (url.indexOf("/rent/") !== -1 || url.indexOf("/search-result?") !== -1) {
    return;
  }
  window.scrollTo(0, 0);
  // copied from https://github.com/zeit/next-plugins/issues/282#issuecomment-480740246
});

// Send the Data Layer to the GTA on a route starting to change
// Router.events.on('routeChangeStart', url => {
//     console.log("dataLayer", `${url}`);
//     // window["dataLayer"].push({ 'event': 'virtualPageView' });
//     window["dataLayer"].push({
//         'event': 'virtualPageView',
//         'page': {
//             'url': `${url}`
//         }
//     });
// });

let deferredPrompt = null;
let pwa_flag = false;

class App_Otoli extends App {
  state = {
    token: null,
    BotScore: null,
    user_data: null,
    showPwaBanner: false,
    colorArray: ["#EC7F00", "#14808E", "#7A3B69", "#2A562A", "#116B98"],
    backgroundColor: "",
  };
  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV !== "development") {
      Sentry.withScope((scope) => {
        Object.keys(errorInfo).forEach((key) => {
          scope.setExtra(key, errorInfo[key]);
        });

        Sentry.captureException(error);
        window["ga"]("send", "exception", {
          exDescription: error.message,
        });
      });
      super.componentDidCatch(error, errorInfo);
    }
  }

  // Captcha = (token) => {
  //   let scoreData = null;
  //   try {
  //     window["__recaptchaCallback"] = () => {
  //       if (window["grecaptcha"]) {
  //         window["grecaptcha"]
  //           .execute(process.env.GOOGLE_CAPTCHA, {
  //             action: window.location.pathname.slice(1).replace(/-/, ""),
  //           })
  //           .then(() => {
  //             var url = "https://recaptchaotoli.herokuapp.com/recaptcha/";
  //             Axios.get(url + "?g-recaptcha-response=" + token)
  //               .then((res) => {
  //                 this.setState({ BotScore: res.data.recaptcha.score });
  //                 scoreData = res;
  //                 window["dataLayer"].push({
  //                   event: "recaptcha",
  //                   recaptchaAnswer: res.data.status,
  //                   recaptchaScore: res.data.recaptcha.score,
  //                 });
  //               })
  //               .then(() => {
  //                 Axios.post("https://recaptchaotoli.herokuapp.com/verify/", {
  //                   success: true, // whether this request was a valid reCAPTCHA token for your site
  //                   score: scoreData.data.recaptcha.score, // the score for this request (0.0 - 1.0)
  //                   action: window.location.pathname.slice(1).replace(/-/, ""), // the action name for this request (important to verify)
  //                   hostname: window.location.href, // the hostname of the site where the reCAPTCHA was solved
  //                 })
  //                   .then((res) => {
  //                     if (window["heap"]) {
  //                       window["heap"].addUserProperties({
  //                         RecaptchaScore: scoreData.data.recaptcha.score,
  //                       });
  //                     }
  //                   })
  //                   .catch((e) => {
  //                     console.log(e);
  //                   });
  //               })
  //               .catch((e) => {
  //                 console.log(e);
  //               });
  //           })
  //           .catch((e) => {
  //             console.log(e);
  //           });
  //       }
  //     };
  //     window["__recaptchaCallback"]();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  componentDidMount = () => {
    const userId = jsCookie.get("user_id");
    const token = jsCookie.get("token");
    const first_name = jsCookie.get("first_name");
    if (userId) {
      this.get_user_data(userId, token);
      window["auth"] = true;

      if (first_name) {
        window["complete_register"] = true;
      }
    } else {
      window["auth"] = false;
      window["complete_register"] = false;
    }
    /*
        It checks the current URL if there are any UTM values in there
        NOTE 
          If user login, these information will sended to API
            "/core/device/send-code"
      */
    localStorage["utm_landing_url"] = Router.router.pathname;
    localStorage["utm_referrer"] = document.referrer;

    sessionStorage["guid"] = window
      .btoa(
        Array.from(window.crypto.getRandomValues(new Uint8Array(20 * 2)))
          .map((b) => String.fromCharCode(b))
          .join("")
      )
      .replace(/[+/]/g, "")
      .substring(0, 20);

    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      if (!pwa_flag) {
        this.AnalyticsEvent("pwa", "install-banner", "shown");
        this.setState({
          showPwaBanner: true,
        });
      }
      return false;
    });

    // this.getUserIP();

    this.setState({
      backgroundColor: this.state.colorArray[
        Math.floor(Math.random() * this.state.colorArray.length)
      ],
    });
  };

  AnalyticsEvent = (eventCategory, eventAction, eventLabel) => {
    if (window["ga"]) {
      window["ga"]("send", {
        hitType: "event",
        eventCategory,
        eventAction,
        eventLabel,
      });
    }
  };

  // getUserIP = async () => {
  //   try {
  //     let userIp: any = await GET_USER_IP();
  //     const userLocation = await axios.get(
  //       `http://ip-api.com/json/${userIp.IPv4}`
  //     );

  //     window["dataLayer"].push({
  //       event: "UserLocation",
  //       ...userLocation.data,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  customPwaPrompt = () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
          this.AnalyticsEvent("pwa", "install-prompt", "accepted");
          window["dataLayer"].push({
            event: "GAEvent",
            eventCategory: "pwa",
            eventAction: "install-prompt",
            eventLabel: "accepted",
            eventValue: "",
          });
        } else {
          window["dataLayer"].push({
            event: "GAEvent",
            eventCategory: "pwa",
            eventAction: "install-prompt",
            eventLabel: "rejected",
            eventValue: "",
          });
          this.AnalyticsEvent("pwa", "install-prompt", "rejected");
        }
        pwa_flag = true;
        deferredPrompt = null;
        this.setState({
          showPwaBanner: false,
        });
      });
    }
  };

  get_user_data = async (id, token) => {
    try {
      const response: any = await REQUEST_GET_USER_INFO({ id });
      if (response.first_name)
        jsCookie.set("first_name", response.first_name, {
          expires: 100,
        });
      this.setState({ user_data: { ...response, token } });
    } catch (error) {
      if (error === 111) {
        alert(
          "خطا در اتصال به شبکه، لطفا از اتصال دستگاه به اینترنت مطمئن شوید."
        );
      } else alert("خطا در دریافت اطلاعات حساب کاربری");
    }
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      // <GoogleReCaptchaProvider reCaptchaKey={process.env.GOOGLE_CAPTCHA}>
      <>
        {this.state.showPwaBanner ? (
          <section className="pwa_invitation_banner">
            <div
              className="pwa_content HEAP_PWA_INVITATION"
              onClick={this.customPwaPrompt}
            >
              <img src={logo} alt="pwa logo icon" />
              اپلیکیشن سِپریس را نصب کنید.
            </div>
            <p
              className="close_pwa_invitation"
              onClick={() => {
                this.AnalyticsEvent("pwa", "install-banner", "closed");
                this.setState({
                  showPwaBanner: false,
                });
              }}
            >
              <IoIosClose color="#fff" size="2rem" />
              بستن
            </p>
          </section>
        ) : null}
        <InternetConnectionContextProvider>
          <user_context.Provider
            value={{
              update_user_data: (v) => {
                this.setState({
                  user_data: v,
                });
              },
              data: this.state.user_data,
              avatartBackgroundColor: this.state.backgroundColor,
            }}
          >
            <Component {...pageProps} BotScore={this.state.BotScore} />
          </user_context.Provider>
        </InternetConnectionContextProvider>
      </>

      // <GoogleReCaptcha
      //   onVerify={(token) => {
      //     this.Captcha(token);
      //     this.setState({ token });
      //   }}
      // />
      // </GoogleReCaptchaProvider>
    );
  }
}

export default App_Otoli;
