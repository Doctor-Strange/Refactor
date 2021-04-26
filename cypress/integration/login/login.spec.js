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
      .click()
      .wait(3000)
      .then(() => {
        cy.url()
          .should("contain", "/login")
          .go("back")
          .get(".add_car_section .Blue_BTN.add_car_custom")
          .click()
          .wait(6000)
          .url()
          .should("contain", "/login")
          .back()
          .get()
          .click()
          .wait();
        get().click().get;
      });
  });
});
