import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../src/Layout'));
// import Layout from "../src/Layout";
import { NextSeo } from 'next-seo';
// import { logPageView } from "../utils/analytics";
const OtoliPolicies = ({ locale }) => {
  useEffect(() => {
    window['dataLayer'].push({
      event: 'page_view',
      pageURL: window.location.href,
      pagePath: '/our-policies',
      pageTitle: locale.ourPolicies.next_seo.title,
    });
    // logPageView();
  }, []);
  return (
    <Layout showToTop={true}>
      <NextSeo
        title={locale.ourPolicies.next_seo.title}
        description={locale.ourPolicies.next_seo.description}
        openGraph={{
          title: locale.ourPolicies.next_seo.title,
          description: locale.ourPolicies.next_seo.description,
        }}
        twitter={{
          handle: locale.ourPolicies.next_seo.handle,
          site: locale.ourPolicies.next_seo.site,
          cardType: locale.ourPolicies.next_seo.cardType,
        }}
      />
      {/* Most of the static pages have a same class named 'static_pages' which set some common style for the main wrapper box*/}
      <section className="responsive static_pages minHeight">
        <h1>{locale.ourPolicies.h1}</h1>
        <p>
          <strong>{locale.ourPolicies.p_1}</strong>
        </p>
        <h2>{locale.ourPolicies.h2_1}</h2>
        <h3>{locale.ourPolicies.h3_1}</h3>
        <ul>
          <li>{locale.ourPolicies.li_1}</li>
          <li>{locale.ourPolicies.li_2}</li>
        </ul>
        <h2>{locale.ourPolicies.h2_2}</h2>
        <ul>
          <li>{locale.ourPolicies.li_3}</li>
          <li>{locale.ourPolicies.li_4}</li>
          <li>{locale.ourPolicies.li_5}</li>
        </ul>
        <h3>{locale.ourPolicies.h3_2}</h3>
        <ul>
          <li>{locale.ourPolicies.li_6}</li>
          <li>{locale.ourPolicies.li_7}</li>
          <li>{locale.ourPolicies.li_8}</li>
          <li>{locale.ourPolicies.li_9}</li>
          <li>{locale.ourPolicies.li_10}</li>
          <li>{locale.ourPolicies.li_11}</li>
        </ul>
        <h2>{locale.ourPolicies.h2_3}</h2>
        <p>{locale.ourPolicies.p_2}</p>
        <h2>{locale.ourPolicies.h2_4}</h2>
        <ul>
          <li>{locale.ourPolicies.li_12}</li>
          <li>{locale.ourPolicies.li_13}</li>
        </ul>
        <h2>{locale.ourPolicies.h2_5}</h2>
        <ul>
          <li>{locale.ourPolicies.li_14}</li>
          <li>{locale.ourPolicies.li_15}</li>
          <li>{locale.ourPolicies.li_16}</li>
        </ul>
        <h2>{locale.ourPolicies.h2_6}</h2>
        <ul>
          <li>{locale.ourPolicies.li_17}</li>
          <li>{locale.ourPolicies.li_18}</li>
          <li>{locale.ourPolicies.li_19}</li>
          <li>{locale.ourPolicies.li_20}</li>
          <li>{locale.ourPolicies.li_21}</li>
          <li>{locale.ourPolicies.li_22}</li>
          <li>{locale.ourPolicies.li_23}</li>
          <li>{locale.ourPolicies.li_24}</li>
          <li>{locale.ourPolicies.li_25}</li>
          <li>{locale.ourPolicies.li_26}</li>
        </ul>
        <h2>{locale.ourPolicies.h2_7}</h2>
        <ul>
          <li>{locale.ourPolicies.li_27}</li>
          <li>{locale.ourPolicies.li_28}</li>
          <li>{locale.ourPolicies.li_29}</li>
          <li>{locale.ourPolicies.li_30}</li>
          <li>{locale.ourPolicies.li_31}</li>
          <li>{locale.ourPolicies.li_32}</li>
        </ul>
        <h2>{locale.ourPolicies.h2_8}</h2>
        <ul>
          <li>{locale.ourPolicies.li_33}</li>
          <li>{locale.ourPolicies.li_34}</li>
          <li>{locale.ourPolicies.li_35}</li>
          <li>{locale.ourPolicies.li_36}</li>
        </ul>
        <h2>{locale.ourPolicies.h2_9}</h2>
        <ul>
          <li>{locale.ourPolicies.li_37}</li>
          <li>{locale.ourPolicies.li_38}</li>
          <li>{locale.ourPolicies.li_39}</li>
          <li>{locale.ourPolicies.li_40}</li>
        </ul>
        <h2>{locale.ourPolicies.h2_10}</h2>
        <ul>
          <li>{locale.ourPolicies.li_41}</li>
          <li>{locale.ourPolicies.li_42}</li>
          <li>{locale.ourPolicies.li_43}</li>
          <li>{locale.ourPolicies.li_44}</li>
          <li>{locale.ourPolicies.li_45}</li>
          <li>{locale.ourPolicies.li_46}</li>
          <li>{locale.ourPolicies.li_47}</li>
          <li>{locale.ourPolicies.li_48}</li>
          <li>{locale.ourPolicies.li_49}</li>
          <li>{locale.ourPolicies.li_50}</li>
          <li>{locale.ourPolicies.li_51}</li>
        </ul>
        <p>{locale.ourPolicies.p_3}</p>
        <h3>{locale.ourPolicies.h3_3}</h3>
        <p>{locale.ourPolicies.p_4}</p>
        <h2>{locale.ourPolicies.h2_11}</h2>
        <p>{locale.ourPolicies.p_5}</p>
        <p>
          <strong>
            <u>{locale.ourPolicies.p_6}</u>
          </strong>
        </p>
        <h2>
          <u>{locale.ourPolicies.h2_12}</u>
        </h2>
        <p>{locale.ourPolicies.p_7}</p>
        <ul>
          <li>{locale.ourPolicies.li_52}</li>
          <li>{locale.ourPolicies.li_53}</li>
          <li>{locale.ourPolicies.li_54}</li>
          <li>{locale.ourPolicies.li_55}</li>
          <li>{locale.ourPolicies.li_56}</li>
        </ul>
        <h2>{locale.ourPolicies.h2_13}</h2>
        <p>{locale.ourPolicies.p_8}</p>
        <p>
          <strong>{locale.ourPolicies.p_9_strong} </strong>
          {locale.ourPolicies.p_9}
        </p>
        <p>
          <strong>{locale.ourPolicies.p_10_strong} </strong>
          {locale.ourPolicies.p_10}
        </p>
        <p>
          <strong>{locale.ourPolicies.p_11_strong} </strong>
          {locale.ourPolicies.p_11}
        </p>
        <p>
          <strong>{locale.ourPolicies.p_12_strong} </strong>
          {locale.ourPolicies.p_12}
        </p>
        <p>
          <strong>{locale.ourPolicies.p_13_strong} </strong>
          {locale.ourPolicies.p_13}
        </p>
        <p>
          <strong>{locale.ourPolicies.p_14_strong} </strong>
          {locale.ourPolicies.p_14}
        </p>
        <p>
          <strong>{locale.ourPolicies.p_15_strong} </strong>
          {locale.ourPolicies.p_15}
        </p>
        <h2>
          <u>{locale.ourPolicies.h2_14}</u>
        </h2>
        <h3>{locale.ourPolicies.h3_4}</h3>
        <p>{locale.ourPolicies.p_16}</p>
        <ul>
          <li>{locale.ourPolicies.li_57}</li>
          <li>{locale.ourPolicies.li_58}</li>
          <li>{locale.ourPolicies.li_59}</li>
          <li>{locale.ourPolicies.li_60}</li>
          <li>{locale.ourPolicies.li_61}</li>
        </ul>
        <h3>{locale.ourPolicies.h3_5}</h3>
        <p>{locale.ourPolicies.p_17}</p>
        <h2>
          <u>{locale.ourPolicies.h2_15}</u>
        </h2>
        <h3>{locale.ourPolicies.h3_6}</h3>
        <p>{locale.ourPolicies.p_18}</p>
        <ul>
          <li>{locale.ourPolicies.li_62}</li>
          <li>{locale.ourPolicies.li_63}</li>
          <li>{locale.ourPolicies.li_64}</li>
          <li>{locale.ourPolicies.li_65}</li>
          <li>{locale.ourPolicies.li_66}</li>
          <li>{locale.ourPolicies.li_67}</li>
        </ul>
        <h3>{locale.ourPolicies.h3_7}</h3>
        <p>{locale.ourPolicies.p_19}</p>
        <ul>
          <li>{locale.ourPolicies.li_68}</li>
          <li>{locale.ourPolicies.li_69}</li>
          <li>{locale.ourPolicies.li_70}</li>
          <li>{locale.ourPolicies.li_71}</li>
          <li>{locale.ourPolicies.li_72}</li>
          <li>{locale.ourPolicies.li_73}</li>
          <li>{locale.ourPolicies.li_74}</li>
          <li>{locale.ourPolicies.li_75}</li>
          <li>{locale.ourPolicies.li_76}</li>
        </ul>
        <h2>
          <u>{locale.ourPolicies.h2_16}</u>
        </h2>
        <h3>{locale.ourPolicies.h3_8}</h3>
        <p>{locale.ourPolicies.p_20}</p>
        <h3>{locale.ourPolicies.h3_9}</h3>
        <p>{locale.ourPolicies.p_21}</p>
        <h3>{locale.ourPolicies.h3_10}</h3>
        <p>{locale.ourPolicies.p_22}</p>
        <h2>{locale.ourPolicies.h2_17}</h2>
        <p>{locale.ourPolicies.p_23}</p>
        <h2>{locale.ourPolicies.h2_18}</h2>
        <p>{locale.ourPolicies.p_24}</p>
        <h2>{locale.ourPolicies.h2_19}</h2>
        <p>{locale.ourPolicies.p_25}</p>
        <h2>
          <u>{locale.ourPolicies.h2_20}</u>
        </h2>
        <h3>{locale.ourPolicies.h3_11}</h3>
        <p>{locale.ourPolicies.p_26}</p>
        <h4>{locale.ourPolicies.h4_1}</h4>
        <ul>
          <li>{locale.ourPolicies.li_77}</li>
          <li>{locale.ourPolicies.li_78}</li>
          <li>{locale.ourPolicies.li_79}</li>
        </ul>
        <h4>{locale.ourPolicies.h4_2}</h4>
        <ul>
          <li>{locale.ourPolicies.li_80}</li>
          <li>{locale.ourPolicies.li_81}</li>
        </ul>
        <h4>{locale.ourPolicies.h4_3}</h4>
        <p>{locale.ourPolicies.p_27}</p>
        <h2>{locale.ourPolicies.h2_21}</h2>
        <h3>{locale.ourPolicies.h3_12}</h3>
        <p>{locale.ourPolicies.p_28}</p>
        <h3>{locale.ourPolicies.h3_13}</h3>
        <p>{locale.ourPolicies.p_29}</p>
        <p>
          <strong>{locale.ourPolicies.p_30_strong} </strong>
          {locale.ourPolicies.p_30}
        </p>
        <p>
          <strong>{locale.ourPolicies.p_31_strong} </strong>
          {locale.ourPolicies.p_31}
        </p>
        <p>
          <strong>{locale.ourPolicies.p_32_strong} </strong>
          {locale.ourPolicies.p_32}
        </p>
        <p>
          <strong>{locale.ourPolicies.p_33_strong} </strong>
          {locale.ourPolicies.p_33}
        </p>

        <h3>{locale.ourPolicies.h3_14}</h3>
        <p>{locale.ourPolicies.p_34}</p>
        <h2>
          <u>{locale.ourPolicies.h2_22}</u>
        </h2>
        <p>{locale.ourPolicies.p_35}</p>
        <p>
          <strong>{locale.ourPolicies.p_36_strong} </strong>
          {locale.ourPolicies.p_36}
        </p>
        <p>
          <u>
            <strong>{locale.ourPolicies.p_37_strong} </strong>
            {locale.ourPolicies.p_37}
          </u>
        </p>
        <h2>
          <u>{locale.ourPolicies.h2_23}</u>
        </h2>
        <h3>{locale.ourPolicies.h3_15}</h3>
        <p>{locale.ourPolicies.p_38}</p>
        <h3>{locale.ourPolicies.h3_16}</h3>
        <p>{locale.ourPolicies.p_39}</p>
        <h3>{locale.ourPolicies.h3_17}</h3>
        <p>{locale.ourPolicies.p_40}</p>
        <h3>{locale.ourPolicies.h3_18}</h3>
        <p>{locale.ourPolicies.p_41}</p>

        <h2>{locale.ourPolicies.h2_24}</h2>
        <h3>{locale.ourPolicies.h3_19}</h3>
        <p>
          <strong>{locale.ourPolicies.p_42_strong} </strong>
          {locale.ourPolicies.p_42}
        </p>
        <h2>{locale.ourPolicies.h2_25}</h2>
        <ul>
          <li>
            <strong>{locale.ourPolicies.li_82}</strong>
          </li>
          <p className="intends">{locale.ourPolicies.p_43}</p>
          <li>
            <strong>{locale.ourPolicies.li_83} </strong>
          </li>
          <ul className="intends">
            <li>{locale.ourPolicies.li_84}</li>
            <li>{locale.ourPolicies.li_85}</li>
            <li>{locale.ourPolicies.li_86}</li>
            <li>{locale.ourPolicies.li_87}</li>
            <li>{locale.ourPolicies.li_88}</li>
            <li>{locale.ourPolicies.li_89}</li>
            <li>{locale.ourPolicies.li_90}</li>
            <li>{locale.ourPolicies.li_91}</li>
            <li>{locale.ourPolicies.li_92}</li>
          </ul>

          <p>
            <strong>{locale.ourPolicies.p_44_strong} </strong>
            {locale.ourPolicies.p_44}
          </p>
          <p>
            <strong>{locale.ourPolicies.p_45_strong} </strong>
            {locale.ourPolicies.p_45}
          </p>
          <p>{locale.ourPolicies.p_46}</p>
          <p>
            <strong>{locale.ourPolicies.p_47_strong} </strong>
            {locale.ourPolicies.p_47}
          </p>
          <li>
            <strong>{locale.ourPolicies.li_93}</strong>
          </li>
          <p>{locale.ourPolicies.p_48}</p>
          <li>
            <strong>{locale.ourPolicies.li_94}</strong>
          </li>
          <p>{locale.ourPolicies.p_49}</p>
          <ul className="intends">
            <li>{locale.ourPolicies.li_95}</li>
            <li>{locale.ourPolicies.li_96}</li>
          </ul>
          <p>
            <strong>{locale.ourPolicies.p_50_strong} </strong>
            {locale.ourPolicies.p_50}
          </p>
          <li>
            <strong>{locale.ourPolicies.li_97}</strong>
          </li>
          <p>{locale.ourPolicies.p_51}</p>
          <li>
            <u>
              <strong>{locale.ourPolicies.li_98}</strong>
            </u>
          </li>
          <p>{locale.ourPolicies.p_52}</p>
          <li>
            <strong>{locale.ourPolicies.li_99}</strong>
          </li>
          <p>{locale.ourPolicies.p_53}</p>
          <p>{locale.ourPolicies.p_54}</p>
          <p>{locale.ourPolicies.p_55}</p>
          <p>{locale.ourPolicies.p_56}</p>
        </ul>
        <h2>{locale.ourPolicies.h2_26}</h2>
        <p>{locale.ourPolicies.p_57}</p>
        <p>{locale.ourPolicies.p_58}</p>
        <h2>{locale.ourPolicies.h2_27}</h2>
        <p>{locale.ourPolicies.p_59}</p>
        <ul className="intends">
          <li>{locale.ourPolicies.li_100}</li>
          <li>{locale.ourPolicies.li_101}</li>
          <li>{locale.ourPolicies.li_102}</li>
          <li>{locale.ourPolicies.li_103}</li>
          <li>{locale.ourPolicies.li_104}</li>
          <li>{locale.ourPolicies.li_105}</li>
        </ul>
        <h2>{locale.ourPolicies.h2_28}</h2>
        <p>{locale.ourPolicies.p_60}</p>
        <p>{locale.ourPolicies.p_61}</p>
        <h2>{locale.ourPolicies.h2_29}</h2>
        <ul>
          <li>{locale.ourPolicies.li_106}</li>
          <li>{locale.ourPolicies.li_107}</li>
          <li>{locale.ourPolicies.li_108}</li>
          <li>{locale.ourPolicies.li_109}</li>
          <li>{locale.ourPolicies.li_110}</li>
        </ul>
        <h2>{locale.ourPolicies.h2_30}</h2>
        <p>{locale.ourPolicies.p_64}</p>
        <h2>{locale.ourPolicies.h2_31}</h2>
        <p>{locale.ourPolicies.p_65}</p>
        <h2>{locale.ourPolicies.h2_32}</h2>
        <p>{locale.ourPolicies.p_66}</p>
        <ul>
          <li>{locale.ourPolicies.li_111}</li>
          <li>{locale.ourPolicies.li_112}</li>
          <li>{locale.ourPolicies.li_113}</li>
          <li>{locale.ourPolicies.li_114}</li>
          <li>{locale.ourPolicies.li_115}</li>
        </ul>
        <h2>{locale.ourPolicies.h2_33}</h2>
        <p>{locale.ourPolicies.p_67}</p>
        <p>{locale.ourPolicies.p_68}</p>
        <h2>{locale.ourPolicies.h2_34}</h2>
        <p>{locale.ourPolicies.p_69}</p>
        <h2>{locale.ourPolicies.h2_35}</h2>
        <p>{locale.ourPolicies.p_70}</p>
        <p>{locale.ourPolicies.p_71}</p>
        <h2>{locale.ourPolicies.h2_36}</h2>
        <p>{locale.ourPolicies.p_73}</p>
        <h2>{locale.ourPolicies.h2_37}</h2>
        <p>{locale.ourPolicies.p_72}</p>
        <h2>{locale.ourPolicies.h2_38}</h2>
        <p>{locale.ourPolicies.p_74}</p>
        <h2>{locale.ourPolicies.h2_39}</h2>
        <h3>{locale.ourPolicies.h3_21}</h3>
        <p>{locale.ourPolicies.p_75}</p>
        <h3>{locale.ourPolicies.h3_20}</h3>
        <ul>
          <li>{locale.ourPolicies.li_118}</li>
          <li>{locale.ourPolicies.li_119}</li>
          <li>{locale.ourPolicies.li_120}</li>
          <li>{locale.ourPolicies.li_121}</li>
          <li>{locale.ourPolicies.li_122}</li>
          <li>{locale.ourPolicies.li_123}</li>
          <li>{locale.ourPolicies.li_124}</li>
          <li>{locale.ourPolicies.li_125}</li>
          <li>{locale.ourPolicies.li_126}</li>
        </ul>
        <h3>{locale.ourPolicies.h3_22}</h3>
        <ul>
          <li>{locale.ourPolicies.li_127}</li>
          <li>{locale.ourPolicies.li_128}</li>
          <li>{locale.ourPolicies.li_129}</li>
          <li>{locale.ourPolicies.li_130}</li>
          <li>{locale.ourPolicies.li_131}</li>
        </ul>
        <h3>{locale.ourPolicies.h3_23}</h3>
        <p>{locale.ourPolicies.li_116}</p>
        <h3>{locale.ourPolicies.h3_24}</h3>
        <p>{locale.ourPolicies.li_117}</p>
        <h2>{locale.ourPolicies.h2_40}</h2>
        <p>{locale.ourPolicies.p_76}</p>
        <h3>{locale.ourPolicies.h3_25}</h3>
        <p>{locale.ourPolicies.p_77}</p>
        <h3>{locale.ourPolicies.h3_26}</h3>
        <ul>
          <li>{locale.ourPolicies.li_132}</li>
          <li>{locale.ourPolicies.li_133}</li>
          <li>{locale.ourPolicies.li_134}</li>
        </ul>
        <h3>{locale.ourPolicies.h3_27}</h3>
        <p>{locale.ourPolicies.p_78}</p>
        <h3>{locale.ourPolicies.h3_28}</h3>
        <ul>
          <li>{locale.ourPolicies.li_135}</li>
          <li>{locale.ourPolicies.li_136}</li>
          <li>{locale.ourPolicies.li_137}</li>
          <li>{locale.ourPolicies.li_138}</li>
          <li>{locale.ourPolicies.li_139}</li>
        </ul>
        <h3>{locale.ourPolicies.h3_29}</h3>
        <ul>
          <li>{locale.ourPolicies.li_140}</li>
          <li>{locale.ourPolicies.li_141}</li>
        </ul>
        <h3>{locale.ourPolicies.h3_30}</h3>
        <p>{locale.ourPolicies.p_79}</p>
        <h3>{locale.ourPolicies.h3_31}</h3>
        <p>{locale.ourPolicies.p_80}</p>
        <ul>
          <li>{locale.ourPolicies.li_142}</li>
          <li>{locale.ourPolicies.li_143}</li>
          <li>{locale.ourPolicies.li_144}</li>
          <li>{locale.ourPolicies.li_145}</li>
          <li>{locale.ourPolicies.li_146}</li>
        </ul>
      </section>
    </Layout>
  );
};

export default OtoliPolicies;
