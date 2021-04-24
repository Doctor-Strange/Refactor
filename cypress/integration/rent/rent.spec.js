import { set_default_date_for_search } from "../utils/set_defult_date_for_search";

const date = set_default_date_for_search();
const core_url = "https://core.sepris.com/core";
let car_information = null;
let search_id = null;
let car_index_in_list = 0;

describe("بررسی صفحه اجاره", () => {
  //   beforeEach("http://localhost:3000/rent");
  it("بررسی لینک اجاره خودرو در ", () => {
    cy.visit("http://localhost:3000/rent")
      .title()
      .should("eq", "اجاره ماشین، اجاره خودرو، لیست قیمت کرایه ماشین | سپریس");
  });
});
