import axios from "axios";

export const makeRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

//1
//Claudiu sau claudiu username
//test

//2
//test1
//test1

//3
//test2
//test2
