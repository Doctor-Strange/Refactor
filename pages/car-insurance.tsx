import React from "react";
import { NextSeo } from "next-seo";
import Layout from "../src/Layout";

const car_insurance_page = () => {
  return (
    <Layout showToTop={true}>
      <NextSeo
        title="بیمه اجاره خودرو | اتولی"
        description="اتولی برای کاهش این ریسک با همکاری بیمه سامان، امکان خرید بیمه اجاره خودرو را فراهم کرده است"
        openGraph={{
          title: "بیمه اجاره خودرو | اتولی",
          description:
            "اتولی برای کاهش این ریسک با همکاری بیمه سامان، امکان خرید بیمه اجاره خودرو را فراهم کرده است",
        }}
        twitter={{
          handle: "@otoli_net",
          site: "@otoli_net",
          cardType: "summary_large_image",
        }}
      />
      {/* Most of the static pages have a same class named 'static_pages' which set some common style for the main wrapper box*/}
      <article className="responsive static_pages minHeight">
        <h1>بیمه اجاره خودرو </h1>
        <h2>شرایط بیمه اجاره خودرو اتولی</h2>
        <p>
          کسب وکار اجاره خودرو، یکی از کسب‌وکارهای مناسب برای درآمدزایی و کسب
          سود است اما هر بیزینسی می‌تواند ریسک‌ها و ضررهایی هم به دنبال داشته
          باشد؛ اتولی برای کاهش این ریسک با همکاری بیمه سامان، امکان خرید بیمه
          اجاره خودرو را فراهم کرده است که مهمان همزمان با تعداد روزهای اجاره
          خودرو، می‌تواند برای همان تعداد روز بیمه روزانه اجاره خریداری کند و در
          صورتی که در حین اجاره ماشین اتفاقی بیفتد از پوشش‌های زیر استفاده کند:
        </p>
        <ul>
          <li>
            <strong>سرقت کلی: </strong>
            یکی از نگرانی‌های اصلی مشتریان، سرقت خودرو است. هر چند آمار نشان
            می‌دهد تعداد سرقتی‌ها عدد قابل توجه‌ای نیست اما برای اطمینان خاطر
            صاحبان ماشین، بیمه پیشنهادی اجاره خودرو اتولی این ضمانت را می‌دهد در
            صورت سرقت كلي اتومبيل و همچنین خسارت ناشی از شروع به دزدی، جبران
            خسارت کند.
          </li>
          <li>
            <strong>تصادف: </strong>یکی از شایع‌ترین اتفاقاتی که برای ماشین ممکن
            است بیفتد تصادف و خسارت‌های ناشی از آن است، چه خود شما از ماشین
            استفاده کنید و چه در اختیار شخص دیگری قرار بدهید، به همین دلیل اتولی
            با بیمه سامان که یکی از بهترین شرکت‌های بیمه‌ای ایران است، برای رفع
            این نگرانی پوشش جبران خسارت تصادفات را جز پوشش‌های اصلی بیمه اجاره
            خودرو قرار داده است، بنابراین با اطمینان خاطر بیشتری می‌توانید
            ماشین‌تان را اجاره بدهید و درآمد کسب کنید.{" "}
          </li>
          <li>
            <strong>آتش سوزي: </strong>همین‌طور خساراتی که در اثر آتش سوزی،
            صاعقه یا انفجار به اتومبیل و یا لوازم اصلی و یدکی همراه آن وارد گردد
            در زمان اجاره خودرو، جبران می‌شود.
          </li>
          <li>
            <strong>بلایای طبیعی</strong>
          </li>
          <li>
            <strong>رنگ، اسید و مواد شیمیایی</strong>
          </li>
        </ul>
        <p>
          می‌توانید این مورد را هم در نظر داشته باشید که زمانی که ماشین دچار
          خسارت می شود نیازی به استفاده از بیمه‌نامه بدنه خودرو نیست و جبران
          خسارت از محل بیمه‌نامه خریداری شده توسط مهمان انجام می‌شود.
        </p>
      </article>
    </Layout>
  );
};

export default car_insurance_page;
