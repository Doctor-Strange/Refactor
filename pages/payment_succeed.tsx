import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../src/Layout'));
import { NextSeo } from 'next-seo';
import SucceedPayment from '../src/components/succeed_payment';

const Success_payment = ({ locale }) => {
  return (
    <Layout>
      <NextSeo
        title={locale.paymentSucceed.next_seo.title}
        description={locale.paymentSucceed.next_seo.description}
        openGraph={{
          title: locale.paymentSucceed.next_seo.title,
          description: locale.paymentSucceed.next_seo.description,
        }}
        twitter={{
          handle: locale.paymentSucceed.next_seo.handle,
          site: locale.paymentSucceed.next_seo.site,
          cardType: locale.paymentSucceed.next_seo.cardType,
        }}
      />
      <SucceedPayment language={locale.paymentSucceed} />
    </Layout>
  );
};

export default Success_payment;
