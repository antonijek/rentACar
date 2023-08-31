import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../input/Input";
import { useParams } from "react-router-dom";
import SubmitButton from "../buttons/submitButton/SubmitButton";
import Select from "../select/Select";
import { addNewUser, editUser, getAllUsers } from "../../services/userServices";
import { getAllCountries } from "../../services/countryServices";
import TextArea from "../TextArea";
import { useModal } from "../../context/ModalContext";
import { useTranslation } from "react-i18next";
import {
  showErrorsMessage,
  showSuccessMessage,
} from "../../services/models/showMessagesModels";
import classes from "./clientForm.module.scss";
import style from "../input/input.module.scss";

const ClientForm = ({ data, setClients }) => {
  const [countries, setCountries] = useState([]);
  const modal = useModal();
  const { t } = useTranslation();

  const schema = yup.object({
    first_name: yup
      .string()
      .required("Field is required!")
      .min(3, "Field cannot be less than 3 characters long!")
      .max(20, "Field cannot be more than 20 characters long!"),
    last_name: yup
      .string()
      .required("Field is required!")
      .min(3, "Field cannot be less than 3 characters long!")
      .max(20, "Field cannot be more than 20 characters long!"),
    country_id: yup.string(),
    phone_number: yup.string().required("Field is required!"),
    email: yup
      .string()
      .required("Field is required!")
      .email("Invalid email format"),
    note: yup
      .string()
      .max(100, "Field cannot be more than 100 characters long!"),
    passport_number: yup.string().required("Field is required!"),
  });

  const { clientId } = useParams();

  const getCountriesData = async () => {
    try {
      const countries = await getAllCountries();
      setCountries(countries);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCountriesData();
  }, []);

  const {
    reset,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: data?.first_name || "",
      last_name: data?.last_name || "",
      country_id: data?.country_id,
      phone_number: data?.phone_number || "",
      email: data?.email || "",
      note: data?.note || "",
      passport_number: data?.passport_number || "",
    },
  });

  useEffect(() => {
    reset();
    if (data?.first_name) {
      setValue("first_name", data.first_name);
      setValue("last_name", data.last_name);
      setValue("country_id", data.country_id);
      setValue("phone_number", data.phone_number);
      setValue("email", data.email);
      setValue("note", data.note);
      setValue("passport_number", data.passport_number);
    }
  }, [data]);

  const addNew = async (data) => {
    modal.setSpiner(true);
    try {
      const res = await addNewUser(data);
      showSuccessMessage(t("successAdd", 3));
      const users = await getAllUsers();
      setClients(users);
      modal.close();
      modal.setSpiner(false);
    } catch (err) {
      modal.setSpiner(false);
    }
  };

  const edit = async (data, id) => {
    modal.setSpiner(true);
    try {
      const res = await editUser(data, id);
      showSuccessMessage(t("successEdit"), 3);
      const users = await getAllUsers();
      setClients(users);
      modal.close();
      modal.setSpiner(false);
    } catch (err) {
      showErrorsMessage(err.response.data.errors, 5);
      modal.setSpiner(false);
    }
  };

  const onSubmit = async (formData) => {
    const payload = {};

    if (data) {
      for (const key in formData) {
        if (formData[key] !== data[key]) {
          payload[key] = formData[key];
        }
      }
    }

    data?.first_name ? edit(payload, data.id) : addNew(formData);
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
          label="First Name"
          name="first_name"
          control={control}
          error={errors?.first_name?.message}
        />
        <Input
          className={style["my-input"]}
          label="Last Name"
          name="last_name"
          control={control}
          error={errors?.last_name?.message}
        />
        <Select
          label="Select Country"
          options={countries}
          name="country_id"
          control={control}
          error={errors?.country_id?.message}
          className={style["my-input"]}
        />

        <Input
          className={style["my-input"]}
          label="Phone Number"
          name="phone_number"
          control={control}
          error={errors?.phone_number?.message}
        />
        <Input
          className={style["my-input"]}
          label="Email"
          name="email"
          control={control}
          error={errors?.email?.message}
          disabled={data?.first_name}
        />
        <Input
          className={style["my-input"]}
          label="Passport Number"
          name="passport_number"
          control={control}
          error={errors?.passport_number?.message}
          disabled={data?.first_name}
        />
        <TextArea
          className={style["my-input"]}
          label="Notes"
          name="note"
          control={control}
          error={errors?.note?.message}
        />

        <SubmitButton label="Submit" className={style["my-input"]} />
      </form>
    </div>
  );
};

export default ClientForm;
