import { Button, DatePicker, Form, Input, Space } from "antd";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import FocusInput from "@/components/AuthComponent/FocusInput";
import { PageRoute } from "@/data/pageRouter.enum";
import CustomError from "../CustomError";
import { createCreditWithSchema } from "@/validations/Card";
import FormErrorsTranslator from "@/components/common/FormErrorTranslator";
import * as yup from "yup";

interface CardFrom {
  fullname: string;
  cardNumber: any;
  expiryDate: any;
  cvv: string;
}

const Credit = () => {
  const { t } = useTranslation();

  const [isFocused, setIsFocused] = useState({
    fullname: false,
    cardNumber: false,
    expiryDate: false,
    cvv: false,
  });

  const initValue = {
    fullname: "",
    cardNumber: "",
    expiryDate: "",
    cvvCode: "",
  };

  const [formData, setFormData] = useState(initValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed", errorInfo);
  };

  const onFinish = (value: any) => {
    console.log("Success :", value);
  };

  const [form] = Form.useForm();

  const schema = yup.object().shape(createCreditWithSchema());

  const yupSync = {
    async validator({ field }: any, value: any) {
      await schema.validateSyncAt(field, { [field]: value });
    },
  };

  return (
    <>
      <FormErrorsTranslator formInstance={form} />
      <Form
        onFinishFailed={onFinishFailed}
        onFinish={onFinish}
        className=""
        style={{ padding: 20 }}
      >
        <label className="font-interSemi">{t("cardHolderName")}</label>
        <div className="mt-3">
          <Form.Item name="fullname" rules={[yupSync]}>
            <FocusInput
              fieldName="fullname"
              label="Cardholder name"
              placeHolder={t("fullName")}
              onChange={handleChange}
              setIsFocused={setIsFocused}
              isFocused={isFocused.fullname}
              value={formData.fullname}
              prefix={<img src="/assets//paymet//user.svg" alt="iconCard" />}
              style={{ borderRadius: "10px", height: 44 }}
            />
          </Form.Item>
        </div>

        <label className="font-interSemi">{t("cardHolderName")}</label>
        <div className="mt-3">
          <Form.Item name="cardNumber" rules={[yupSync]}>
            <FocusInput
              fieldName="cardNumber"
              label="00000"
              placeHolder={t("cardNumber")}
              onChange={handleChange}
              setIsFocused={setIsFocused}
              isFocused={isFocused.cardNumber}
              value={formData.cardNumber}
              prefix={
                <img src="/assets//paymet//iconCard.svg" alt="iconCard" />
              }
              style={{ borderRadius: "10px", height: 44 }}
            />
          </Form.Item>
        </div>
        <div className="flex w-full flex-col md:flex-row md:justify-between">
          <div className="flex flex-col md:w-[49%]">
            <label className=" font-interSemi">{t("expDate")}</label>
            <div className="mt-3">
              <Form.Item name="expiryDate" rules={[yupSync]}>
                <FocusInput
                  fieldName="expiryDate"
                  placeHolder={t("MM/YY")}
                  onChange={handleChange}
                  setIsFocused={setIsFocused}
                  isFocused={isFocused.expiryDate}
                  value={formData.expiryDate}
                  prefix={
                    <img src="/assets/paymet/iconDate.svg" alt="iconData" />
                  }
                  style={{ borderRadius: "10px", height: 44 }}
                />
              </Form.Item>
            </div>
          </div>
          <div className="flex flex-col md:w-[49%]">
            <label className=" font-interSemi">{t("cvv")}</label>
            <div className="mt-3">
              <Form.Item name="cvvCode" rules={[yupSync]}>
                <FocusInput
                  fieldName="cvv"
                  placeHolder={t("cvv")}
                  onChange={handleChange}
                  setIsFocused={setIsFocused}
                  isFocused={isFocused.cvv}
                  value={formData.cvvCode}
                  prefix={
                    <img src="/assets//paymet//iconkey.svg" alt="iconCard" />
                  }
                  style={{ borderRadius: "10px", height: 44 }}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <Space className="flex gap-5 justify-end mt-20 ">
          <div className="flex gap-7">
            <button className="text-info font-interSemi text-[16px] bg-white">
              {t("cancel")}
            </button>

            <Button
              style={{
                width: 130,
                height: 44,
                borderRadius: "10px",
                color: "white",
                font: "interSemi",
                background: "#000",
              }}
              htmlType="submit"
              className="bg-[#000] font-interSemi rounded-lg text-white px-12 py-3"
            >
              {t("add")}
            </Button>
          </div>
        </Space>
        <Link href={`${PageRoute.Payment}/update-payment`}>
          <button className="text-red-400">click me</button>
        </Link>
      </Form>
    </>
  );
};

export default Credit;
