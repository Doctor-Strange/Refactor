import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import insurance from '../../../../public/image/SamanInsurance.png';
import Link from 'next/link';
import { guard_controller } from '../../../../utils/guard_controller';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import quotation from "../../../../public/image/svg/quotation.svg";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const Slider = dynamic(() => import('react-slick'));
import quotation from '../../../../public/image/svg/quotation.svg';

let settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  rtl: true,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 15000,
  arrows: false,
};

const Join_us_content = ({
  AbText,
  language,
  shouldHideCommnets,
  showVideo,
}: IJoin_us_content) => {
  const [authorize, set_authorize] = useState(true);

  useEffect(() => {
    const guard = guard_controller();
    if (guard !== 'auth') {
      set_authorize(false);
    }
  }, []);

  // let settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   rtl: true,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 15000,
  //   arrows: false,
  // };

  return (
    <div className="responsive second_part_container">
      <div className="insuranceBox">
        <p>{language.insuranceBox_p}</p>
        <img src={insurance} alt={language.insuranceBox_image} />
      </div>
      <div className=" responsive second_container">
        <h2>{language.full_width_h2}</h2>
        <div className="full_width">
          <p>{language.full_width_p}</p>
        </div>
        <h2>{language.second_container_h2}</h2>
        <div className="three_columns">
          <section>
            <h3>{language.three_columns_h3_1}</h3>
            <p>{language.three_columns_p_1}</p>
          </section>
          <section>
            <h3>{language.three_columns_h3_2}</h3>
            {/* <p>
              با خیال راحت کسب درآمد کنید. بیمه اجاره خودرو بابت خسارت‌های
              احتمالی به شما اطمینان خاطر خواهد داد.
            </p> */}
            <p>{language.three_columns_p_2}</p>
          </section>
          <section>
            <h3>{language.three_columns_h3_3}</h3>
            <p>{language.three_columns_p_3}</p>
          </section>
        </div>
        <div
          className="add_car_section"
          onClickCapture={() => {
            if (!authorize) {
              localStorage['last_location'] = '/add-car';
            }
          }}
        >
          {/* <Link href={authorize ? "/add-car" : "/login"}>
            <a className='Blue_BTN add_car_custom HEAP_joinUs_Btn_AddCar'>
              {AbText}
            </a>
          </Link> */}
          <Link href="/add-car" prefetch={false}>
            <a className="Blue_BTN add_car_custom HEAP_joinUs_Btn_AddCar">
              {AbText}
            </a>
          </Link>
          {/* <p className="call_us">
            سوالی دارید؟ با ما تماس بگیرید:‌{" "}
            <a className="TellPhone" href="tel:02188567759">
              ۰۲۱۸۸۵۶۷۷۵۹{" "}
            </a>
          </p> */}
          {shouldHideCommnets ? null : (
            <section className="slick_container">
              <h2>میزبان‌ها درباره سپریس چه می‌گویند؟</h2>
              <Slider {...settings}>
                <div className="card_container">
                  <img src={quotation} alt="علامت کوتیشن" />
                  <p>
                    وقتی تصمیم به اجاره خودروم گرفتم، از طریق جستجو در گوگل با
                    سپریس آشنا شدم و بعد از دیدن سایت و تماس با پشتیبانی،
                    اعتمادم جلب شد. بعدها هم هربار با پشتیبانی تماس گرفتم در
                    دسترس بودن و هیچ مسئله‌ای رو از قلم نمی‌انداختن. با وجود
                    این‌که ماشینم بیمه بدنه داره، بیمه اجاره خودرو سپریس رو مثل
                    یک قانون در نظر گرفتم و درخواست مهمان‌هایی رو که بیمه
                    خریداری کرده‌اند در اولویت می‌ذارم. تا حالا چند بار ماشینم
                    رو از طریق اتولی اجاره دادم، چون خیالم راحته و قصد دارم باز
                    هم به این کار ادامه بدم.
                  </p>
                  <h3>میزبان</h3>
                  <p className="user_name">جواد کسائی</p>
                </div>
                <div className="card_container">
                  <img src={quotation} alt="علامت کوتیشن" />
                  <p>
                    زمانی که تصمیم گرفتم ماشینم رو اجاره بدم، چند تا از شرکت‌های
                    سنتی و غیراستارت‌آپی اجاره خودرو در تهران رو بررسی کردم اما
                    در نهایت شرکت شما رو انتخاب کردم، چون به نسبت همه، شرایط
                    بهتری داشتید و این امکان رو فراهم کردین که مهمان بیمه اجاره
                    خودرو خریداری کنه و همین‌طور ما (میزبان)، مهمان را مستقیم
                    ببینیم و رودررو با هم صحبت کنیم و شرایط رو دقیق‌تر بررسی
                    کنیم که بتونیم مهمان‌های بهتر و مسئولیت‌پذیرتری انتخاب کنیم.
                    پشتیبانی هم همیشه در دسترس بوده و در همه مسائل به بهترین شکل
                    به ما مشاوره داده و راهنمایی کرده.
                  </p>
                  <h3>میزبان</h3>
                  <p className="user_name">فرزین روحانی</p>
                </div>
                <div className="card_container">
                  <img src={quotation} alt="علامت کوتیشن" />
                  <p>
                    تا قبل از آشنایی با سپریس، ماشینم رو اجاره نداده بودم . اما
                    در آلمان تجربه اجاره‌کردن خودرو را داشتم. اولش شناخت زیادی
                    از سپریس نداشتم و بار اول اجاره دادن ماشین از نظرم ریسک بود.
                    ولی از دفعات بعد با توجه به نحوه کار و پشتیبانی‌تون اعتمادم
                    جلب شد. چون تا حالا تو هیچ شرکتی ندیدم که مثل شما واقعا
                    “پشتیبان” داشته باشن. هروقت از شبانه‌روز که تماس گرفتم حضور
                    داشتین و برای تصمیم‌گیری همراهم بودین. اوایل شرایطم برای
                    اجاره دادن ماشین سخت‌گیرانه بود، ولی به خاطر همین حمایت و
                    پشتیبانی شما منعطف‌تر شدم و سخت‌گیری‌های اولیه را ندارم.
                  </p>
                  <h3>میزبان</h3>
                  <p className="user_name">رضا جلیلی</p>
                </div>
              </Slider>
            </section>
          )}
          {showVideo ? (
            <section className="slick_container">
              <div id="34065193900"><script type="text/JavaScript" src={`https://www.aparat.com/embed/RgpKI?data[rnddiv]=34065193900&data[responsive]=yes`}></script></div>
              {/* <style>.h_iframe-aparat_embed_frame{position:relative;}.h_iframe-aparat_embed_frame .ratio{display:block;width:100%;height:auto;}.h_iframe-aparat_embed_frame iframe{position:absolute;top:0;left:0;width:100%;height:100%;}</style><div class="h_iframe-aparat_embed_frame"><span style="display: block;padding-top: 57%"></span><iframe src="https://www.aparat.com/video/video/embed/videohash/RgpKI/vt/frame" allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe></div> */}
              <video controls>
                <source
                  src='https://core.sepris.com/media/host_comments_joinus.mp4'
                  type="video/mp4"
                />
                مرورگر شما پخش فایل ویدیویی را پشتیبانی نمی‌کند.
              </video>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
};

interface IJoin_us_content {
  AbText: string;
  language: any;
  shouldHideCommnets: boolean;
  showVideo: boolean;
}
export default Join_us_content;
