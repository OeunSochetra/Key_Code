import { RootState } from "@/redux/store";
import { Form, Input, InputNumber } from "antd";
import { CSSProperties, ReactNode } from "react";

import { useTranslation } from "react-i18next";
interface Props {
  isFocused: boolean;
  prefix?: ReactNode;
  onChange?: (e: any) => void;
  setIsFocused: (e: any) => void;
  label?: string;
  value: string;
  placeHolder: string;
  fieldName: any;
  style?: CSSProperties;
  name?: string;
}
export default function FocusInput(props: Props) {
  const {
    isFocused,
    onChange,
    prefix,
    setIsFocused,
    label,
    value,
    placeHolder,
    fieldName,
    name,
    style = { height: 44, width: "100%" },
  } = props;
  const { t } = useTranslation();
  function handleOnBlur(fieldName: any) {
    if (value?.length > 0) {
      setIsFocused((prev: any) => ({
        ...prev,
        [fieldName]: true,
      }));
    } else {
      setIsFocused((prev: any) => ({
        ...prev,
        [fieldName]: false,
      }));
    }
  }
  function handleOnFocus(fieldName: any) {
    setIsFocused((prev: any) => ({
      ...prev,
      [fieldName]: true,
    }));
  }
  const handleWheel = (event: any) => {
    event.preventDefault();
  };
  const numberValidator = (_: any, value: any) => {
    const numberRegex = /^\d+$/;
    if (!numberRegex.test(value)) {
      return Promise.reject("Please enter a valid number");
    }
    return Promise.resolve();
  };
  return (
    <>
      <span
        className={`${
          isFocused
            ? "text-[12px] translate-y-[-17px] left-[15px] bg-white px-2"
            : " left-[42px]"
        } z-[10] absolute top-[10px] text-[#828282] pointer-events-none	  duration-500 `}
      >
        <div className="flex items-center justify-center">{t(placeHolder)}</div>
      </span>

      {placeHolder !== "password" && (
        <Input
          name={name}
          value={value}
          onChange={onChange}
          prefix={prefix}
          onBlur={() => handleOnBlur(fieldName)}
          onFocus={() => handleOnFocus(fieldName)}
          style={style}
        />
      )}
      {placeHolder == "password" && (
        <Input.Password
          prefix={prefix}
          value={value}
          onChange={onChange}
          onBlur={() => handleOnBlur(fieldName)}
          onFocus={() => handleOnFocus(fieldName)}
          style={{
            height: 44,
            width: "100%",
          }}
        />
      )}
    </>
  );
}
