import { useEffect, useState, useContext } from "react";
import moment from "moment-jalaali";
import {
  IoIosCheckboxOutline,
  IoIosCard,
  IoIosRemoveCircle,
  IoIosEyeOff,
  IoLogoModelS,
  IoIosHand,
  IoMdFlag,
  IoIosDownload,
  IoMdArrowRoundBack,
  IoMdPerson,
} from "react-icons/io";
import {
  MdAccountCircle,
  MdAlarm,
  MdAlarmOff,
  MdCall,
  MdCallMissedOutgoing,
  MdClear,
  MdCreditCard,
  MdDone,
  MdDriveEta,
  MdKeyboardBackspace,
  MdKeyboardReturn,
  MdVpnKey,
} from "react-icons/md";
import dynamic from "next/dynamic";
import download from "../../../../public/image/download.png";
import net_CTX from "../../../context/internetConnectionCTX";

const PelakView = dynamic(() => import("../../../components/pelak"));
const Icon = dynamic(() => import("../../../../utils/Icon"));
// import Icon from "../../../../utils/Icon";

const Button = dynamic(() => import("../../../components/form/Button"));
// import PelakView from "../../../components/pelak";
import CountdownTimer from "timer-countdown";
// import "./request_cart.scss";
import Link from "next/link";
// import Button from "../../../components/form/Button";
import { REQUEST_REQUEST_ACTION } from "../../../API";
import jsCookie from "js-cookie";
import Modal_context from "../../../context/Modal_context";
import Toast_context from "../../../context/Toast_context";
import carImage from "../../../../public/image/car-image-thumbnail.jpg";
import { FiClock } from "react-icons/fi";
import { useRouter } from "next/router";
import ErrorHelper from "../../../../utils/error_helper";

moment.loadPersian({ dialect: "persian-modern" });

