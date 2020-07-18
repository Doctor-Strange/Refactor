import React, { useEffect, useReducer, useState, useContext } from "react";
import { IoIosCalendar } from "react-icons/io";
// import "./step_2.scss";
import {
  REQUEST_GET_RENTAL_CAR_SET_CAR_TIMING,
  REQUEST_GET_RENTAL_CAR_AVAILABILITIES,
  REQUEST_GET_RENTAL_CAR_DISCOUNTS,
  REQUEST_SET_CAR_AVAILABILITY,
  REQUEST_SET_CAR_DISCOUNT,
  REQUEST_SET_CAR_PARTIAL,
} from "../../../API";
import Radio from "../../../components/form/Radio";
import TextInput from "../../../components/form/TextInput";
import Checkbox from "../../../components/form/Checkbox";
import Button from "../../../components/form/Button";
import Router from "next/router";
import jsCookie from "js-cookie";
import validator from "validator";
import PelakView from "../../../components/pelak";
import Spinner from "../../../components/Spinner";
import Modal_context from "../../../context/Modal_context";
import Counter from "../../../components/Counter";
import PriceBox from "../PriceBox";
import DiscountBox from "../DiscountBox";
import DropdownSearch from "../../../components/form/Dropdown"; 

const stateReducer = (current, action) => {
  switch (action.type) {
    case "id":
      return { ...current, id: action.id };
    case "owner_id":
      return { ...current, owner_id: action.owner_id };
    case "days_to_get_reminded":
      return { ...current, days_to_get_reminded: action.days_to_get_reminded };
    case "ADD_days_to_get_reminded":
      return {
        ...current,
        days_to_get_reminded: current.days_to_get_reminded + 1,
      };
    case "REDUCE_days_to_get_reminded":
      return {
        ...current,
        days_to_get_reminded: current.days_to_get_reminded - 1,
      };
    case "min_days_to_rent":
      return { ...current, min_days_to_rent: action.min_days_to_rent };
    case "ADD_min_days_to_rent":
      return { ...current, min_days_to_rent: current.min_days_to_rent + 1 };
    case "REDUCE_min_days_to_rent":
      return { ...current, min_days_to_rent: current.min_days_to_rent - 1 };
    case "max_km_per_day":
      return { ...current, max_km_per_day: action.max_km_per_day };
    case "extra_km_price":
      return { ...current, extra_km_price: action.extra_km_price };
    case "deliver_at_renters_place":
      return {
        ...current,
        deliver_at_renters_place: action.deliver_at_renters_place,
      };
    case "with_driver":
      return {
        ...current,
        with_driver: action.with_driver,
      };
    case "price_per_day":
      return {
        ...current,
        price_per_day: action.price_per_day,
      };
    case "cancellation_policy":
      return {
        ...current,
        cancellation_policy: action.cancellation_policy,
      };
    case "registration_plate_first_part":
      return {
        ...current,
        registration_plate_first_part: action.registration_plate_first_part,
      };
    case "registration_plate_second_part":
      return {
        ...current,
        registration_plate_second_part: action.registration_plate_second_part,
      };
    case "registration_plate_third_part":
      return {
        ...current,
        registration_plate_third_part: action.registration_plate_third_part,
      };
    case "registration_plate_forth_part":
      return {
        ...current,
        registration_plate_forth_part: action.registration_plate_forth_part,
      };
    case "is_out_of_service":
      return { ...current, is_out_of_service: action.is_out_of_service };
    default:
      throw new Error("There is a problem!");
  }
};

const error_reducer = (current, action) => {
  switch (action.type) {
    case "id":
      return {
        ...current,
        id: action.id,
        error_message: action.error_message,
      };
    case "max_km_per_day":
      return {
        ...current,
        max_km_per_day: action.max_km_per_day,
        error_message: action.error_message,
      };
    case "extra_km_price":
      return {
        ...current,
        extra_km_price: action.extra_km_price,
        error_message: action.error_message,
      };
    case "days_to_get_reminded":
      return {
        ...current,
        days_to_get_reminded: action.days_to_get_reminded,
        error_message: action.error_message,
      };
    case "min_days_to_rent":
      return {
        ...current,
        min_days_to_rent: action.min_days_to_rent,
        error_message: action.error_message,
      };
    case "price_per_day":
      return {
        ...current,
        price_per_day: action.price_per_day,
        error_message: action.error_message,
      };
    case "price_range":
      return {
        ...current,
        price_range: action.price_range,
        error_message: action.error_message,
      };
    case "discount_error":
      return {
        ...current,
        discount_error: action.discount_error,
        error_message: action.error_message,
      };
    case "cancellation_policy":
      return {
        ...current,
        cancellation_policy: action.cancellation_policy,
        error_message: action.error_message,
      };
    case "error_message":
      return {
        ...current,
        error_message: action.error_message,
      };
    default:
      throw new Error("There is a problem!");
  }
};

