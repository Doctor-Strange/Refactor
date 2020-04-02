import axios from "axios";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const SET_ORDER_CANCEL = "/core/rental-car/order/cancel";
const SET_ORDER_APPROVE = "/core/rental-car/order/approve";
const SET_ORDER_REJECT = "/core/rental-car/order/reject";
const SET_ORDER_PAY = "/core/rental-car/order/pay";
const SET_ORDER_DELIVER = "/core/rental-car/order/deliver";
const SET_ORDER_RETURN = "/core/rental-car/order/return";
const SET_ORDER_RATE = {
  OWNER: {
    USER: "/core/rental-car/review/renter/owner",
    RENT_ORDER: "/core/rental-car/review/renter/rent-order"
  },
  RENTER: {
    USER: "/core/rental-car/review/owner/renter",
    RENT_ORDER: "/core/rental-car/review/owner/rent-order"
  }
};

export const REQUEST_REQUEST_ACTION = (data: InewRentRequest) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    let ACTION_URL;
    let more;
    let message = "با موفقیت انجام شد";
    switch (data.action) {
      case "approve":
        ACTION_URL = SET_ORDER_APPROVE;
        message =
          "تایید درخواست ثبت شد. در صورتی که اجاره‌ گیرنده مبلغ اجاره را پرداخت کند، درخواست قطعی می‌شود و از طریق پیامک به اطلاع شما می‌رسد.";
        break;
      case "reject":
        ACTION_URL = SET_ORDER_REJECT;
        message = "رد درخواست اجاره ثبت شد و به اطلاع اجاره گیرنده می‌رسد.";
        break;
      case "cancel":
        ACTION_URL = SET_ORDER_CANCEL;
        message = "درخواست شما حذف شد";
        break;
      case "pay":
        ACTION_URL = SET_ORDER_PAY;
        break;
      case "deliver":
        ACTION_URL = SET_ORDER_DELIVER;
        message =
          "سفر خوبی را برایتان آرزو می‌کنیم. لطفا در نگهداری خودرو دقت فرمایید. در صورت بروز هرگونه مشکل با اجاره گیرنده یا اتولی تماس بگیرید.";
        break;
      case "return":
        ACTION_URL = SET_ORDER_RETURN;
        message =
          "امیدواریم تجربه خوبی از اجاره خودروتان داشته باشید. نظرتان در مورد اجاره گیرنده را با سایر کاربران در میان بگذارید.";
        break;
      case "rate":
        if (data.payload.toRate === "owner") {
          if (data.payload.type === "user") {
            message = "امتیاز شما برای اجاره دهنده ثبت شد.";

            ACTION_URL = SET_ORDER_RATE.OWNER.USER;
            more = {
              user_profile_id: data.payload.user_profile_id,
              rate: data.payload.rate
            };
          }
          if (data.payload.type === "rent-order") {
            message = "امتیاز شما برای خودرو ثبت شد.";

            ACTION_URL = SET_ORDER_RATE.OWNER.RENT_ORDER;
            more = {
              rent_order_id: data.id,
              rate: data.payload.rate,
              review: data.payload.review
            };
          }
        } else if (data.payload.toRate === "renter") {
          if (data.payload.type === "user") {
            message = "امتیاز شما برای اجاره گیرنده ثبت شد.";

            ACTION_URL = SET_ORDER_RATE.RENTER.USER;
            more = {
              user_profile_id: data.payload.user_profile_id,
              rate: data.payload.rate
            };
          }
          // if (data.payload.type === 'rent-order') {
          //   ACTION_URL = SET_ORDER_RATE.OWNER.RENT_ORDER;
          // }
        }
        break;
    }
    console.log("more", more);

    axios
      .post(
        DOMAIN + ACTION_URL,
        {
          id: data.id,
          ...more
        },
        {
          headers: {
            Authorization: "Bearer " + data.token
          }
        }
      )
      .then(response => {
        console.log(response);
        resolve(response.data);
        // data.action !== "pay" &&
        //   toast.success(message, {
        //     position: "bottom-center",
        //     autoClose: 7000,
        //     hideProgressBar: true,
        //     closeOnClick: false,
        //     pauseOnHover: true,
        //     draggable: true
        //   });
      })
      .catch(error => {
        console.log(error.response);
        reject(error);
      });
  });
};

interface InewRentRequest {
  id: string;
  action:
    | "approve"
    | "reject"
    | "pay"
    | "cancel"
    | "deliver"
    | "return"
    | "rate";
  token: string;
  payload?: {
    toRate: "owner" | "renter"; // only in rate action
    type: "user" | "rent-order"; // only in rate action
    user_profile_id?: string | number; // only in rate action
    rate?: number; // only in rate action
    review?: string; // only in rate action
  };
}
