import axios from "axios";
import { BASE_URL } from "../constants";


export const getQuotes = () =>
    axios.get(BASE_URL + "quotes/")
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err.response.message;
        });

export const getQuote = (quoteId: string) =>
    axios.get(BASE_URL + `quotes/${quoteId}`)
        .then((res) => res.data)
        .catch((err) => err.response.message)

export const postQuote = (formData: {}) =>
    axios.post(BASE_URL + "quotes/", formData)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err.response.message;
        });

export const updateQuote = (quoteId: string, formData: {}) =>
    axios.put(BASE_URL + `quotes/${quoteId}`, formData)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err.response.message;
        });


export const delQuote = (quoteId: string) =>
    axios.delete(BASE_URL + `quotes/${quoteId}`)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err.response.message;
        });