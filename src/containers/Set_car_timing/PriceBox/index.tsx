import React, { useState, useEffect, useRef } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker, { DayRange, utils } from "react-modern-calendar-datepicker";
import moment from "moment-jalaali";
// import "./PriceBox.scss";
import TextInput from "../../../components/form/TextInput";
import { IoMdAdd } from "react-icons/io";
// moment.loadPersian({ dialect: "persian-modern" });

const PriceBox = (props: IPriceBox) => {
  const [dayRange, setDayRange] = useState<DayRange>({
    from: null,
    to: null,
  });
  const [dayRange_error, setdayRange_error] = useState({
    status: false,
    message: "",
  });
  const [price_per_day, setPrice_per_day] = useState("");
  const [price_per_day_error, setprice_per_day_error] = useState({
    status: false,
    message: "",
  });
  const [DisableList, setDisableList] = useState([]);
  const [availList, setAvailList] = useState([]);
  const [DateDuration, setDateDuration] = useState([]);
  const [show_input_price, setShow_input_price] = useState(true);
  const [EditMode, setEditMode] = useState({
    status: false,
    index: null,
  });
  const priceWrapper = useRef(null);

  const convertDateToMoment = (date) => {
    if (!date) return;
    const formatedDate = `${date.year}/${date.month}/${date.day}`;
    return moment(formatedDate, "jYYYY/jMM/jDD");
  };

  const convertRangeDateToMoment = (date) => {
    if (!date) return;
    return {
      from: convertDateToMoment(date.from),
      to: convertDateToMoment(date.to),
    };
  };

  const convertMomentToDate = (date) => {
    if (!date) return;
    return {
      day: Number(moment(date).format("jDD")),
      month: Number(moment(date).format("jMM")),
      year: Number(moment(date).format("jYYYY")),
    };
  };

  const convertMomentsToDateRange = (start, end) => {
    if (!start && !end) return;
    return {
      from: convertMomentToDate(start),
      to: convertMomentToDate(end),
    };
  };

  const getBetweenRange = (date, returnValue?: boolean) => {
    const { from, to } = convertRangeDateToMoment(date);
    if (from && to) {
      const days = [];
      const out = [];
      const duration = from.diff(to, "days");
      setDateDuration((DateDuration) =>
        DateDuration.concat(Math.abs(duration) + 1)
      );
      for (let i = 0; i <= -duration; i++) {
        days.push(moment(from).add(i, "days"));
      }
      days.map((value, index) => {
        out.push(convertMomentToDate(value));
      });
      if (returnValue) {
        return out;
      } else setDisableList((DisableList) => DisableList.concat(out));
    }
  };

  const onConfirm = (data?, autoFill = false) => {
    if (autoFill) {
      getBetweenRange(data.dayRange);
      setAvailList((availList) =>
        availList.concat({
          start_date: `${data.dayRange.from.year}/${data.dayRange.from.month}/${data.dayRange.from.day}`,
          end_date: `${data.dayRange.to.year}/${data.dayRange.to.month}/${data.dayRange.to.day}`,
          price_per_day: data.price_per_day,
          status_id: "available",
        })
      );
      props.addAvailList({
        start_date: `${data.dayRange.from.year}/${data.dayRange.from.month}/${data.dayRange.from.day}`,
        end_date: `${data.dayRange.to.year}/${data.dayRange.to.month}/${data.dayRange.to.day}`,
        price_per_day: data.price_per_day,
        status_id: "available",
      });
    } else {
      if (dayRange.from === null || dayRange.to === null) {
        setdayRange_error({
          status: true,
          message: "لطفا تاریخ را انتخاب کنید",
        });
        return;
      }
      setdayRange_error({
        status: false,
        message: "",
      });
      if (price_per_day === "") {
        setprice_per_day_error({
          status: true,
          message: "لطفا قیمت خودرو را وارد کنید",
        });
        return;
      }
      setprice_per_day_error({
        status: false,
        message: "",
      });
      if (EditMode.status) {
        let tempArr = [...availList];
        tempArr[EditMode.index] = {
          start_date: `${dayRange.from.year}/${dayRange.from.month}/${dayRange.from.day}`,
          end_date: `${dayRange.to.year}/${dayRange.to.month}/${dayRange.to.day}`,
          // start_date: dayRange.from,
          // end_date: dayRange.to,
          price_per_day: price_per_day,
          status_id: "available",
        };
        props.addAvailList(tempArr, true);
        setAvailList(tempArr);
        setEditMode({
          status: false,
          index: null,
        });
      } else {
        getBetweenRange(dayRange);
        setAvailList((availList) =>
          availList.concat({
            start_date: `${dayRange.from.year}/${dayRange.from.month}/${dayRange.from.day}`,
            end_date: `${dayRange.to.year}/${dayRange.to.month}/${dayRange.to.day}`,
            // start_date: dayRange.from,
            // end_date: dayRange.to,
            price_per_day: price_per_day,
            status_id: "available",
          })
        );
        props.addAvailList({
          start_date: `${dayRange.from.year}/${dayRange.from.month}/${dayRange.from.day}`,
          end_date: `${dayRange.to.year}/${dayRange.to.month}/${dayRange.to.day}`,
          price_per_day: price_per_day,
          status_id: "available",
        });
      }
      setDayRange({
        from: null,
        to: null,
      });
      setPrice_per_day("");
      setShow_input_price(false);
    }
  };

  const releaseDisableDays = (index) => {
    let FindIndex = 0;
    DateDuration.forEach((element, i) => {
      if (i < index) {
        FindIndex = FindIndex + element;
      }
    });
    const tempArr = [...DisableList];
    tempArr.splice(FindIndex, DateDuration[index]);
    setDateDuration((DateDuration) =>
      DateDuration.filter((_, i) => index !== i)
    );
    setDisableList(tempArr);
  };

  useEffect(() => {
    if (props.initialAvailabilityList) {
      setShow_input_price(false);
      props.initialAvailabilityList.forEach((item) => {
        onConfirm(
          {
            dayRange: {
              from: {
                year: item.start_date.jalali.y,
                month: item.start_date.jalali.m,
                day: item.start_date.jalali.d,
              },
              to: {
                year: item.end_date.jalali.y,
                month: item.end_date.jalali.m,
                day: item.end_date.jalali.d,
              },
            },
            price_per_day: item.price_per_day,
          },
          true
        );
      });
    }
  }, [props.initialAvailabilityList]);

  useEffect(() => {
    if (props.error) {
      scrollTo(0, priceWrapper.current.offsetTop);
    }
  }, [props.error]);

  return (
    <div className="Price_form_container" ref={priceWrapper}>
      {show_input_price ? (
        <div className="Price_container input_price_Box">
          <div
            className={[
              "divs",
              dayRange_error.status || props.error ? "datePickerError" : null,
            ].join(" ")}
          >
            <label className="Diff_margin">از تاریخ</label>
            <DatePicker
              inputPlaceholder="از تاریخ تا تاریخ"
              value={dayRange}
              onChange={setDayRange}
              shouldHighlightWeekends
              minimumDate={utils("fa").getToday()}
              locale="fa"
              colorPrimary="#4ba3ce"
              disabledDays={DisableList}
            />
            {dayRange_error.status && (
              <p className="input_error_message">{dayRange_error.message}</p>
            )}
          </div>
          <div className="divs  tail">
            <TextInput
              name="price_per_day"
              error={{
                status: price_per_day_error.status || props.error,
                message: price_per_day_error.message,
              }}
              label="قیمت"
              value={price_per_day}
              number={true}
              autoFocus={false}
              clearField={() => {
                setPrice_per_day("");
              }}
              min={4}
              max={10}
              onChangeHandler={(e) => {
                setPrice_per_day(e);
              }}
            />
            <span>تومان</span>
          </div>
          <div className="divs button_box">
            <p className="confirm" onClick={onConfirm}>
              تایید
            </p>
            {/* {EditMode.status && ( */}
            <p
              className="cancel"
              onClick={() => {
                setEditMode({
                  status: false,
                  index: null,
                });
                setDayRange({
                  from: null,
                  to: null,
                });
                setShow_input_price(false);
                setPrice_per_day("");
              }}
            >
              لغو
            </p>
            {/* )} */}
          </div>
        </div>
      ) : (
        <div className="add_new_one" onClick={() => setShow_input_price(true)}>
          <p>
            <IoMdAdd size="2rem" color="#4ba3ce" /> افزودن بازه جدید
          </p>
        </div>
      )}
      {
        availList.length > 0 ? (
          <div className="Price_container ">
            <>
              {/* <p>خودرو شما فقط</p> */}
              {availList.map((item, i) => {
                return (
                  <div key={i} className="Date_list">
                    <div className="Date_list_item">
                      <p>
                        از تاریخ {item.start_date} تا {item.end_date}
                        <br /> با قیمت{" "}
                        {Number(item.price_per_day).toLocaleString()} تومان
                      </p>
                      <div className="button_box">
                        <span
                          className="confirm"
                          onClick={() => {
                            setShow_input_price(true);
                            setEditMode({
                              status: true,
                              index: i,
                            });
                            setPrice_per_day(item.price_per_day);

                            setDayRange({
                              from: {
                                year: +moment(item.start_date).format("YYYY"),
                                month: +moment(item.start_date).format("MM"),
                                day: +moment(item.start_date).format("DD"),
                              },
                              to: {
                                year: +moment(item.end_date).format("YYYY"),
                                month: +moment(item.end_date).format("MM"),
                                day: +moment(item.end_date).format("DD"),
                              },
                            });
                          }}
                        >
                          ویرایش
                        </span>
                        <span
                          className="cancel"
                          onClick={() => {
                            releaseDisableDays(i);
                            setAvailList((availList) =>
                              availList.filter((_, index) => {
                                return index !== i;
                              })
                            );
                            if (availList.length === 1) {
                              setShow_input_price(true);
                            }
                            props.removeAvailList(i);
                          }}
                        >
                          حذف
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
              {/* <p>اجاره داده خواهد شد</p> */}
            </>
          </div>
        ) : null
        //   <p className="nothing">بازه زمانی ثبت شده ندارید</p>
      }
    </div>
  );
};

interface IPriceBox {
  initialAvailabilityList?: any;
  addAvailList?: any;
  removeAvailList?: any;
  error: boolean;
}

export default PriceBox;
