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

  console.log(data);
  console.log(countries);

  const schema = yup.object({
    first_name: yup
      .string()
      .required("Field is required!")
      .matches(/^[A-Za-z\s]+$/, "Field cannot contain numbers")
      .min(3, "Field cannot be less than 3 characters long!")
      .max(20, "Field cannot be more than 20 characters long!"),
    last_name: yup
      .string()
      .required("Field is required!")
      .matches(/^[A-Za-z\s]+$/, "Field cannot contain numbers")
      .min(3, "Field cannot be less than 3 characters long!")
      .max(20, "Field cannot be more than 20 characters long!"),
    country_id: yup.string(),
    phone_number: yup
      .string()
      .required("Field is required!")
      .matches(/^[\d()+-]+$/, "Invalid phone number format")
      .min(10, "Field must be at least 10 digits long")
      .max(15, "Field cannot be more than 15 digits long"),
    email: yup
      .string()
      .required("Field is required!")
      .email("Invalid email format"),
    note: yup
      .string()
      .max(100, "Field cannot be more than 100 characters long!")
      .min(10, "Field must be at least 10 characters long"), // Minimum length for note
    passport_number: yup
      .string()
      .required("Field is required!")
      .min(6, "Field must be at least 6 characters long") // Minimum length for passport number
      .max(20, "Field cannot be more than 20 characters long"), // Maximum length for passport number
  });

  const getCountriesData = async () => {
    try {
      const res = await getAllCountries();
      setCountries(res);
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
      showErrorsMessage(err.response.data.errors, 5);
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

      if (payload.country_id) {
        payload.country_id = Number(payload.country_id);
      }

      edit(payload, data.id);
    } else {
      if (formData.country_id) {
        formData.country_id = Number(formData.country_id);
      }

      addNew(formData);
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
