import i18next from "i18next";
import * as yup from "yup";
import CustomError from "@/components/PaymentMethod/CustomError";

export const createCardMpayWithSchema = () => {
    const {t}=i18next
    return {
        fullname: yup
            .string()
            .required(i18next.t('Full Name is required')),
        cardNumber: yup.string()
            .required(i18next.t('Card Number is required'))
            .matches(
            /^(?:[0-9]{4}[- ]){3}[0-9]{4}$|^[0-9]{16}$/,
            i18next.t('Please enter the valid card number'))
    }
}
export const createCreditWithSchema = () => {
    return {
        fullname : yup.string()
            .required(i18next.t("Full Name is required")),
        cardNumber : yup
            .string()
            .required(i18next.t("Card Number is required"))
            .matches(/^(?:[0-9]{4}[- ]){3}[0-9]{4}$|^[0-9]{16}$/,i18next.t('Please enter the valid card number')),
        expiryDate : yup
            .string()
            .required(i18next.t("Expiry Date is required"))
            .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, i18next.t('Invalid Date')),
        cvvCode : yup.string()
            .required(i18next.t("CVV/CVC is requird"))
            .matches(/^[0-9]{3,4}$/, i18next.t('Invalid CVV/CVC'))
            
    }
}