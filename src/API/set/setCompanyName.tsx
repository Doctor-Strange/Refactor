import axios from "axios";
import jsCookie from "js-cookie";
const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const SET_COMPANY_NAME = "/core/user/set-company-name";

const cook_option = {
  expires: 100,
};

export const REQUEST_SET_COMPANY_NAME = (data: ICompanyName) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        DOMAIN + SET_COMPANY_NAME,
        {
          company_name: data.company_name,
        },
        {
          headers: {
            Authorization: "Bearer " + data.token,
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          jsCookie.set(
            "company_name",
            response.data.data.company_name,
            cook_option
          );

          resolve(response.data.success);
        }
      })
      .catch((error) => {
        reject(error.response?.message);
      });
  });
};

interface ICompanyName {
  token: string;
  company_name: string;
}
