type Environment = "local" | "dev"

const ENV: Environment = (process.env.EXPO_PUBLIC_ENVIRONMENT as Environment) || "local"

// 게이트웨이 URL 상수
const GATEWAY_URL: Record<Environment, string> = {
  local: "http://192.168.45.167:8087",
  dev: "https://pyokemon.synology.me:8087",
}

// 각 서비스별 API URL은 게이트웨이 URL을 기반으로 구성
const EVENT_API_URL: Record<Environment, string> = {
  local: `${GATEWAY_URL.local}/event`,
  dev: `${GATEWAY_URL.dev}/event`,
}

const ACCOUNT_API_URL: Record<Environment, string> = {
  local: `${GATEWAY_URL.local}/account`,
  dev: `${GATEWAY_URL.dev}/account`,
}

const PAYMENT_API_URL: Record<Environment, string> = {
  local: `${GATEWAY_URL.local}/payment`,
  dev: `${GATEWAY_URL.dev}/payment`,
}

const BOOKING_API_URL: Record<Environment, string> = {
  local: `${GATEWAY_URL.local}/booking`,
  dev: `${GATEWAY_URL.dev}/payment`,
}


export const getGatewayUrl = () => GATEWAY_URL[ENV]
export const getEventApiUrl = () => EVENT_API_URL[ENV]
export const getAccountApiUrl = () => ACCOUNT_API_URL[ENV]
export const getPaymentApiUrl = () => PAYMENT_API_URL[ENV]
export const getBookingApiUrl = () => BOOKING_API_URL[ENV]

export default {
  ENV,
  GATEWAY_URL,
  EVENT_API_URL,
  ACCOUNT_API_URL,
  PAYMENT_API_URL,
  BOOKING_API_URL,
  getGatewayUrl,
  getEventApiUrl,
  getAccountApiUrl,
  getPaymentApiUrl,
  getBookingApiUrl,
}
