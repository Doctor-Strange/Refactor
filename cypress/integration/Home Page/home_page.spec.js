context("تست یو-آی صفحه خانه", () => {
  const core_url = "https://core.sepris.com/core";
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it("چک کردن متن های مهم صفحه و دو شماره تلفن فوتر", () => {
    cy.get("h1").contains("سِپریس، اجاره آسان خودرو");
    cy.get(".Homepage .banner h2").contains(
      "ماشینی که دوست دارید را پیدا کنید و با خیال راحت اجاره کنید."
    );
    cy.get(".search_box form .search_box_div .label").contains(
      "خودرو را کجا تحویل میگیرید؟"
    );
    cy.get(
      ".search_box form .Date_picker_container .date_Input_Container .input_container:nth-of-type(2) .label"
    ).contains("از تاریخ");
    cy.get(
      ".search_box form .Date_picker_container .date_Input_Container .input_container:nth-of-type(3) .label"
    ).contains("تا تاریخ");
    cy.get(".search_box form .search_Btn").contains("جستجو");
    cy.get(".second_container .add_car_section .add_car_custom").contains(
      "ماشین‌تان را اضافه کنید"
    );
    cy.get(".second_container .add_car_section a").contains(
      "تخمین درآمد ماهیانه"
    );
    cy.get("a.HEAP_Footer_Link_Phone:first-child").contains("02188567759");
    cy.get("a.HEAP_Footer_Link_Phone:last-child").contains("09391414574");
  });
  it("چک کردن فرم جستجو", () => {
    cy.intercept("GET", {
      pathname: core_url + "/location/list",
      query: {
        brief: 1,
        limit: 500,
      },
    }).as("get_state_list");
    cy.visit(core_url + "/location/list?limit=500&brief=1");
    cy.wait("@get_state_list").then((res) => {
      cy.get(".search_box form .search_box_div input").click();
    });
  });
});
