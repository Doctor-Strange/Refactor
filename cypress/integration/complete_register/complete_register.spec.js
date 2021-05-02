import log_me_in from "../utils/log_me_in";
import { set_default_date_for_search } from "../utils/set_defult_date_for_search";

const date = set_default_date_for_search();
const core_url = "https://core.sepris.com/core";
let home = "http://localhost:3000";
let search_id = null;
let user_info = 0;
let cell_phone = "09380000000";

describe("بررسی صفحه تکمیل ثبت نام", () => {
  beforeEach(() => {
    cy.visit(home);
  });
  it("بررسی دسترسی های صفحه", () => {
    log_me_in(cell_phone).then(() => {
      cy.request({
        method: "POST",
        url: `${core_url}/device/login`,
        form: true,
        body: {
          cell: cell_phone,
          code: "9931",
        },
      }).then((data) => {
        user_info = data.body;
        cy.url().should("contain", "/complete-register");
      });
    });
  });
});
