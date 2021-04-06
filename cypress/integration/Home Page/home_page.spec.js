context("تست یو-آی صفحه خانه", () => {
  const core_url = "https://core.sepris.com/core";
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  // it("چک کردن متن های مهم صفحه و دو شماره تلفن فوتر", () => {
  //   cy.get("h1").contains("سِپریس، اجاره آسان خودرو");
  //   cy.get(".Homepage .banner h2").contains(
  //     "ماشینی که دوست دارید را پیدا کنید و با خیال راحت اجاره کنید."
  //   );
  //   cy.get(".search_box form .search_box_div .label").contains(
  //     "خودرو را کجا تحویل میگیرید؟"
  //   );
  //   cy.get(
  //     ".search_box form .Date_picker_container .date_Input_Container .input_container:nth-of-type(2) .label"
  //   ).contains("از تاریخ");
  //   cy.get(
  //     ".search_box form .Date_picker_container .date_Input_Container .input_container:nth-of-type(3) .label"
  //   ).contains("تا تاریخ");
  //   cy.get(".search_box form .search_Btn").contains("جستجو");
  //   cy.get(".second_container .add_car_section .add_car_custom").contains(
  //     "ماشین‌تان را اضافه کنید"
  //   );
  //   cy.get(".second_container .add_car_section a").contains(
  //     "تخمین درآمد ماهیانه"
  //   );
  //   cy.get("a.HEAP_Footer_Link_Phone:first-child").contains("02188567759");
  //   cy.get("a.HEAP_Footer_Link_Phone:last-child").contains("09391414574");
  // });
  it("چک کردن باکس شهر ها در فرم جستجو، شامل درخواست شهرها، جستجو در نام شهر ها، کلیک بر روی شهر غیر فعال و بررسی پاپ آپ، کلیک بر روی شهر فعال ", () => {
    cy.request("GET", core_url + "/location/list?brief=1&limit=10").then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body)
          .to.have.property("items")
          .length(10);
        cy.get(".search_box form .search_box_div input").click();
        cy.get(
          ".DropDown_container .Locations_list_container .search_input_container input"
        )
          .type("سنندج")
          .get(".DropDown_container .Locations_list_container p")
          .click()
          .get(".Modal")
          .should("be.visible")
          .get(".modal_box_div .p3")
          .contains("وقتی در سنندج فعال شدیم خبرتان می‌کنیم.")
          .get(".text_input_container .input_surround .text_input")
          .type("09380158835")
          .intercept("POST", core_url + "/service-request/new")
          .as("serviceRequestNew")
          .get(".modal_box_div .login_submit")
          .click()
          .wait("@serviceRequestNew")
          .then((result) => {
            expect(result.response.body).to.have.property("success").to.true;
          })
          .get(".Modal")
          .should("not.exist");
        cy.get(".search_box form .search_box_div input").click();
        cy.get(
          ".DropDown_container .Locations_list_container .search_input_container input"
        )
          .type("تهران")
          .get(".DropDown_container .Locations_list_container p")
          .click();
      }
    );
  });
});