const Add_Car_Step_2 = () => {
  const [DateAndPrice, setDateAndPrice] = useState(1);
  const [initialAvailabilityList, setInitialAvailabilityList] = useState([]);
  const [availabilityList, setAvailabilityList] = useState([]);

  const [initialDiscountList, setInitialDiscountList] = useState([]);
  const [discountList, setDiscountList] = useState([]);

  const [showDiscount, setShowDiscount] = useState(0);

  const [initialImage, setInitialImage] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [Brand_Name, setBrand_Name] = useState(null);
  const [CarModelName, setCarModelName] = useState(null);

  const [ErrorState, ErrorDispatch] = useReducer(error_reducer, {
    id: false,
    max_km_per_day: false,
    extra_km_price: false,
    days_to_get_reminded: false,
    deliver_at_renters_place: false,
    with_driver: false,
    is_out_of_service: false,
    min_days_to_rent: false,
    price_per_day: false,
    price_range: false,
    discount_error: false,
    cancellation_policy: false,
    error_message: null,
  });

  const [state, dispatch] = useReducer(stateReducer, {
    id: null,
    owner_id: null,
    registration_plate_first_part: "",
    registration_plate_second_part: null,
    registration_plate_third_part: "",
    registration_plate_forth_part: "",
    max_km_per_day: 250,
    extra_km_price: "",
    days_to_get_reminded: 1,
    deliver_at_renters_place: 0,
    with_driver: 0,
    is_out_of_service: false,
    min_days_to_rent: 1,
    price_per_day: "",
    cancellation_policy: "",
  });
  const MODAL_CONTEXT = useContext(Modal_context);
  const token = jsCookie.get("token");

  useEffect(() => {
    scrollTo(0, 0);
    getCarInfoToEdit(Router.router.query.car_id);
    // if (Router.router.query.mode === "edit") {
    // } else {
    //   getInitials(Router.router.query.car_id);
    // }
  }, []);

  const getCarInfoToEdit = async (id) => {
    try {
      const car_info_res = await REQUEST_GET_RENTAL_CAR_SET_CAR_TIMING({
        id: id,
        token: token,
      });
      SetCar(car_info_res);
      const car_availability_res: any = await REQUEST_GET_RENTAL_CAR_AVAILABILITIES(
        { id: id, token: token }
      );
      if (car_availability_res.length > 0) {
        // get a list of available time to rent
        AvailabilityController(car_availability_res);
      }
      // get a list of discounts
      const car_discount_res: any = await REQUEST_GET_RENTAL_CAR_DISCOUNTS({
        id: id,
        token: token,
      });
      if (car_discount_res.length > 0) {
        setShowDiscount(1);
        setDiscountList(car_discount_res);
        setInitialDiscountList(car_discount_res);
      }
    } catch (error) {
      console.log("!Error", error);
    }
  };

  const AvailabilityController = (data) => {
    // if car is available with same price all the time
    if (data[0].is_all_time) {
      setDateAndPrice(1);
      dispatch({
        type: "price_per_day",
        price_per_day: data[0].price_per_day,
      });
    } else {
      // if the car have a range for price
      setDateAndPrice(2);
      setInitialAvailabilityList(data);
    }
  };

  const SetCar = (car) => {
    // SET CAR ID
    dispatch({ type: "id", id: car.id });

    // SET OWNER ID
    dispatch({ type: "owner_id", owner_id: car.owner.id });

    // SET CAR DAYS TO GET REMINDED
    dispatch({
      type: "days_to_get_reminded",
      days_to_get_reminded: car.days_to_get_reminded,
    });

    // SET CAR MIN DAYS TO RENT
    dispatch({
      type: "min_days_to_rent",
      min_days_to_rent: car.min_days_to_rent,
    });

    // SET CAR MAX km PER DAY
    if (car.max_km_per_day && car.extra_km_price) {
      dispatch({
        type: "max_km_per_day",
        max_km_per_day: car.max_km_per_day,
      });
      dispatch({
        type: "extra_km_price",
        extra_km_price: car.extra_km_price,
      });
    }

    // SET CAR OUT OF SERVICE
    dispatch({
      type: "is_out_of_service",
      is_out_of_service: car.is_out_of_service,
    });

    // SET CAR WITH DRIVER
    dispatch({
      type: "with_driver",
      with_driver: car.with_driver ? 1 : 0,
    });

    // SET CAR DELIVER AT RENTERS PLACE
    dispatch({
      type: "deliver_at_renters_place",
      deliver_at_renters_place: car.deliver_at_renters_place ? 1 : 0,
    });

    // SET PELAK VALUES
    dispatch({
      type: "registration_plate_first_part",
      registration_plate_first_part: car.registration_plate_first_part,
    });
    dispatch({
      type: "registration_plate_second_part",
      registration_plate_second_part: car.registration_plate_second_part,
    });
    dispatch({
      type: "registration_plate_third_part",
      registration_plate_third_part: car.registration_plate_third_part,
    });
    dispatch({
      type: "registration_plate_forth_part",
      registration_plate_forth_part: car.registration_plate_forth_part,
    });

    setInitialImage(car.media_set[0].thumbnail_url);

    // SET CAR CANCELLATION POLICY
    dispatch({
      type: "cancellation_policy",
      cancellation_policy: car.cancellation_policy,
    });

    // EXTRA INFO
    setBrand_Name(car.car.brand.name.fa);
    setCarModelName(car.car.name.fa);
  };

  const submitHandler = async (e, state) => {
    e.preventDefault();
    setLoading(true);
    if (validation(state)) {
      try {
        if (DateAndPrice === 1) {
          await REQUEST_SET_CAR_AVAILABILITY({
            token,
            rental_car_id: state.id,
            data: JSON.stringify([
              {
                rental_car_id: state.id,
                is_all_time: 1,
                price_per_day: state.price_per_day,
                status_id: "available",
              },
            ]),
          });
        } else {
          await REQUEST_SET_CAR_AVAILABILITY({
            token,
            rental_car_id: state.id,
            data: JSON.stringify(availabilityList),
          });
        }

        // if (discountList.length > 0) {
        await REQUEST_SET_CAR_DISCOUNT({
          token,
          rental_car_id: state.id,
          data: JSON.stringify(discountList),
        });
        // }
        // remove the car id from storage
        jsCookie.remove("new_car");
        const partial_car_res = await REQUEST_SET_CAR_PARTIAL({
          id: state.id,
          deliver_at_renters_place: state.deliver_at_renters_place,
          with_driver: state.with_driver,
          max_km_per_day: state.max_km_per_day,
          extra_km_price: state.extra_km_price,
          cancellation_policy: state.cancellation_policy.trim(),
          days_to_get_reminded: state.days_to_get_reminded,
          min_days_to_rent: state.min_days_to_rent,
          is_out_of_service: state.is_out_of_service,
          token: token,
        });
        Router.push(`/user/${state.owner_id}`);
      } catch (error) {
        setLoading(false);
        console.log("!Error", error);
      }
    } else setLoading(false);
  };

  // receive the Reducer type and reset the error status
  const resetTheErrorStatus = (value_name) => {
    if (value_name === "error_message") {
      ErrorDispatch({
        type: value_name,
        error_message: null,
      });
    } else {
      ErrorDispatch({
        type: value_name,
        [value_name]: null,
        error_message: null,
      });
    }
  };

  const validation = (state) => {
    if (!state.id) {
      ErrorDispatch({
        type: "id",
        id: true,
        error_message: "شما مجاز به انجام این فعالیت نیستید",
      });
      return false;
    } else {
      resetTheErrorStatus("id");
    }

    if (DateAndPrice === 1 && state.price_per_day === "") {
      ErrorDispatch({
        type: "price_per_day",
        price_per_day: true,
        error_message: "لطفا نرخ اجاره را وارد کنید",
      });
      return false;
    } else {
      resetTheErrorStatus("price_per_day");
    }
    if (DateAndPrice === 2 && availabilityList.length === 0) {
      ErrorDispatch({
        type: "price_range",
        price_range: true,
        error_message: "لطفا نرخ اجاره را وارد کنید",
      });
      return false;
    } else {
      resetTheErrorStatus("price_range");
    }
    if (state.days_to_get_reminded === 0) {
      ErrorDispatch({
        type: "days_to_get_reminded",
        days_to_get_reminded: true,
        error_message: "لطفا حداقل زمان اطلاع از اجاره را انتخاب کنید",
      });
      return false;
    } else {
      resetTheErrorStatus("days_to_get_reminded");
    }
    if (state.min_days_to_rent === 0) {
      ErrorDispatch({
        type: "min_days_to_rent",
        min_days_to_rent: true,
        error_message: "لطفا  حداقل مدت اجاره را انتخاب کنید",
      });
      return false;
    } else {
      resetTheErrorStatus("min_days_to_rent");
    }
    if (state.max_km_per_day === "") {
      ErrorDispatch({
        type: "max_km_per_day",
        max_km_per_day: true,
        error_message: "لطفا محدودیت مسافت در روز را وارد کنید",
      });
      return false;
    } else {
      resetTheErrorStatus("max_km_per_day");
    }
    if (state.extra_km_price === "") {
      ErrorDispatch({
        type: "extra_km_price",
        extra_km_price: true,
        error_message: " لطفا هزینه هر کیلومتر اضافه را وارد کنید",
      });
      return false;
    } else {
      resetTheErrorStatus("extra_km_price");
    }
    console.log(showDiscount, discountList.length);
    if (showDiscount !== 0 && discountList.length === 0) {
      ErrorDispatch({
        type: "discount_error",
        discount_error: true,
        error_message: "لطفا شرایط تخفیف را وارد کنید",
      });
      return false;
    } else {
      resetTheErrorStatus("discount_error");
    }

    if (!state.cancellation_policy) {
      ErrorDispatch({
        type: "cancellation_policy",
        cancellation_policy: true,
        error_message: "لطفا شرایط اجاره و کنسلی را وارد کنید",
      });
      return false;
    } else if (state.cancellation_policy.trim() === "") {
      ErrorDispatch({
        type: "cancellation_policy",
        cancellation_policy: true,
        error_message: "لطفا شرایط اجاره و کنسلی را وارد کنید",
      });
      return false;
    } else {
      resetTheErrorStatus("cancellation_policy");
    }
    return true;
  };

  const addToAvailabilityList = (data, edit = false) => {
    // get the data and add new item to avail list
    /**
     * @edit
     *  if a item edited update that in the array
     */
    if (edit) {
      setAvailabilityList(data);
    } else {
      // otherwise add new item to list
      setAvailabilityList((availabilityList) =>
        availabilityList.concat({
          start_date: data.start_date,
          end_date: data.end_date,
          price_per_day: data.price_per_day,
          status_id: "available",
        })
      );
    }
  };

  const removeFromAvailabilityList = (i) => {
    // remove an item from avail list
    setAvailabilityList((availabilityList) =>
      availabilityList.filter((_, index) => {
        return index !== i;
      })
    );
  };

  /**
   *
   * @param edit
   * if it's edit mode update the list
   * @param data
   * if it's new item add that to the list
   */
  const addToDiscountList = (data, edit = false) => {
    if (edit) {
      setDiscountList(data);
    } else {
      setDiscountList((districtList) => districtList.concat(data));
    }
  };

  // remove the given index from the lisr
  const removeFromDiscountList = (i) => {
    setDiscountList((discountList) =>
      discountList.filter((_, index) => {
        return index !== i;
      })
    );
  };

  return (
    <article className="responsive step_2_form_container">
      <div className="pageTitle">
        <IoIosCalendar className="car_icon" size="2.6rem" color="#4ba3ce" />
        <h3>تعیین شرایط اجاره</h3>
      </div>
      <article className="step_2_image_pelak add_car_form_step_2">
        <div className="Image_container">
          {initialImage ? (
            <img src={initialImage} alt="تصویر کوچک خودرو" />
          ) : (
            <div className="Gradient car_card_placeHolder_step2" />
          )}
        </div>
        <div className="pelak_container">
          {Brand_Name && <p>{`${Brand_Name} - ${CarModelName}`}</p>}
          <img />
          <PelakView
            registration_plate_first_part={state.registration_plate_first_part}
            registration_plate_second_part={
              state.registration_plate_second_part
            }
            registration_plate_third_part={state.registration_plate_third_part}
            registration_plate_forth_part={state.registration_plate_forth_part}
          />
        </div>
      </article>
      <form onSubmit={(e) => submitHandler(e, state)}>
        <div className="add_car_form_step_2">
          <h4 className="extra_text">تاریخ و نرخ اجاره</h4>
          <div
            className="Set_Price_date_options"
            //   className={[
            //     "transition_type_Label",
            //     ErrorState.transmission_type_id ? "Error_color" : null
            //   ].join(" ")}
          >
            {/* toggle between same price for all time and custom range of price  */}
            <Radio
              name="DateAndPrice"
              error_status={ErrorState.price_per_day}
              SelectHandler={(i) => {
                setDateAndPrice(+i);
                if (i !== "1") {
                  dispatch({
                    type: "extra_km_price",
                    extra_km_price: "",
                  });
                }
              }}
              defaultCheck={DateAndPrice}
              data={[
                {
                  label: "موجود در تمام تاریخ‌ها با قیمت یکسان",
                  value: 1,
                },
                {
                  label: "موجود در بازه‌های زمانی مختلف با قیمت‌های متفاوت",
                  value: 2,
                },
              ]}
            />
          </div>
          {DateAndPrice === 1 ? (
            <>
              <div className="custom_input_container_step_2">
                <TextInput
                  name="price_per_day"
                  number={true}
                  onChangeHandler={(e) => {
                    if (ErrorState.price_per_day) {
                      ErrorDispatch({
                        type: "price_per_day",
                        price_per_day: false,
                        error_message: "",
                      });
                    }
                    dispatch({
                      type: "price_per_day",
                      price_per_day: e,
                    });
                    if (state.max_km_per_day) {
                      dispatch({
                        type: "extra_km_price",
                        extra_km_price: Math.floor(+e / state.max_km_per_day),
                      });
                    }
                  }}
                  clearField={() =>
                    dispatch({
                      type: "price_per_day",
                      price_per_day: "",
                    })
                  }
                  error={{
                    status: ErrorState.price_per_day,
                    message: "",
                  }}
                  autoFocus={false}
                  min={4}
                  max={8}
                  value={state.price_per_day}
                  validation={{
                    number: true,
                    min: 50000,
                    required: true,
                    messages: {
                      required: "لطفا  قیمت روزانه را وارد کنید",
                      min: "شروع قیمت روزانه از 50.000 تومان است",
                    },
                  }}
                />
                <span className="tail_text">تومان در روز</span>
              </div>
              {/* {state.price_per_day.length > 3 && (
                <p>
                  اجاره خودرو شما در تمام روز ها با قیمت{" "}
                  {Number(state.price_per_day).toLocaleString()} تومان است
                </p>
              )} */}
            </>
          ) : (
            //PriceBox component
            <PriceBox
              initialAvailabilityList={initialAvailabilityList}
              addAvailList={addToAvailabilityList}
              removeAvailList={removeFromAvailabilityList}
              error={ErrorState.price_range}
            />
          )}
        </div>
        <div className="add_car_form_step_2">
          <h4 className="extra_text">شرایط اجاره</h4>
          <Counter
            max={31}
            min={1}
            AddTo={() => dispatch({ type: "ADD_days_to_get_reminded" })}
            reduceTo={() => dispatch({ type: "REDUCE_days_to_get_reminded" })}
            label="زمان اطلاع از اجاره"
            text="روز قبل"
            value={state.days_to_get_reminded}
          />
          <Counter
            max={31}
            min={1}
            AddTo={() => dispatch({ type: "ADD_min_days_to_rent" })}
            reduceTo={() => dispatch({ type: "REDUCE_min_days_to_rent" })}
            label="حداقل مدت اجاره"
            text="روز"
            value={state.min_days_to_rent}
          />
          <div className="custom_input_container_step_2 DropDown_extra_km">
            <DropdownSearch
              label="محدودیت مسافت"
              InputDisable={true}
              error_status={ErrorState.max_km_per_day}
              data={[
                { value: 100, text: 100 },
                { value: 150, text: 150 },
                { value: 200, text: 200 },
                { value: 250, text: 250 },
                { value: 300, text: 300 },
              ]}
              disableSearch={true}
              defaultVal={state.max_km_per_day}
              clearField={() => {
                dispatch({
                  type: "max_km_per_day",
                  max_km_per_day: "",
                });
                dispatch({
                  type: "extra_km_price",
                  extra_km_price: "",
                });
              }}
              Select={(i) => {
                dispatch({
                  type: "max_km_per_day",
                  max_km_per_day: i.value,
                });
                if (DateAndPrice === 1 && state.price_per_day) {
                  dispatch({
                    type: "extra_km_price",
                    extra_km_price: Math.floor(+state.price_per_day / i.value),
                  });
                }
              }}
            />
            <span className="tail_text">کیلومتر در روز</span>
          </div>
          <div className="custom_input_container_step_2 extra_km_price_container">
            <TextInput
              name="extra_km_price"
              number={true}
              autoFocus={false}
              onChangeHandler={(e) => {
                if (ErrorState.extra_km_price) {
                  ErrorDispatch({
                    type: "extra_km_price",
                    extra_km_price: false,
                    error_message: "",
                  });
                }
                dispatch({
                  type: "extra_km_price",
                  extra_km_price: e,
                });
              }}
              clearField={() =>
                dispatch({
                  type: "extra_km_price",
                  extra_km_price: "",
                })
              }
              error={{
                status: ErrorState.extra_km_price,
                message: null,
              }}
              min={4}
              max={8}
              value={state.extra_km_price}
              label="هزینه هر کیلومتر اضافه"
              validation={{
                required: true,
                messages: {
                  required: "لطفا هزینه هر کیلومتر اضافه را وارد کنید",
                },
              }}
            />
            <span className="tail_text">تومان</span>
          </div>
          <Checkbox
            initialValue={[state.deliver_at_renters_place]}
            data={[
              {
                text: "در محل مهمان تحویل می‌دهم",
                value: state.deliver_at_renters_place,
              },
            ]}
            name="deliver_at_renters_place"
            clearField={() =>
              dispatch({
                type: "deliver_at_renters_place",
                deliver_at_renters_place: 0,
              })
            }
            Select={() => {
              dispatch({
                type: "deliver_at_renters_place",
                deliver_at_renters_place: 1,
              });
            }}
          />
          <Checkbox
            initialValue={[state.with_driver]}
            data={[
              {
                text: "فقط با راننده اجاره می‌دهم",
                value: state.with_driver,
              },
            ]}
            name="with_driver"
            clearField={() => {
              dispatch({
                type: "with_driver",
                with_driver: 0,
              });
            }}
            Select={() => {
              dispatch({
                type: "with_driver",
                with_driver: 1,
              });
            }}
          />
        </div>
        <div className="add_car_form_step_2">
          <h4 className="extra_text">تخفیف ها</h4>
          {/* DiscountBox component  */}
          <DiscountBox
            initialDiscountList={initialDiscountList}
            addDiscount={addToDiscountList}
            removeDiscountList={removeFromDiscountList}
            showDiscount={showDiscount}
            setShowBox={(v) => setShowDiscount(v)}
            discountCheck={setShowDiscount}
            error={ErrorState.discount_error}
          />
          <label>
            شرایط اجاره و کنسلی
            <span
              onClick={() => MODAL_CONTEXT.modalHandler("Assurance")}
              className="anchorTagInStep2"
            >
              چه مدارک و ضمانت‌هایی بگیریم؟
            </span>
          </label>
          <textarea
            className={[
              "text_area_step_2",
              ErrorState.cancellation_policy ? "inputError" : null,
            ].join(" ")}
            value={state.cancellation_policy}
            onChange={(e) => {
              if (ErrorState.cancellation_policy) {
                ErrorDispatch({
                  type: "cancellation_policy",
                  cancellation_policy: false,
                  error_message: "",
                });
              }
              ErrorDispatch({
                type: "cancellation_policy",
                cancellation_policy: false,
                error_message: "",
              });
              dispatch({
                type: "cancellation_policy",
                cancellation_policy: e.target.value,
              });
            }}
          />
          <Button
            value="ثبت"
            loading={Loading}
            disable={Loading}
            class="Blue_BTN local_style HEAP_SetCarTiming_Btn_Submit"
            click={() => {}}
          />
          {ErrorState.error_message ? (
            <p className="Error_message_text">{ErrorState.error_message}</p>
          ) : null}
        </div>
      </form>
    </article>
  );
};

export default Add_Car_Step_2;
