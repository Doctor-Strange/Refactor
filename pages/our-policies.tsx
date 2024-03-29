import { useEffect } from "react";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("../src/Layout"));
// import Layout from "../src/Layout";
import { NextSeo } from "next-seo";
import language from "../public/languages/fa/ourpolicies.json";
// import { logPageView } from "../utils/analytics";
const OtoliPolicies = () => {
  useEffect(() => {
    window["dataLayer"].push({
      event: "page_view",
      pageURL: window.location.href,
      pagePath: "/our-policies",
      pageTitle: language.next_seo.title,
    });
    // logPageView();
  }, []);
  return (
    <Layout showToTop={true}>
      <NextSeo
        title={language.next_seo.title}
        description={language.next_seo.description}
        openGraph={{
          title: language.next_seo.title,
          description: language.next_seo.description,
        }}
        twitter={{
          handle: language.next_seo.handle,
          site: language.next_seo.site,
          cardType: language.next_seo.cardType,
        }}
      />
      {/* Most of the static pages have a same class named 'static_pages' which set some common style for the main wrapper box*/}
      <section className="responsive static_pages minHeight">
        <h1>{language.h1}</h1>
        <p>
          <strong>{language.p_1}</strong>
        </p>
        <h2>{language.h2_1}</h2>
        <h3>{language.h3_1}</h3>
        <ul>
          <li>{language.li_1}</li>
          <li>{language.li_2}</li>
        </ul>
        <h2>{language.h2_2}</h2>
        <ul>
          <li>{language.li_3}</li>
          <li>{language.li_4}</li>
          <li>{language.li_5}</li>
        </ul>
        <h3>{language.h3_2}</h3>
        <ul>
          <li>{language.li_6}</li>
          <li>{language.li_7}</li>
          <li>{language.li_8}</li>
          <li>{language.li_9}</li>
          <li>{language.li_10}</li>
          <li>{language.li_11}</li>
        </ul>
        <h2>{language.h2_3}</h2>
        <p>{language.p_2}</p>
        <h2>{language.h2_4}</h2>
        <ul>
          <li>{language.li_12}</li>
          <li>{language.li_13}</li>
        </ul>
        <h2>{language.h2_5}</h2>
        <ul>
          <li>{language.li_14}</li>
          <li>{language.li_15}</li>
          <li>{language.li_16}</li>
        </ul>
        <h2>{language.h2_6}</h2>
        <ul>
          <li>{language.li_17}</li>
          <li>{language.li_18}</li>
          <li>{language.li_19}</li>
          <li>{language.li_20}</li>
          <li>{language.li_21}</li>
          <li>{language.li_22}</li>
          <li>{language.li_23}</li>
          <li>{language.li_24}</li>
          <li>{language.li_25}</li>
          <li>{language.li_26}</li>
        </ul>
        <h2>{language.h2_7}</h2>
        <ul>
          <li>{language.li_27}</li>
          <li>{language.li_28}</li>
          <li>{language.li_29}</li>
          <li>{language.li_30}</li>
          <li>{language.li_31}</li>
          <li>{language.li_32}</li>
        </ul>
        <h2>{language.h2_8}</h2>
        <ul>
          <li>{language.li_33}</li>
          <li>{language.li_34}</li>
          <li>{language.li_35}</li>
          <li>{language.li_36}</li>
        </ul>
        <h2>{language.h2_9}</h2>
        <ul>
          <li>{language.li_37}</li>
          <li>{language.li_38}</li>
          <li>{language.li_39}</li>
          <li>{language.li_40}</li>
        </ul>
        <h2>{language.h2_10}</h2>
        <ul>
          <li>{language.li_41}</li>
          <li>{language.li_42}</li>
          <li>{language.li_43}</li>
          <li>{language.li_44}</li>
          <li>{language.li_45}</li>
          <li>{language.li_46}</li>
          <li>{language.li_47}</li>
          <li>{language.li_48}</li>
          <li>{language.li_49}</li>
          <li>{language.li_50}</li>
          <li>{language.li_51}</li>
        </ul>
        <p>{language.p_3}</p>
        <h3>{language.h3_3}</h3>
        <p>{language.p_4}</p>
        <h2>{language.h2_11}</h2>
        <p>{language.p_5}</p>
        <p>
          <strong>
            <u>{language.p_6}</u>
          </strong>
        </p>
        <h2>
          <u>{language.h2_12}</u>
        </h2>
        <p>{language.p_7}</p>
        <ul>
          <li>{language.li_52}</li>
          <li>{language.li_53}</li>
          <li>{language.li_54}</li>
          <li>{language.li_55}</li>
          <li>{language.li_56}</li>
        </ul>
        <h2>{language.h2_13}</h2>
        <p>{language.p_8}</p>
        <p>
          <strong>{language.p_9_strong} </strong>
          {language.p_9}
        </p>
        <p>
          <strong>{language.p_10_strong} </strong>
          {language.p_10}
        </p>
        <p>
          <strong>{language.p_11_strong} </strong>
          {language.p_11}
        </p>
        <p>
          <strong>{language.p_12_strong} </strong>
          {language.p_12}
        </p>
        <p>
          <strong>{language.p_13_strong} </strong>
          {language.p_13}
        </p>
        <p>
          <strong>{language.p_14_strong} </strong>
          {language.p_14}
        </p>
        <p>
          <strong>{language.p_15_strong} </strong>
          {language.p_15}
        </p>
        <h2>
          <u>{language.h2_14}</u>
        </h2>
        <h3>{language.h3_4}</h3>
        <p>{language.p_16}</p>
        <ul>
          <li>{language.li_57}</li>
          <li>{language.li_58}</li>
          <li>{language.li_59}</li>
          <li>{language.li_60}</li>
          <li>{language.li_61}</li>
        </ul>
        <h3>{language.h3_5}</h3>
        <p>{language.p_17}</p>
        <h2>
          <u>{language.h2_15}</u>
        </h2>
        <h3>{language.h3_6}</h3>
        <p>{language.p_18}</p>
        <ul>
          <li>{language.li_62}</li>
          <li>{language.li_63}</li>
          <li>{language.li_64}</li>
          <li>{language.li_65}</li>
          <li>{language.li_66}</li>
          <li>{language.li_67}</li>
        </ul>
        <h3>{language.h3_7}</h3>
        <p>{language.p_19}</p>
        <ul>
          <li>{language.li_68}</li>
          <li>{language.li_69}</li>
          <li>{language.li_70}</li>
          <li>{language.li_71}</li>
          <li>{language.li_72}</li>
          <li>{language.li_73}</li>
          <li>{language.li_74}</li>
          <li>{language.li_75}</li>
          <li>{language.li_76}</li>
        </ul>
        <h2>
          <u>{language.h2_16}</u>
        </h2>
        <h3>{language.h3_8}</h3>
        <p>{language.p_20}</p>
        <h3>{language.h3_9}</h3>
        <p>{language.p_21}</p>
        <h3>{language.h3_10}</h3>
        <p>{language.p_22}</p>
        <h2>{language.h2_17}</h2>
        <p>{language.p_23}</p>
        <h2>{language.h2_18}</h2>
        <p>{language.p_24}</p>
        <h2>{language.h2_19}</h2>
        <p>{language.p_25}</p>
        <h2>
          <u>{language.h2_20}</u>
        </h2>
        <h3>{language.h3_11}</h3>
        <p>{language.p_26}</p>
        <h4>{language.h4_1}</h4>
        <ul>
          <li>{language.li_77}</li>
          <li>{language.li_78}</li>
          <li>{language.li_79}</li>
        </ul>
        <h4>{language.h4_2}</h4>
        <ul>
          <li>{language.li_80}</li>
          <li>{language.li_81}</li>
        </ul>
        <h4>{language.h4_3}</h4>
        <p>{language.p_27}</p>
        <h2>{language.h2_21}</h2>
        <h3>{language.h3_12}</h3>
        <p>{language.p_28}</p>
        <h3>{language.h3_13}</h3>
        <p>{language.p_29}</p>
        <p>
          <strong>{language.p_30_strong} </strong>
          {language.p_30}
        </p>
        <p>
          <strong>{language.p_31_strong} </strong>
          {language.p_31}
        </p>
        <p>
          <strong>{language.p_32_strong} </strong>
          {language.p_32}
        </p>
        <p>
          <strong>{language.p_33_strong} </strong>
          {language.p_33}
        </p>

        <h3>{language.h3_14}</h3>
        <p>{language.p_34}</p>
        <h2>
          <u>{language.h2_22}</u>
        </h2>
        <p>{language.p_35}</p>
        <p>
          <strong>{language.p_36_strong} </strong>
          {language.p_36}
        </p>
        <p>
          <u>
            <strong>{language.p_37_strong} </strong>
            {language.p_37}
          </u>
        </p>
        <h2>
          <u>{language.h2_23}</u>
        </h2>
        <h3>{language.h3_15}</h3>
        <p>{language.p_38}</p>
        <h3>{language.h3_16}</h3>
        <p>{language.p_39}</p>
        <h3>{language.h3_17}</h3>
        <p>{language.p_40}</p>
        <h3>{language.h3_18}</h3>
        <p>{language.p_41}</p>

        <h2>{language.h2_24}</h2>
        <h3>{language.h3_19}</h3>
        <p>
          <strong>{language.p_42_strong} </strong>
          {language.p_42}
        </p>
        <h2>{language.h2_25}</h2>
        <ul>
          <li>
            <strong>{language.li_82}</strong>
          </li>
          <p className="intends">{language.p_43}</p>
          <li>
            <strong>{language.li_83} </strong>
          </li>
          <ul className="intends">
            <li>{language.li_84}</li>
            <li>{language.li_85}</li>
            <li>{language.li_86}</li>
            <li>{language.li_87}</li>
            <li>{language.li_88}</li>
            <li>{language.li_89}</li>
            <li>{language.li_90}</li>
            <li>{language.li_91}</li>
            <li>{language.li_92}</li>
          </ul>

          <p>
            <strong>{language.p_44_strong} </strong>
            {language.p_44}
          </p>
          <p>
            <strong>{language.p_45_strong} </strong>
            {language.p_45}
          </p>
          <p>{language.p_46}</p>
          <p>
            <strong>{language.p_47_strong} </strong>
            {language.p_47}
          </p>
          <li>
            <strong>{language.li_93}</strong>
          </li>
          <p>{language.p_48}</p>
          <li>
            <strong>{language.li_94}</strong>
          </li>
          <p>{language.p_49}</p>
          <ul className="intends">
            <li>{language.li_95}</li>
            <li>{language.li_96}</li>
          </ul>
          <p>
            <strong>{language.p_50_strong} </strong>
            {language.p_50}
          </p>
          <li>
            <strong>{language.li_97}</strong>
          </li>
          <p>{language.p_51}</p>
          <li>
            <u>
              <strong>{language.li_98}</strong>
            </u>
          </li>
          <p>{language.p_52}</p>
          <li>
            <strong>{language.li_99}</strong>
          </li>
          <p>{language.p_53}</p>
          <p>{language.p_54}</p>
          <p>{language.p_55}</p>
          <p>{language.p_56}</p>
        </ul>
        <h2>{language.h2_26}</h2>
        <p>{language.p_57}</p>
        <p>{language.p_58}</p>
        <h2>{language.h2_27}</h2>
        <p>{language.p_59}</p>
        <ul className="intends">
          <li>{language.li_100}</li>
          <li>{language.li_101}</li>
          <li>{language.li_102}</li>
          <li>{language.li_103}</li>
          <li>{language.li_104}</li>
          <li>{language.li_105}</li>
        </ul>
        <h2>{language.h2_28}</h2>
        <p>{language.p_60}</p>
        <p>{language.p_61}</p>
        <h2>{language.h2_29}</h2>
        <ul>
          <li>{language.li_106}</li>
          <li>{language.li_107}</li>
          <li>{language.li_108}</li>
          <li>{language.li_109}</li>
          <li>{language.li_110}</li>
        </ul>
        <h2>{language.h2_30}</h2>
        <p>{language.p_64}</p>
        <h2>{language.h2_31}</h2>
        <p>{language.p_65}</p>
        <h2>{language.h2_32}</h2>
        <p>{language.p_66}</p>
        <ul>
          <li>{language.li_111}</li>
          <li>{language.li_112}</li>
          <li>{language.li_113}</li>
          <li>{language.li_114}</li>
          <li>{language.li_115}</li>
        </ul>
        <h2>{language.h2_33}</h2>
        <p>{language.p_67}</p>
        <p>{language.p_68}</p>
        <h2>{language.h2_34}</h2>
        <p>{language.p_69}</p>
        <h2>{language.h2_35}</h2>
        <p>{language.p_70}</p>
        <p>{language.p_71}</p>
        <h2>{language.h2_36}</h2>
        <p>{language.p_73}</p>
        <h2>{language.h2_37}</h2>
        <p>{language.p_72}</p>
        <h2>{language.h2_38}</h2>
        <p>{language.p_74}</p>
        <h2>{language.h2_39}</h2>
        <h3>{language.h3_21}</h3>
        <p>{language.p_75}</p>
        <h3>{language.h3_20}</h3>
        <ul>
          <li>{language.li_118}</li>
          <li>{language.li_119}</li>
          <li>{language.li_120}</li>
          <li>{language.li_121}</li>
          <li>{language.li_122}</li>
          <li>{language.li_123}</li>
          <li>{language.li_124}</li>
          <li>{language.li_125}</li>
          <li>{language.li_126}</li>
        </ul>
        <h3>{language.h3_22}</h3>
        <ul>
          <li>{language.li_127}</li>
          <li>{language.li_128}</li>
          <li>{language.li_129}</li>
          <li>{language.li_130}</li>
          <li>{language.li_131}</li>
        </ul>
        <h3>{language.h3_23}</h3>
        <p>{language.li_116}</p>
        <h3>{language.h3_24}</h3>
        <p>{language.li_117}</p>
        <h2>{language.h2_40}</h2>
        <p>{language.p_76}</p>
        <h3>{language.h3_25}</h3>
        <p>{language.p_77}</p>
        <h3>{language.h3_26}</h3>
        <ul>
          <li>{language.li_132}</li>
          <li>{language.li_133}</li>
          <li>{language.li_134}</li>
        </ul>
        <h3>{language.h3_27}</h3>
        <p>{language.p_78}</p>
        <h3>{language.h3_28}</h3>
        <ul>
          <li>{language.li_135}</li>
          <li>{language.li_136}</li>
          <li>{language.li_137}</li>
          <li>{language.li_138}</li>
          <li>{language.li_139}</li>
        </ul>
        <h3>{language.h3_29}</h3>
        <ul>
          <li>{language.li_140}</li>
          <li>{language.li_141}</li>
        </ul>
        <h3>{language.h3_30}</h3>
        <p>{language.p_79}</p>
        <h3>{language.h3_31}</h3>
        <p>{language.p_80}</p>
        <ul>
          <li>{language.li_142}</li>
          <li>{language.li_143}</li>
          <li>{language.li_144}</li>
          <li>{language.li_145}</li>
          <li>{language.li_146}</li>
        </ul>
      </section>
    </Layout>
  );
};

export default OtoliPolicies;
