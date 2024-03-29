import { IoIosArrowRoundBack } from "react-icons/io";
import Link from "next/link";

export const AssuranceGuide = () => (
  <>
    <h2>چه مدارک و ضمانت‌هایی بگیریم</h2>
    <p>
      در سایت سپریس هر میزبان می‌تواند شرایط متفاوتی برای اجاره ماشینش بگذارد که
      بسته به نوع ماشین می‌تواند متفاوت باشد، به صورت کلی می‌توانید مدارک و
      ضمانت‌های زیر را برای اجاره خودروتان از مشتری بگیرید، اما این نکته را در
      نظر داشته باشید که مدارک و ضمانت‌های زیاد می‌تواند میزان درخواست‌های اجاره
      خودرو شما را کاهش بدهد.
    </p>
    <Link href="/assurance">
      <a className="guide-center__readMore static-position">
        بیشتر
        <IoIosArrowRoundBack size="3rem" color="##3fa6da" />
      </a>
    </Link>
  </>
);
