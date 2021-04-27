import { set_default_date_for_search } from "../utils/set_defult_date_for_search";

const date = set_default_date_for_search();
const core_url = "https://core.sepris.com/core";
let search_id = null;
let car_index_in_list = 0;

describe("بررسی صفحه لاگین", () => {
  beforeEach(() => {
    cy.visit(`http://localhost:3000`);
  });
  it("بررسی عملکرد صفحه داینامیک", () => {
    cy.get(".HEAP_Header_Btn_Login a")
      // .click()
      // .wait(3000)
      // .url()
      // .should("contain", "/login")
      // .go("back")
      // .get(".add_car_section .Blue_BTN.add_car_custom")
      // .click()
      // .wait(6000)
      // .url()
      // .should("contain", "/login")
      // .go("back")
      // .go("back")
      .get(".Blue_BTN.search_Btn.HEAP_Home_Btn_Search")
      .click()
      .request(
        "GET",
        core_url +
          `/rental-car/search-for-rent/list?location_id=1&start_date=${date.from_date_form}&end_date=${date.to_date_form}&o=-price&page=1&limit=1`
      )
      .then(() => {
        cy.get(".carCart.HEAP_SearchResult_Card_Car")
          .eq(0)
          .click()
          .get(".Blue_BTN.localClass.HEAP_Car_Btn_Continue")
          .click()
          .get(".Blue_BTN.localClass.HEAP_Checkout_Btn_Book")
          .click()
          .wait(3000)
          .url()
          .should("contain", "/login")
          .visit("/");
      });
  });
});
