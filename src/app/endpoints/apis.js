import runtimeEnv from "@mars/heroku-js-runtime-env";
const env = runtimeEnv();

export const API_BACKEND = env.REACT_APP_BACKEND || "http://localhost:3001/api";
export const API_USERS = `${API_BACKEND}/users`;
export const API_JOBS = `${API_BACKEND}/jobs`;
