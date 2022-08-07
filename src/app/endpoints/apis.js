import { REACT_APP_BACKEND } from "../../environment";

export const API_BACKEND = REACT_APP_BACKEND || "http://localhost:3001/api";
export const API_USERS = `${API_BACKEND}/users`;
export const API_JOBS = `${API_BACKEND}/jobs`;
