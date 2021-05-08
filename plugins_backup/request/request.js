/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import axios from '../axios/axios.js';
export const createRequest = ({baseURL}) => {
  return axios.create({
    baseURL
  });
};

