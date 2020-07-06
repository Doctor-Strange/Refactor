import React from "react";
import { NextSeo } from "next-seo";
import Layout from "../src/Layout";
import "../src/styles/pages/otoli.scss";

const AboutUs = () => {
  return (
    <Layout showToTop={true}>
      <NextSeo
        title="اتولی چگونه کار می‌کند؟ | اتولی"
        description="اتولی چگونه کار می‌کند؟"
        openGraph={{
          title: "اتولی چگونه کار می‌کند؟ | اتولی",
          description: "اتولی چگونه کار می‌کند؟",
        }}
        twitter={{
          handle: "@otoli_net",
          site: "@otoli_net",
          cardType: "summary_large_image",
        }}
      />
      {/* Most of the static pages have a same class named 'static_pages' which set some common style for the main wrapper box*/}
      <section className="responsive static_pages minHeight OTILI">
        <h1>اتولی چگونه کار می‌کند؟</h1>
        <div className="PartOne_OTOLI">
          <div className="partOne_OTOLI_D1 D1_Left">
            <h2 className="diff_color">خودرو اجاره کنید</h2>
            <div>
              <h3>در اتولی ثبت‌نام کنید</h3>
              <p>
                ثبت نام در اتولی ساده است، بعد از وارد کردن شماره تماس کد تایید
                ارسال شده را وارد کنید و اطلاعاتتان را تکمیل کنید.
              </p>
            </div>
            <div>
              <h3>بهترین خودرو را انتخاب کنید</h3>
              <p>
                در بخش جستجوی وب‌سایت، شهر و تاریخ موردنظرتان برای اجاره خودرو
                را تعیین کنید و از بین گزینه‌های پیشنهادی ماشین دلخواهتان را
                انتخاب کنید.
              </p>
            </div>
            <div>
              <h3>بیمه بخرید و ماشین اجاره‌ای را رزرو کنید</h3>
              <p>
                در زمان ارسال درخواست رزرو می‌توانید برای خودرو پوشش بیمه
                خریداری کنید. خرید بیمه اختیاری است و در صورت بروز حادثه، بخشی
                از هزینه‌های خودرو را تامین خواهد کرد. در صورتی که پوشش بیمه
                انتخاب نکنید، تمام خسارت‌های احتمالی به عهده شما خواهد بود. بعد
                از انتخاب بیمه باید، درخواست رزرو دهید. صاحب خودرو بعد از بررسی،
                درخواست شما را قبول یا رد خواهد کرد.
              </p>
            </div>
            <div>
              <h3>مبلغ اجاره را پرداخت کنید</h3>
              <p>
                بعد از قبول درخواست رزرو از سمت میزبان، اتولی لینک پرداخت
                را برای شما ارسال خواهد کرد، از طریق آن و یا از طریق لینک موجود
                در صفحه سفارش‌ها مبلغ اجاره را پرداخت کنید.
              </p>
            </div>
          </div>
          <div className="partOne_OTOLI_D1 D1_Right">
            <h2>خودرو اجاره دهید</h2>
            <div>
              <h3>در اتولی ثبت‌نام کنید</h3>
              <p>
                ثبت نام در اتولی ساده است، بعد از وارد کردن شماره تماس کد تایید
                ارسال شده را وارد کنید و اطلاعاتتان را تکمیل کنید.
              </p>
            </div>
            <div>
              <h3>در اتولی ماشین ثبت کنید</h3>
              <p>
                ابتدا با وارد کردن اطلاعات و بارگذاری تصاویر، ماشین یا ماشین‌های
                خود را در اتولی ثبت کنید. این کار در کمتر از چند دقیقه انجام
                خواهد شد. همچنین اطلاعات دقیق و عکس‌های خوب به اجاره سریع ماشین
                شما کمک خواهد کرد.
              </p>
            </div>
            <div>
              <h3>درخواست‌ها را بررسی کنید</h3>
              <p>
                درخواست‌های رزرو اجاره خودروی شما برایتان ارسال خواهد شد. شما
                می‌توانید بعد از بررسی فرم درخواست، آن را قبول یا رد کنید.می
                توانید سوالات یا ابهامات خود را در تماس با مهمان مطرح
                کنید.
              </p>
            </div>
          </div>
        </div>
        <h2 className="OTOLI_MIDDLE_Dif">هماهنگی تحویل</h2>
        <div className="PartOne_OTOLI">
          <div className="partOne_OTOLI_D1 D1_Left">
            <div>
              <h3>منتظر تماس میزبان باشید</h3>
              <p>
                بعد از واریز وجه منتظر تماس میزبان باشید تا هماهنگی‌های
                لازم مثل محل تحویل خودرو را با هم هماهنگ کنید و سوالات خود را
                درباره شرایط فنی، تمیزی و ... بپرسید.
              </p>
            </div>
          </div>
          <div className="partOne_OTOLI_D1 D1_Right">
            <div>
              <h3>با مهمان تماس بگیرید</h3>
              <p>
                بعد از قبول درخواست و انجام واریز وجه توسط مهمان، با او
                تماس بگیرید تا محل و زمان تحویل خودرو را هماهنگ کنید.
              </p>
            </div>
          </div>
        </div>
        <h2 className="OTOLI_MIDDLE_Dif">تحویل خودرو</h2>
        <div className="PartOne_OTOLI">
          <div className="partOne_OTOLI_D1 D1_Left">
            <div>
              <h3>ماشین انتخابی‌تان را تحویل بگیرید</h3>
              <p>
                با صاحب ماشین در محل توافق شده دیدار کنید. ابتدا خودرو را
                به‌خوبی بررسی کنید و بعد از ارائه مدارک و امضای قرارداد، ماشین
                را تحویل بگیرید.
              </p>
            </div>
          </div>
          <div className="partOne_OTOLI_D1 D1_Right">
            <div>
              <h3>ماشین را تحویل دهید</h3>
              <p>
                با مهمان ماشین در محل توافق شده دیدار کنید. باک بنزین،
                تمیزی خودرو و میزان کارکرد را بررسی کرده، قرارداد را امضا کنید و
                ماشین را تحویل دهید.
              </p>
            </div>
            <div>
              <h3>از ماشین خود کسب درآمد کنید</h3>
              <p>
                در تمام این مدت می‌توانید استراحت کنید. خودرو شما برایتان درآمد
                خواهد داشت.
              </p>
            </div>
          </div>
        </div>
        <h2 className="OTOLI_MIDDLE_Dif">بازگشت خودرو</h2>
        <div className="PartOne_OTOLI">
          <div className="partOne_OTOLI_D1 D1_Left">
            <div>
              <h3>خودرو را به صاحبش بازگردانید</h3>
              <p>
                در زمان پایان قرارداد، خودرو را با شرایطی که تحویل گرفته‌اید
                (حجم بنزین، تمیزی و ...) در محل تعیین شده به صاحبش بازگردانید و
                به میزبان امتیاز دهید.
              </p>
            </div>
          </div>
          <div className="partOne_OTOLI_D1 D1_Right">
            <div>
              <h3>ماشین را تحویل بگیرید</h3>
              <p>
                در زمان پایان قرارداد و در محل تعیین شده با اجاره گیرنده ملاقات
                کنید. تمامی موارد مورد نیاز را در ماشین بررسی کنید، ماشین را
                تحویل بگیرید، در صفحه سفارش‌ها تحویل خودرو را تایید کنید و به
                مهمان امتیاز دهید.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutUs;
