import React from "react";
import Layout from "../src/Layout";
import { NextSeo } from "next-seo";
import Link from "next/link";

const guideForRent = () => {
  return (
    <Layout showToTop={true}>
      <NextSeo
        title="راهنمای اجاره گیرنده | اتولی"
        description="راهنمای کامل اتولی برای مهمان"
        openGraph={{
          title: "راهنمای اجاره گیرنده | اتولی",
          description: "راهنمای کامل اتولی برای مهمان",
          site_name: "اتولی",
        }}
        twitter={{
          handle: "@otoli_net",
          site: "@otoli_net",
          cardType: "summary_large_image",
        }}
      />
      {/* Most of the static pages have a same class named 'static_pages' which set some common style for the main wrapper box*/}
      <section className="responsive static_pages minHeight">
        <h1>راهنمای کامل اتولی برای مهمان </h1>
        <h2>انتخاب و رزرو</h2>
        <h3>ثبت‌نام کنید</h3>
        <ul>
          <li>
            برای رزرو خودرو ابتدا باید در سایت اتولی ثبت‌نام کنید تا یک حساب
            کاربری به نام شما ایجاد شود.
          </li>
          <li>
            در قسمت ثبت‌نام وب‌سایت، بعد از وارد کردن شماره موبایل، یک کد تایید
            برای شما پیامک می‌شود.
          </li>
          <li>
            کد پیامک شده را در قسمت مخصوص خود وارد کنید سپس ثبت‌نام خود را با
            تکمیل اطلاعات خواسته شده کامل کنید.
          </li>
        </ul>
        <h3>در بین ماشین‌ها جستجو کنید</h3>
        <ul>
          <li>
            شهر و تاریخ مورد نظرتان برای اجاره خودرو را انتخاب کنید و لیست
            ماشین‌های پیشنهادی را ببینید.
          </li>
          <li>
            می‌توانید بین ماشین‌های نمایش داده شده، برند، مدل، سقف قیمت و تحویل
            در محل را فیلتر کنید.
          </li>
          <li>ماشین موردنظرتان را از بین خودروهای پیشنهادی انتخاب کنید.</li>
        </ul>
        <h3>پوشش بیمه انتخاب کنید</h3>
        <ul>
          <li>
            پیش از ارسال درخواست رزرو شما به‌عنوان مهمان می‌توانید پوشش{" "}
            <Link href="/insurance-policies">
              <a href="">بیمه</a>
            </Link>{" "}
            برای خودرویی که اجاره می‌کنید انتخاب کنید.
          </li>
          <li>
            با توجه به قوانین بیمه انتخابی، در صورت تصادف، سرقت و خسارت‌های
            احتمالی دیگر، بیمه بخشی از هزینه‌ها را جبران خواهد کرد.
          </li>
          <li>انتخاب پوشش بیمه اختیاری است.</li>
          <li>
            درصورتی که بیمه خریداری نکنید، درصورت هرگونه آسیب به خودرو تمام
            هزینه‌ها برعهده شما خواهد بود.
          </li>
        </ul>
        <h3>برای رزرو خودرو درخواست دهید</h3>
        <ul>
          <li>شرایط رزرو و کنسلی خودرو را به‌خوبی مطالعه کنید.</li>
          <li>
            برروی گزینه ثبت درخواست کلیک کنید تا درخواست رزرو شما برای
            میزبان ارسال شود.
          </li>
          <li>
            قبول یا رد درخواست شما توسط اجاره‎ دهنده ازطریق پیامک برای شما ارسال
            می‌شود.
          </li>
          <li>
            زمان پاسخگویی به درخواست‌ها از ساعت ۱۰:۳۰ صبح تا ۹ شب، حداکثر ۲ ساعت
            است و اجاره دهنده برای درخواست‌های بعد از ساعت ۹ شب، تا ۱۰:۳۰ روز
            بعد فرصت دارد.
          </li>
        </ul>
        <h3>مبلغ اجاره را واریز کنید</h3>
        <ul>
          <li>
            شما می‌توانید از طریق لینک ارسال شده و یا صفحه کاربری‌تان در اتولی
            وجه اجاره را واریز کنید.
          </li>
          <li>
            هر خودرو قوانین کنسلی مخصوص به خود را دارد. درصورتی که بعد از قبول
            درخواست و واریز وجه، قصد لغو رزرو را دارید، قوانین کنسلی خودرو را
            مطالعه کنید تا از جریمه کنسلی مطلع شوید.
          </li>
          <li>
            بعد از واریز وجه، میزبان با شما تماس می‌گیرد تا محل تحویل خودرو
            را هماهنگ کنید.
          </li>
        </ul>
        <h2>تحویل خودرو</h2>
        <h3>خودرو را بررسی کنید</h3>
        <ul>
          <li>خودرو را در محل توافق شده برای تحویل بررسی کنید.</li>
          <li>
            قبل از تحویل خودرو حتما از تمام قسمت‌های خودرو و آسیب‌های آن
            عکس‌برداری و فیلم‌برداری کنید تا در زمان بازگشت آن دچار مشکل نشوید.
          </li>
          <li>
            اطلاعات خودرو را با اطلاعات سایت مطابقت دهید و درصورت عدم تطابق با
            پشتیبانی اتولی تماس بگیرید.
          </li>
          <li>
            شما حق این را دارید که در صورت خرابی خودرو، عدم ایمنی کافی، کثیف
            بودن یا وجود آسیب‌های جدی، خودرو را از میزبان تحویل نگیرید. در
            این شرایط با پشتیبانی اتولی تماس بگیرید تا مشکل پیش‌آمده را بررسی و
            حل کند.
          </li>
          <li>
            اندازه بنزین را یادداشت کنید تا در انتهای زمان اجاره، ماشین را با
            همان میزان بنزین تحویل دهید.
          </li>
          <li>
            ممکن است میزبان وسایل اضافی مثل ضبط و باند، روکش، آفتاب‌گیر،
            جعبه ابزار و ... در خودرو داشته باشد که شما مسئول مراقبت از آن‌ها
            هستید.
          </li>
          <li>
            از وسایل اضافی خودرو یک لیست تهیه کنید و در زمان پایان اجاره تمام
            وسایل را مطابق با همان لیست تحویل دهید.
          </li>
          <li>
            از پذیرفتن وسایل اضافی که وجودشان برای شما ضروری نیست خودداری کنید.
          </li>
        </ul>
        <h3>خودرو را تحویل بگیرید</h3>
        <ul>
          <li>
            قراردادی که برای اجاره خودرو توسط اتولی تنظیم شده است را بعد از
            مطالعه کامل و قبول شرایط امضا کنید.
          </li>
          <li>سند خودرو یا سند وکالت اجاره خودرو را بررسی کنید.</li>
          <li>
            حتما گواهینامه و کارت شناسایی همراه داشته باشید. در صورت نقص هرکدام
            از مدارک، میزبان حق لغو رزرو شما را دارد.
          </li>
          <li>
            گواهینامه شما باید حداقل تا پایان زمان اجاره خودرو اعتبار داشته
            باشد.
          </li>
          <li>یک نسخه از قرارداد امضاشده توسط دو طرف را نزد خود نگه دارید.</li>
        </ul>
        <h2>در زمان سفر</h2>
        <h3>سفر به سلامت</h3>
        <ul>
          <li>
            در تمام طول سفر شما موظف هستید بیشترین مراقبت را از خودروی اجاره‌ای
            انجام دهید.
          </li>
          <li>
            در صورت وجود هرگونه مشکل برای خودرو حتما میزبان و پشتیبانی
            اتولی را در جریان قرار دهید.
          </li>
          <li>
            درصورتی که میزبان قوانینی مانند سیگار نکشیدن، حمل حیوانات و …
            برای خودرو وضع کرده است به آن پایبند باشید.
          </li>
          <li>درصورت تصادف یا سرقت خودرو به میزبان و پلیس اطلاع دهید. </li>
          <li>
            در زمان تصادف از آسیب‌های وارد شده به خودرو و صحنه تصادف عکس و فیلم
            تهیه کنید تا در اختیار شرکت بیمه قرار دهید.
          </li>
        </ul>
        <h2>پایان سفر</h2>
        <h3>خودرو را بازتحویل دهید</h3>
        <ul>
          <li>
            بعد از پایان مدت اجاره خودرو حتما ماشین را در ساعت و محل تعیین شده
            در قرارداد تحویل دهید.
          </li>
          <li>
            درصورتی که نمی‌توانید خودرو را در همان ساعت بازگردانید، از پیش به
            میزبان اطلاع دهید تا مدت زمان اجاره خودرو را تمدید کند.
          </li>
          <li>
            خودرو را با همان میزان بنزینی که تحویل گرفته‌اید بازتحویل دهید.
          </li>
          <li>درصورت کثیفی خودرو پیش از تحویل آن را تمیز کنید.</li>
          <li>
            در زمان تحویل خودرو دوباره از آن عکس‌برداری کنید تا در آینده ادعای
            اشتباهی علیه شما صورت نگیرد.
          </li>
        </ul>
        <h3>تجربیات خود را با دیگران به اشتراک بگذارید</h3>
        <ul>
          <li>
            بعد از پایان سفر و تحویل ماشین با امتیاز دادن و نوشتن نظر درباره
            خودرو و صاحب خودرو می‌توانید به دیگر کاربران اتولی برای داشتن
            انتخابی بهتر کمک کنید.
          </li>
        </ul>
      </section>
    </Layout>
  );
};

export default guideForRent;
