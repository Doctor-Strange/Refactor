import React, { useEffect, useReducer, useState, useContext } from "react";
import Router from "next/router";
import Footer from "../components/Footer";
import Header from "../containers/header";
import "../styles/main.scss";
import modal_context from "../context/Modal_context";
import auth_context from "../context/Auth_context";
import toast_context from "../context/Toast_context";
import Toast from "../components/Toast";

const ShowModalReducer = (current, action) => {
  if (action.type === "SET") return !current;
};

const Layout = (props: ILayout) => {
  const [modalType, setModalType] = useState("Login");
  const [data, setData] = useState(null);
  const [Auth, setAuth] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastData, setToastData] = useState(null);

  const [Show_Modal, dispatch] = useReducer(ShowModalReducer, false);

  useEffect(() => {
    if (Router.router) {
      if (Router.router.query.utm_source) {
        localStorage["utm_source"] = Router.query.utm_source;
        localStorage["utm_medium"] = Router.query.utm_medium;
        localStorage["utm_campaign"] = Router.query.utm_campaign;
        localStorage["utm_term"] = Router.query.utm_term;
        localStorage["utm_content"] = Router.query.utm_content;
        localStorage["utm_landing_url"] = "https://otoli.net/join-us";
      }
    }
  }, []);

  const modal_handler = (type, data) => {
    dispatch({ type: "SET" });
    setModalType(type);
    setData(data);
  };

  const toast_handler = (data) => { 
    setToastData(data);
    setToast(true);
  };

  return (
    <>
      <toast_context.Provider
        value={{
          show_toast: toast,
          toast_option: (data) => {
            toast_handler(data);
          },
        }}
      >
        <modal_context.Provider
          value={{
            show_modal: Show_Modal,
            modalHandler: (type, data) => {
              modal_handler(type, data);
            },
          }}
        >
          <auth_context.Provider
            value={{
              Auth: Auth,
              Auth_Manager: (v) => setAuth(v),
            }}
          >
            <Header
              modalType={modalType}
              Show_Modal={Show_Modal}
              data={data}
            ></Header>
            <main>{props.children}</main>
          </auth_context.Provider>
        </modal_context.Provider>
        {toast ? (
          <Toast
            message={toastData.message}
            closeHandler={() => setToast(false)}
            time={toastData.time}
            autoClose={toastData.autoClose}
          />
        ) : null}
      </toast_context.Provider>
      <Footer hide={props.hide} />
    </>
  );
};

interface ILayout {
  children: any;
  hide?: boolean;
}

export default Layout;
