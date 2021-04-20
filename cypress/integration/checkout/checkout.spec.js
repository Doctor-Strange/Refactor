import { set_default_date_for_search } from "../utils/set_defult_date_for_search";

const date = set_default_date_for_search();
const core_url = "https://core.sepris.com/core";
let car_id = null;
let car_information = null;

describe("بررسی مسیر حرکت کاربر از خانه به صفجه چک اوت", () => {
  it(`شروع از صفحه خانه، کلیک بر روی اولین نتیجه برای شهر تهران در تاریخ رفت ${date.from_date_form} و برگشت ${date.to_date_form} قیمت زیاد به کم در صفحه جستجو و رسیدن به صفحه خودرو`, () => {
    cy.visit("http://localhost:3000/")
      .intercept(
        "GET",
        core_url +
          `/rental-car/search-for-rent/list?location_id=1&start_date=${date.from_date_form}&end_date=${date.to_date_form}&o=-price&page=1&limit=15`
      )
      .as("rentalCarList")
      .get(".search_box form .search_Btn")
      .click()
      .wait(2000)
      .wait("@rentalCarList")
      .then((result) => {
        cy.url().should(
          "contain",
          `http://localhost:3000/search-result?location_id=1&location_name=%D8%AA%D9%87%D8%B1%D8%A7%D9%86&start_date=${date.from_date_form}&end_date=${date.to_date_form}&price_order=-price&page=1&limit=15`
        );
        expect(result.response.statusCode).equal(200);
        cy.intercept("GET")
          .get(".carCart.HEAP_SearchResult_Card_Car")
          .eq(0)
          .click()
          .url()
          .should("include", "/car/")
          .get(".Blue_BTN.localClass.HEAP_Car_Btn_Continue")
          .click()
          .url()
          .should("include", "/checkout");
        car_information = result.response.body.items[0];
      });
  });
});
