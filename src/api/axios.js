import axios from "axios";
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
const instance2 = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const user = JSON.parse(localStorage.getItem("user"));
    config.headers.Authorization = user?.accessToken;

    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const originalRequest = error.config;
    if (
      (error.response.status === 401 || error.response.status === 403) &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.refreshToken) throw new Error();
        const response = await instance2.post(`/users/refresh`, null, {
          headers: {
            Authorization: user.refreshToken,
          },
        });
        user.accessToken = response.data.accessToken;
        localStorage.setItem("user", JSON.stringify(user));

        // originalRequest.headers.Authorization = user.accessToken;

        return instance.request(originalRequest);
      } catch (error) {
        localStorage.removeItem("user");
        location.assign("/login");
      }
    }
    return Promise.reject(error);
  }
);

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await instance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export { instance, axiosBaseQuery };
