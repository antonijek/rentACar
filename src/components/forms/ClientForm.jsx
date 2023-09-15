import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../input/Input";
import SubmitButton from "../buttons/submitButton/SubmitButton";
import Select from "../select/Select";
import TextArea from "../TextArea";
import { useTranslation } from "react-i18next";
import classes from "./form.module.scss";
import style from "../input/input.module.scss";

const ClientForm = ({
  data,
  disabled = "",
  countries,
  addNew,
  edit,
  navigateToPage = () => {},
}) => {
  const { t } = useTranslation();

  const schema = yup.object({
    first_name: yup
      .string()
      .required(t("firstNameRequired"))
      .matches(/^[A-Za-z\s]+$/, t("firstNameNoNumbers"))
      .min(3, t("firstNameMinLength"))
      .max(20, t("firstNameMaxLength")),
    last_name: yup
      .string()
      .required(t("lastNameRequired"))
      .matches(/^[A-Za-z\s]+$/, t("lastNameNoNumbers"))
      .min(3, t("lastNameMinLength"))
      .max(20, t("lastNameMaxLength")),
    country_id: yup.string().required(t("countryIdRequired")),
    phone_number: yup
      .string()
      .required(t("phoneNumberRequired"))
      .matches(/^[\d\s()+-]+$/, t("phoneNumberInvalid"))
      .min(10, t("phoneNumberMinLength"))
      .max(15, t("phoneNumberMaxLength")),
    email: yup.string().required(t("emailRequired")).email(t("emailInvalid")),
    note: yup.string().max(100, t("noteMaxLength")).min(10, t("noteMinLength")),
    passport_number: yup
      .string()
      .required(t("passportNumberRequired"))
      .matches(/^[a-zA-Z0-9]+$/, t("passportNumberAlphanumeric"))
      .min(6, t("passportNumberMinLength"))
      .max(20, t("passportNumberMaxLength")),
  });

  const {
    reset,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: "",
      last_name: "",
      country_id: "",
      phone_number: "",
      email: "",
      note: "",
      passport_number: "",
    },
  });

  useEffect(() => {
    reset();
    if (data?.first_name) {
      setValue("first_name", data.first_name);
      setValue("last_name", data.last_name);
      setValue("country_id", data?.country?.id);
      setValue("phone_number", data.phone_number);
      setValue("email", data.email);
      setValue("note", data.note);
      setValue("passport_number", data.passport_number);
    }
  }, [data]);

  const onSubmit = async (formData) => {
    const payload = {};

    if (data) {
      for (const key in formData) {
        if (formData[key] !== data[key]) {
          payload[key] = formData[key];
        }
      }

      if (payload.country_id) {
        payload.country_id = Number(payload.country_id);
      }

      edit(payload, data.id);
    } else {
      if (formData.country_id) {
        formData.country_id = Number(formData.country_id);
      }

      await addNew(formData);
      navigateToPage("clients");
    }
  };

  return (
    <div>
      <form
        className={classes["my-form"]}
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <Input
          className={style["my-input"]}
          label={t("firstName")}
          name="first_name"
          control={control}
          error={errors?.first_name?.message}
          disabled={disabled}
        />
        <Input
          className={style["my-input"]}
          label={t("lastName")}
          name="last_name"
          control={control}
          error={errors?.last_name?.message}
          disabled={disabled}
        />
        <Select
          label={t("selectCountry")}
          options={countries}
          name="country_id"
          control={control}
          error={errors?.country_id?.message}
          className={style["my-input"]}
          disabled={disabled}
        />

        <Input
          className={style["my-input"]}
          label={t("phoneNumber")}
          name="phone_number"
          control={control}
          error={errors?.phone_number?.message}
          disabled={disabled}
        />
        <Input
          className={style["my-input"]}
          label={t("email")}
          name="email"
          control={control}
          error={errors?.email?.message}
          disabled={data?.first_name}
        />
        <Input
          className={style["my-input"]}
          label={t("passportNumber")}
          name="passport_number"
          control={control}
          error={errors?.passport_number?.message}
          disabled={data?.first_name}
        />
        <TextArea
          className={style["my-input"]}
          label={t("note")}
          name="note"
          control={control}
          error={errors?.note?.message}
          disabled={disabled}
        />

        <SubmitButton
          label={t("submit")}
          className={style["my-input"]}
          disabled={disabled}
        />
      </form>
    </div>
  );
};

export default ClientForm;
