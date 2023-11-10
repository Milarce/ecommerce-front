import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { PaginatedResponse } from "../models/pagination";
import { store } from "../context/configureStore";

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true; //Permits get and set cookies by the browser (must be implemented on the server side as well)

const responseBody = (response: AxiosResponse) => response.data;

//Allows the token to be persistent, meaning if the page reloads and if there were a user logged in, the token is sended to the server to check if is valid
axios.interceptors.request.use((config) => {
  const token = store.getState().account.user?.token; //If there is a token saved in local storage we have saved it in the state with setUser reducer
  if (token) config.headers.Authorization = `Bearer ${token}`; //we send the token to the server as an Authorization header only if we have a valid token saved in local storage
  return config;
});

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

const Account = {
  login: (values: any) => requests.post("account/login", values),
  register: (values: any) => requests.post("account/register", values),
  currentUser: () => requests.get("account/currentUser"),
};

const agent = {
  Catalog,
  TestErrors,
  Basket,
  Account,
};

export default agent;
