import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../src/Layout'));
const Add_car = dynamic(() => import('../src/containers/Add_car'));
// import Layout from "../src/Layout";
import { NextSeo } from 'next-seo';
import Router from 'next/router';
// import Add_car from "../src/containers/Add_car";

const AddCar = ({ edit, locale }) => {
  useEffect(() => {
    if (window['auth']) {
      // const edit = router.
      window['dataLayer'].push({
        event: 'page_view',
        pageURL: window.location.href,
        pagePath: '/add-car',
        pageTitle: edit
          ? locale.addCar.next_seo.editTitle
          : locale.addCar.next_seo.title,
      });
    } else {
      Router.push('/login');
    }
  }, []);
  return (
    <Layout LinkControl={true}>
      <NextSeo
        title={
          edit ? locale.addCar.next_seo.editTitle : locale.addCar.next_seo.title
        }
        description={locale.addCar.next_seo.description}
        openGraph={{
          title: locale.addCar.next_seo.title,
          description: locale.addCar.next_seo.description,
          site_name: locale.addCar.next_seo.site_name,
        }}
        twitter={{
          handle: locale.addCar.next_seo.handle,
          site: locale.addCar.next_seo.site,
          cardType: locale.addCar.next_seo.cardType,
        }}
      />
      <Add_car language={locale.addCar} />
    </Layout>
  );
};

export async function getServerSideProps(props) {
  try {
    return {
      props: {
        edit: props.query?.mode === 'edit' ? true : false,
      },
    };
  } catch (error) {
    return {
      props: {
        edit: false,
      },
    };
  }
}

export default AddCar;
