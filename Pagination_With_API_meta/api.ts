import { CookieName } from "@/types";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

instance.interceptors.request.use(function (config) {
  const accessToken = cookies.get("accessToken");
  const langOriginal = localStorage.getItem('i18nextLng')
  const langs = langOriginal?.split('-') || ['en']

  config.headers.Authorization = `Bearer ${accessToken}`;
  config.headers['x-language'] = langs[0]

  return config;
});