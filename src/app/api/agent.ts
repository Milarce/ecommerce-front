import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { PaginatedResponse } from "../models/pagination";

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true; //Permits get and set cookies by the browser (must be implemented on the server side as well)

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
  (resp) => {
    const pagination = resp.headers["pagination"]; //Gets the data inside the header with name "pagination"
    if (pagination) {
      resp.data = new PaginatedResponse(resp.data, JSON.parse(pagination));
      return resp;
    }
    return resp;
  },
  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
      case 400: {
        //not-found and validation error are both 400 code
        if (data.errors) {
          const modelDataErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) modelDataErrors.push(data.errors[key]);
          }
          throw modelDataErrors.flat();
        }
        toast.error(data.title);
        break;
      }
      case 401: {
        toast.error(data.title);
        break;
      }
      case 500: {
        router.navigate("/error", { state: { error: data } }); //As this is not a component, useNavigate() can not be used
        break;
      }
      default: {
        break;
      }
    }
    return Promise.reject(error.response); //We have to return a Promise rejected response because withoud a response the application fails
  }
);

const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
  list: (params: URLSearchParams) => requests.get("products", params),
  details: (id: number) => requests.get(`Products/${id}`),
  fethFilters: () => requests.get("products/filters"),
};

const TestErrors = {
  get400Error: () => requests.get("buggy/bad-request"),
  get401Error: () => requests.get("buggy/Unauthorized"),
  get404Error: () => requests.get("buggy/not-found"),
  get500Error: () => requests.get("buggy/server-error"),
  getValidationError: () => requests.get("buggy/validation-error"),
};

const Basket = {
  get: () => requests.get("basket"),
  addItem: (id: number, quantity = 1) =>
    requests.post(`Basket?productId=${id}&quantity=${quantity}`, {}),
  removeItem: (id: number, quantity = 1) =>
    requests.delete(`Basket?productId=${id}&quantity=${quantity}`),
};

const agent = {
  Catalog,
  TestErrors,
  Basket,
};

export default agent;
