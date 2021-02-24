import React from "react";
import Link from "next/link";
// import "./landingPageContent.scss";

const Landing_Page_Content = ({ data, language }: ILanding_Page_Content) => {
  return (
    <article
      className='responsive landing_dynamic_content'
      itemType='http://schema.org/Product'
      itemScope
    >
      <meta itemProp='mpn' content={data.id} />
      <meta itemProp='name' content={data.title} />
      <link itemProp='image' href={data.image_url} />
      <meta itemProp='description' content={data.meta_description} />
      <div
        itemProp='aggregateRating'
        itemType='http://schema.org/AggregateRating'
        itemScope
      >
        <meta itemProp='reviewCount' content='89' />
        <meta itemProp='ratingValue' content='4.4' />
      </div>
      <div itemProp='offers' itemType='http://schema.org/Offer' itemScope>
        <link itemProp='url' href='https://example.com/anvil' />
        <meta itemProp='availability' content='https://schema.org/InStock' />
        <meta itemProp='priceCurrency' content='IRR' />
        <meta
          itemProp='itemCondition'
          content='https://schema.org/UsedCondition'
        />
        <meta itemProp='price' content='20000000' />
        <meta itemProp='priceValidUntil' content='2021-11-20' />
      </div>
      <meta itemProp='sku' content={data.id} />
      <div itemProp='review' itemType='http://schema.org/Review' itemScope>
        <div itemProp='author' itemType='http://schema.org/Person' itemScope>
          <meta itemProp='name' content={data.title} />
        </div>
        <div
          itemProp='reviewRating'
          itemType='http://schema.org/Rating'
          itemScope
        >
          <meta itemProp='ratingValue' content='4' />
          <meta itemProp='bestRating' content='5' />
        </div>
      </div>
      <section
        className='Landing_content'
        dangerouslySetInnerHTML={{ __html: `${data.content}` }}
      ></section>
      {data.link_set.length > 0 && (
        <div className='Landing_Links'>
          <h3>{language.Landing_Page_Content.Landing_Links}</h3>
          <ul>
            {data.link_set.map((item) => {
              let id = item.url.split("/").pop();
              return (
                <li key={item.name}>
                  {id === "rent" ? (
                    <Link href='/rent'>
                      <a
                        className='HEAP_LandingPages_Link_RelatedLinks'
                        href={item.url}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ) : (
                    <Link
                      href={{
                        pathname: "/rent/[id]",
                        query: {
                          id: id,
                        },
                      }}
                      as={`/rent/${id}`}
                    >
                      <a className='HEAP_LandingPages_Link_RelatedLinks'>
                        {item.name}
                      </a>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </article>
  );
};

interface ILanding_Page_Content {
  data: any;
  language: any;
}
export default Landing_Page_Content;
