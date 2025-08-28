import {
  getAccountApiUrl,
  getBookingApiUrl,
  getDidApiUrl,
  getEventApiUrl,
  getPaymentApiUrl
} from "@/constants/env";
import { resetToLogin } from "@/navigation/navigationRef";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosInstance } from "axios";



// 클라이언트 생성 함수
const createClient = (baseURL: string): AxiosInstance => {
  const client = axios.create({ baseURL });

  client.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {}
  );

  let isRefreshing = false;
  let refreshSubscribers: ((token: string) => void)[] = [];

  const subscribeTokenRefresh = (cb: (token: string) => void) => {
    refreshSubscribers.push(cb);
  };

  const onRefreshed = (token: string) => {
    refreshSubscribers.forEach((cb) => cb(token));
    refreshSubscribers = [];
  };

  client.interceptors.response.use(
    (config) => {
      return config;
    },
    async (error) => {
      const originalRequest = error.config;
      const status = error.response.status;

      if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        if (isRefreshing) {
          return new Promise((resolve) => {
            subscribeTokenRefresh((token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axios(originalRequest));
            });
          });
        }

        isRefreshing = true;
        try {
          const refreshToken = await AsyncStorage.getItem("refreshToken");
          const res = await axios.post(
            `${getAccountApiUrl()}/api/refresh`,
            {},
            {
              headers: { Authorization: `Bearer ${refreshToken}` },
            }
          );

          const newAccessToken = res.data.data.accessToken;
          await AsyncStorage.setItem("accessToken", newAccessToken);

          onRefreshed(newAccessToken);
          isRefreshing = false;
          
          // originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        } catch (error) {
          isRefreshing = false;
          await AsyncStorage.removeItem("accessToken");
          await AsyncStorage.removeItem("refreshToken");

          // login 화면으로 이동
          resetToLogin(); 
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    }
  );

  return client;
};

// 서비스별 클라이언트 인스턴스 생성
export const eventClient = createClient(getEventApiUrl());
export const accountClient = createClient(getAccountApiUrl());
export const paymentClient = createClient(getPaymentApiUrl());
export const bookingClient = createClient(getBookingApiUrl());
export const didClient = createClient(getDidApiUrl());

// 기존 baseClient 호환성 유지 (이벤트 클라이언트로 매핑)
const baseClient = eventClient;

// 공통 헤더 설정 함수
export const setAuthorizationHeader = (token: string) => {
  eventClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  accountClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  paymentClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  bookingClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  didClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const removeAuthorizationHeader = () => {
  delete eventClient.defaults.headers.common["Authorization"];
  delete accountClient.defaults.headers.common["Authorization"];
  delete paymentClient.defaults.headers.common["Authorization"];
  delete bookingClient.defaults.headers.common["Authorization"];
  delete didClient.defaults.headers.common["Authorization"];
};

export default baseClient;
