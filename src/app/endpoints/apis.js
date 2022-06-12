import runtimeEnv from "@mars/heroku-js-runtime-env";
const env = runtimeEnv();

export const API_JOBS = "https://www.themuse.com/api/public/jobs?page=1";
export const API_BACKEND = env.REACT_APP_BACKEND || "http://localhost:3001/api";