const Request_cart = ({ data, getDataAgain, language }: IRequest_cart) => {
  const [rentStatus, setRentStatus] = useState(null);
  const [status_id, setStatus_id] = useState(null);
  const [car, setCar] = useState(null);
  const [start_date, setStart_date] = useState(null);
  const [end_date, setEnd_date] = useState(null);
  const [no_of_days, setNo_of_days] = useState(null);
  const [media_set, setMedia_set] = useState(null);
  const [discounted_total_price, setDiscounted_total_price] = useState(null);
  // "renter" ? true: false
  const [role, setRole] = useState(true);
  const [owner_Info, setOwner_Info] = useState(null);
  const [renter_info, setRenter_info] = useState(null);
  const [pelak, setPelak] = useState(null);
  const [button_code, setButton_code] = useState([]);
  const [ButtonLoader, setButtonLoader] = useState(false);
  const [rejectButtonLoader, setRejectButtonLoader] = useState(false);
  const [insurance_total_price, setInsurance_total_price] = useState(null);
  const [has_Insurance, set_has_insurance] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const [total_discount, setTotal_discount] = useState(null);
  const [click_on_cancel, set_click_on_cancel] = useState(false);

  const MODAL_CONTEXT = useContext(Modal_context);
  const TOAST_CONTEXT = useContext(Toast_context);
  const [imageHeight, setImageHeight] = useState(0);
  const [heightController, setheightController] = useState(0);
  const router = useRouter();
  const netCTX = useContext(net_CTX);

  const token = jsCookie.get("token");

  const setForRequest = async (data: any) => {
    if (data.action === "reject") {
      setRejectButtonLoader(true);
    } else {
      setButtonLoader(true);
    }
    try {
      const request_res: any = await REQUEST_REQUEST_ACTION({
        token,
        id: data.id,
        action: data.action,
      });
      setButtonLoader(false);
      setRejectButtonLoader(false);
      if (data.action === "pay") {
        window.location.href = `${request_res.redirect_to}`;
      } else {
        TOAST_CONTEXT.toast_option({
          message: request_res.message,
          time: 15,
          autoClose: true,
        });
        // getDataAgain();
        switch (data.action) {
          case "approve":
            CreateTheStatusForThisCard("approved");
            break;
          case "cancelled":
            CreateTheStatusForThisCard("cancelled");
            break;
          case "reject":
            CreateTheStatusForThisCard("rejected");
            break;
          case "deliver":
            CreateTheStatusForThisCard("delivered");
            break;
          case "return":
            CreateTheStatusForThisCard("returned");
            break;
          default:
            break;
        }
      }
      if (data.action === "cancel") {
        getDataAgain(data.id);
      }
    } catch (error) {
      setButtonLoader(false);
      setRejectButtonLoader(false);
      if (error === 111) {
        netCTX.toggleTheContainer(true);
      } else
        TOAST_CONTEXT.toast_option({
          message: error.response
            ? ErrorHelper({
                errorObj: error.response,
                _400Message: "خطا در انجام عملیات بر روی سفارش اجاره",
              })
            : error,
          color: "#ed9026",
          time: 0,
          autoClose: false,
        });
    }
  };

  useEffect(() => {
    if (data) {
      CreateTheStatusForThisCard();
    }
  }, [data]);

  const cancel_request = (id) => {
    set_click_on_cancel(true);
    MODAL_CONTEXT.modalHandler("ConfirmDelete", { id });
  };

  useEffect(() => {
    if (MODAL_CONTEXT.id === data.id && click_on_cancel) {
      setForRequest({ action: "cancel", id: data.id });
      MODAL_CONTEXT.confirm_id(null);
    }
  }, [MODAL_CONTEXT.id]);

  const CreateTheStatusForThisCard = (status = null) => {
    /**
     * @renter
     * اجاره گیرنده
     *
     * @owner
     * اجاره دهنده
     */
    let renter = data.role === "renter" ? true : false;
    let has_insurance = data.has_insurance ? true : false;

    // small portion at the top right on the request cart
    let RentStatus = null;
    setStatus_id(status ? status : data.status.id);
    switch (status ? status : data.status.id) {
      case "new":
        RentStatus = (
          <div className="rent_status status_new">
            <div className="card_status">
              <MdAlarm size="2rem" color="#f7941d" />
              <span>{language.new}</span>
            </div>
            {!renter && (
              <div className="timer">
                <CountdownTimer
                  timeLeft={
                    data.time_remaining_to_take_action.total_seconds * 1000
                  }
                  completeCallback={() => CreateTheStatusForThisCard("expired")}
                />
                <FiClock size="2rem" color="#f7941d" />
              </div>
            )}
          </div>
        );
        // set the button attribute base on the role and action
        setButton_code(
          !renter
            ? [
                {
                  value: language.accept,
                  class:
                    "Blue_BTN request_car_accept HEAP_Request_Btn_Accept ACCEPTED_INCOMING_REQUEST",
                  click: () =>
                    setForRequest({ action: "approve", id: data.id }),
                },
                {
                  value: language.reject,
                  class:
                    "Blue_BTN request_car_reject HEAP_Request_Btn_Reject REJECT_INCOMING_REQUEST",
                  loading: ButtonLoader,
                  click: () => setForRequest({ action: "reject", id: data.id }),
                },
              ]
            : [
                {
                  value: language.cancel,
                  class:
                    "Blue_BTN request_car_cancel HEAP_Request_Btn_Cancel CANCELLED_INCOMING_REQUEST",
                  click: () => cancel_request(data.id),
                },
              ]
        );
        break;
      case "approved":
        RentStatus = (
          <div className="rent_status status_approved">
            <div className="card_status">
              <MdCreditCard size="2rem" color="#a3678b" />
              <span>{language.approved}</span>
            </div>
            {!renter && (
              <div className="timer">
                <CountdownTimer
                  timeLeft={
                    data.time_remaining_to_take_action.total_seconds * 1000
                  }
                  completeCallback={() => CreateTheStatusForThisCard("expired")}
                />
                <FiClock size="2rem" color="#a3678b" />
              </div>
            )}
          </div>
        );
        setButton_code(
          renter
            ? [
                {
                  value: language.pay,
                  class:
                    "Blue_BTN request_car_pay GO_TO_BANK HEAP_Request_Btn_GotoBank",
                  click: () => setForRequest({ action: "pay", id: data.id }),
                },
              ]
            : []
        );
        break;
      case "rejected":
        RentStatus = (
          <div className="rent_status status_expired">
            <MdCallMissedOutgoing size="2rem" color="#707070" />
            <span>{language.rejected}</span>
          </div>
        );
        setButton_code([]);
        break;
      case "expired":
        RentStatus = (
          <div className="rent_status status_expired">
            <MdAlarmOff size="2rem" color="#707070" />
            <span>{language.expired}</span>
          </div>
        );
        setButton_code([]);
        break;
      case "cancelled":
        RentStatus = (
          <div className="rent_status status_expired">
            <Icon name="cancel" />
            {/* <IoIosEyeOff size="1.4rem" color="#656565" /> */}
            <span>{language.cancelled}</span>
          </div>
        );
        setButton_code([]);
        break;
      case "paid":
        RentStatus = (
          <div className="rent_status status_paid">
            <MdVpnKey size="2rem" color="#2cbbc2" />
            <span>{language.paid}</span>
          </div>
        );
        setButton_code(
          renter
            ? [
                {
                  value: language.deliver,
                  class:
                    "Blue_BTN request_car_pay CAR_DELIVERED HEAP_Request_Btn_CarDelivered",
                  click: () =>
                    setForRequest({ action: "deliver", id: data.id }),
                },
              ]
            : []
        );
        break;
      case "not_delivered":
        RentStatus = (
          <div className="rent_status">
            <IoIosHand size="1.4rem" color="#656565" />
            <span>{data.status.name}</span>
          </div>
        );
        break;
      case "delivered":
        RentStatus = (
          <div className="rent_status status_on_trip">
            <MdDriveEta size="2rem" color="#2cbbc2" />
            <span>{language.delivered}</span>
          </div>
        );
        setButton_code(
          !renter
            ? [
                {
                  value: language.returned,
                  class:
                    "Blue_BTN request_car_pay HEAP_Request_Btn_CarReturned",
                  click: () => {
                    setForRequest({ action: "return", id: data.id });
                  },
                },
              ]
            : []
        );
        break;
      case "returned":
        RentStatus = (
          <div className="rent_status status_returned">
            <MdKeyboardReturn size="2rem" color="#2cbbc2" />
            <span>{language.returned_label}</span>
          </div>
        );
        setButton_code(
          renter
            ? data.has_renter_reviewed_rent_order
              ? [
                  // {
                  //   value: language.repetitive_review,
                  //   disable: true,
                  //   class: "Blue_BTN request_car_pay disable_rate_btn",
                  //   click: () => {},
                  // },
                ]
              : [
                  {
                    value: language.review,
                    class: "Blue_BTN request_car_pay",
                    click: () =>
                      // send this data to modal
                      MODAL_CONTEXT.modalHandler("Renter", data),
                  },
                ]
            : data.has_owner_reviewed_renter
            ? [
                // {
                //   value: language.repetitive_review,
                //   disable: true,
                //   class: "Blue_BTN request_car_pay disable_rate_btn",
                //   click: () => {},
                // },
              ]
            : [
                {
                  value: language.review,
                  class: "Blue_BTN request_car_pay",
                  click: () =>
                    // send this data to modal
                    MODAL_CONTEXT.modalHandler("Owner", data),
                },
              ]
        );
        break;
      default:
        RentStatus = (
          <div className="rent_status">
            <IoIosDownload size="1.4rem" color="#656565" />
            <span>{data.status.name}</span>
          </div>
        );
        break;
    }
    // set initials value
    setRentStatus(RentStatus);
    setCar(data.rent_search_dump.car);
    setStart_date(data.rent_search_dump.start_date);
    setEnd_date(data.rent_search_dump.end_date);
    setNo_of_days(data.rent_search_dump.no_of_days);
    if (data.rent_search_dump.media_set.length > 0) {
      setMedia_set(data.rent_search_dump.media_set[0]);
      if (data.rent_search_dump.media_set[0].thumbnail_height) {
        setImageHeight(data.rent_search_dump.media_set[0].thumbnail_height);
      }
    } else setMedia_set({ thumbnail_url: carImage });
    setDiscounted_total_price(
      renter
        ? data.rent_search_dump.discounted_total_price
        : data.rent_search_dump.owner_price
        ? data.rent_search_dump.owner_price
        : data.rent_search_dump.discounted_total_price
    );
    setInsurance_total_price(
      has_insurance ? data.rent_search_dump.insurance_total_price : 0
    );
    set_has_insurance(has_insurance);
    setCoupon(
      data.rent_search_dump.coupon
        ? data.rent_search_dump.coupon.total_price
        : null
    );
    setTotal_discount(data.rent_search_dump.total_discount);
    setRole(renter);
    setOwner_Info(data.rent_search_dump.owner);
    setRenter_info(data.renter);
    setPelak({
      registration_plate_first_part:
        data.rent_search_dump.registration_plate_first_part,
      registration_plate_second_part:
        data.rent_search_dump.registration_plate_second_part,
      registration_plate_third_part:
        data.rent_search_dump.registration_plate_third_part,
      registration_plate_forth_part:
        data.rent_search_dump.registration_plate_forth_part,
    });
  };
  return (
    media_set && (
      <>
        {rentStatus}
        <div className="cart">
          <div className="rent_info">
            <h2>
              {car.brand.name.fa} {car.name.fa}
            </h2>
            {/* <div className="rent_duration"> */}
            <p className="date_duration">
              <span>
                {/* e.g, 99 01 23 */}
                {moment(start_date, "jYYYY/jMM/jDD").format("jD jMMMM")}
                <span>
                  {/* day's name of week  */}
                  {moment(start_date, "jYYYY/jMM/jDD").format("dddd")}
                </span>
              </span>
              <MdKeyboardBackspace size="2rem" color="#dcdcdc" />
              <span>
                {moment(end_date, "jYYYY/jMM/jDD").format("jD jMMMM")}
                <span>{moment(end_date, "jYYYY/jMM/jDD").format("dddd")}</span>
              </span>
            </p>
          </div>
          <div className="image_pelak">
            <figure
              style={{
                backgroundImage: `url(${media_set.thumbnail_url})`,
                backgroundPositionY: `-${heightController}px`,
              }}
            >
              <img
                // style={{
                //   position: "absolute",
                //   // control the top position of the image by "setheightController()"
                //   top: -heightController + "px",
                // }}
                src={media_set.thumbnail_url}
                alt={`${car.brand.name.fa} ${car.name.fa}`}
                // onLoadCapture={(e) => {
                //   e.persist();
                //   // adjust the image at the center of division container
                //   if (imageHeight / 84 > 2.2) {
                //     setheightController(84 / 4);
                //   }
                // }}
              />
            </figure>
          </div>
        </div>
        {/* </div> */}
        <p className="invoice_and_insurance">
          {role ? (
            <>
              <span>
                {insurance_total_price
                  ? coupon
                    ? (coupon + insurance_total_price).toLocaleString()
                    : (
                        discounted_total_price + insurance_total_price
                      ).toLocaleString()
                  : coupon
                  ? coupon.toLocaleString()
                  : discounted_total_price.toLocaleString()}{" "}
              </span>
              {language.toman} ({language.for} {no_of_days} {language.day})
            </>
          ) : (
            <>
              <span>{discounted_total_price.toLocaleString()} </span>
              {language.toman} ({language.for} {no_of_days} {language.day})
            </>
          )}
          <span className="insurance_badge">
            {has_Insurance ? (
              <>
                <Icon name="active_shield" />
                {/* <MdDone size='1.4rem' color='#2cbbc2' /> */}
                {language.with_insurance}
              </>
            ) : (
              <>
                <Icon name="deactivate_shield" />
                {/* <MdClear size='1.4rem' color='#707070' /> */}
                {language.without_insurance}
              </>
            )}
          </span>
        </p>
        <div className="Role_container">
          {role ? (
            <>
              <Link
                href="/user/[id]"
                as={`/user/${owner_Info.id}`}
                prefetch={false}
              >
                <a>
                  <MdAccountCircle size="2rem" />
                  {owner_Info.name}
                </a>
              </Link>
              {/* show the renter's cellphone to the owner if the status is "approved" */}
              {status_id === "delivered" || status_id === "paid" ? (
                <a className="renter_Cell" href={`tel:0${owner_Info.cell}`}>
                  <span className="extra_Text">0{owner_Info.cell}</span>
                  <MdCall size="2rem" color="#4ba3ce" />
                </a>
              ) : null}
            </>
          ) : (
            <>
              <Link
                href="/user/[id]"
                as={`/user/${renter_info.id}`}
                prefetch={false}
              >
                <a>
                  <MdAccountCircle size="2rem" />
                  {renter_info.name}
                </a>
              </Link>
              {/* show the renter's cellphone to the owner if the status is "approved" */}
              {status_id === "delivered" || status_id === "paid" ? (
                <a className="renter_Cell" href={`tel:0${renter_info.cell}`}>
                  <span className="extra_Text">0{renter_info.cell}</span>
                  <MdCall size="2rem" color="#4ba3ce" />
                </a>
              ) : null}
            </>
          )}
        </div>
        {data.show_contract && status_id === "paid" && (
          <div className="contract_download">
            <Link href={`/contract?id=${data.id}`} prefetch={false}>
              <a>
                <img src={download} alt="آیکون دانلود" />
                <span>دانلود نمونه قرارداد</span>
              </a>
            </Link>
          </div>
        )}
        <div className="Button_container">
          {/* {button_code} */}
          {button_code.length > 0 &&
            button_code.map((item, i) => (
              <Button
                key={i}
                // the button adjust in useEffect on data
                value={item.value}
                class={item.class}
                loading={i === 1 ? rejectButtonLoader : ButtonLoader}
                click={item.click}
              />
            ))}
          {/* if the status is not one of these status, show the PELAK */}
          {role && status_id === "paid" ? (
            // ||
            // status_id === "delivered" ||
            // status_id === "returned"
            <PelakView
              registration_plate_first_part={
                pelak.registration_plate_first_part
              }
              registration_plate_second_part={
                pelak.registration_plate_second_part
              }
              registration_plate_third_part={
                pelak.registration_plate_third_part
              }
              registration_plate_forth_part={
                pelak.registration_plate_forth_part
              }
            />
          ) : null}
        </div>
      </>
    )
  );
};

interface IRequest_cart {
  data: any;
  getDataAgain?: any;
  language: any;
}

export default Request_cart;
