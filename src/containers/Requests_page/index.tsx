import React, { useState, useEffect, useContext } from "react";
import { REQUEST_GET_ORDER_REQUESTS } from "../../API";
import { useRouter } from "next/router";
// import "./Requests_page.scss";
import Request_cart from "./request_cart";
import Requests_filter from "./Requests_filter";
import context_user from "../../../src/context/User_info";
import PleaseLogin from "../../components/PleaseLogin";
import Requests_page_Loading from "../../components/cartPlaceholder/requestLoading";
import Spinner from "../../components/Spinner";
import { IoIosArrowDown } from "react-icons/io";
import { guard_controller } from "../../../utils/guard_controller";

let filter_id = [];
let page = 1;

const Requests_page = ({ language }: IRequests_page) => {
  const [result, setResult] = useState(null);
  const [show, setShow] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [show_spinner_loadMore, setShow_spinner_loadMore] = useState(false);
  const [active_filters, setActive_filters] = useState([]);

  const user = useContext(context_user);
  const token = user.data?.token;
  const router = useRouter();

  useEffect(() => {
    const guard = guard_controller();
    if (guard !== "auth") {
      router.push(`/${guard}`);
      return;
    }

    if (user.data) {
      if (router.query.status_id) {
        fetchAPI({
          page,
          status_id: router.query.status_id,
        });
        filter_id = (router.query.status_id as string).split(",");
        setActive_filters(filter_id);
      } else {
        fetchAPI({
          page,
        });
      }
      setShow(true);
      return () => {
        filter_id = [];
        page = 1;
      };
    }
  }, [user]);

  // useEffect(() => {
  //   if (AUTH_CONTEXT.Auth) {
  //     fetchAPI({
  //       page,
  //     });
  //   }
  // }, [AUTH_CONTEXT.Auth]);

  const fetchAPI = async (data) => {
    if (data.page <= 1) {
      setResult(null);
    }
    try {
      const res: any = await REQUEST_GET_ORDER_REQUESTS({
        ...data,
        token: token,
      });
      setTotalCount(res.total_count);
      if (page > 1) {
        setShow_spinner_loadMore(false);
        setResult((result) => result.concat(res.items));
      } else {
        setResult(res.items);
      }
      if (res.total_count > 14 && res.remained_count > 0) {
        setShowMoreButton(true);
      } else setShowMoreButton(false);
    } catch (e) {
      console.log(e);
    }
  };

  const filterHandler = (value, option) => {
    if (option === "add") {
      filter_id.push(value);
      window.history.replaceState(
        null,
        "",
        `${router.pathname}?status_id=${filter_id}`
      );
    } else {
      filter_id = filter_id.filter((i) => i !== value);
      if (filter_id.length === 0) {
        window.history.replaceState(null, "", `${router.pathname}`);
      } else {
        window.history.replaceState(
          null,
          "",
          `${router.pathname}?status_id=${filter_id}`
        );
      }
    }
    page = 1;
    fetchAPI({
      page: 1,
      status_id: filter_id.join(","),
    });
  };

  const nextPage = () => {
    page = 1 + page;
    setShow_spinner_loadMore(true);
    if (filter_id.length > 0) {
      fetchAPI({
        page,
        status_id: filter_id.join(","),
      });
    } else {
      fetchAPI({
        page,
      });
    }
  };

  return show ? (
    <article className='responsive '>
      <section className='requests_page_container'>
        <Requests_filter
          language={language.filters}
          filter_list={filterHandler}
          active_filters={active_filters}
          // total_count={totalCount}
          // result={result}
        />
        <section
          className={[
            "requests_section",
            totalCount === 0 ? "blockSection" : null,
          ].join(" ")}
        >
          {result ? (
            result.length > 0 ? (
              <>
                {result.map((item, i) => {
                  return (
                    <div className='Request_car' key={i}>
                      <Request_cart
                        language={language.request_cart}
                        data={item}
                        getDataAgain={() => {
                          page = 1;
                          fetchAPI({
                            page: 1,
                            status_id: filter_id.join(","),
                          });
                        }}
                      />
                    </div>
                  );
                })}
              </>
            ) : (
              <p className='NoResult'>{language.no_order}</p>
            )
          ) : (
            <>
              <Requests_page_Loading />
              <Requests_page_Loading />
              <Requests_page_Loading />
              <Requests_page_Loading />
            </>
          )}
        </section>
      </section>
      {showMoreButton ? (
        <span
          className={[
            "Load_more_car",
            show_spinner_loadMore ? "no_padding" : null,
          ].join(" ")}
          onClick={nextPage}
        >
          {show_spinner_loadMore ? (
            <Spinner display='block' width={20} color='#9E9E9E' />
          ) : (
            <>
              <IoIosArrowDown color='#202020' size='1.8rem' />
              {language.show_more}
            </>
          )}
        </span>
      ) : null}
    </article>
  ) : (
    <article className='minHeight'></article>
  );
};

interface IRequests_page {
  language: any;
}

export default Requests_page;
