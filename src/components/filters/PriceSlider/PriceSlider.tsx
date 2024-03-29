import { useContext, useEffect, useState } from "react";

import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
// Had to import noUiSlider and filter style file modular, to work correctly


import filterContext from "../../../context/filter-context";
import dynamic from "next/dynamic";

const Price_slider_loader = dynamic(() =>
  import("../../loaders/PriceSliderLoader")
);
// import Price_slider_loader from "../../loaders/PriceSliderLoader";

const PriceSlider = ({ sliderRange, sliderPrice }: IPriceSlider) => {
  const [value, setValue] = useState([0, 10000000]);
  const [range, setRange] = useState(null);
  const [step, setStep] = useState(100000);
  const [noSlider, setNoSlider] = useState(false);
  const FilterContext = useContext(filterContext);

  /**
   *
   * @param value
   * the income value [start pice , stop price ]
   * both values at the Array have typeOf String
   */
  const onSlide = (value) => {
    // Deactivate the price filter in initial search for default value
    if (+value[0] === range[0] && +value[1] === range[1]) {
      FilterContext.setDataForSearch({
        price: { status: false, value: [] },
      });
    } else {
      FilterContext.setDataForSearch({ price: { status: true, value: value } });
    }
    setValue(value);
  };

  useEffect(() => {
    if (sliderRange.length > 0) {
      if (sliderRange[0] === sliderRange[1]) {
        setNoSlider(true);
        setRange(true);
      } else {
        setStep(
          sliderRange[1] - sliderRange[0] >= 1000000
            ? 100000
            : sliderRange[1] - sliderRange[0] >= 100000
            ? 10000
            : 1000
        );
        setRange([+sliderRange[0], +sliderRange[1]]);
        setNoSlider(false);
      }
    } else {
      setRange(null);
    }
  }, [sliderRange]);

  useEffect(() => {
    if (sliderPrice.length > 0) {
      setValue([+sliderPrice[0], +sliderPrice[1]]);
    }
  }, [sliderPrice]);

  return (
    <>
      {range ? (
        <div className='price_filter'>
          <h3>قیمت</h3>
          <div className='price_text'>
            <p>
              <span className='TA'>{`${Number(
                Number(
                  value[0] < 1000000 ? value[0] / 1000 : value[0] / 1000000
                ).toFixed(1)
              ).toLocaleString()}`}</span>{" "}
              {`${value[0] >= 1000000 ? "میلیون" : "هزار"} تومان `}
            </p>
            <p className='TA'> تا </p>
            <p>
              <span className='TA'>{`${Number(
                Number(
                  value[1] < 1000000 ? value[1] / 1000 : value[1] / 1000000
                ).toFixed(1)
              ).toLocaleString()}`}</span>{" "}
              {`${value[1] >= 1000000 ? "میلیون" : "هزار"} تومان `}
            </p>
          </div>
          <Range
            allowCross={false}
            reverse
            max={range[1]}
            min={range[0]}
            step={step}
            value={value}
            defaultValue={range}
            disabled={noSlider}
            onChange={(i) => {
              setValue([i[0], i[1]]);
            }}
            onAfterChange={(v) => {
              onSlide(v);
            }}
          />
        </div>
      ) : (
        <Price_slider_loader />
      )}
    </>
  );
};

interface IPriceSlider {
  sliderPrice: any;
  sliderRange: any;
}

export default PriceSlider;
