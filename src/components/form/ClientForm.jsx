import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputWithController from "../input/Input";
import { useParams } from "react-router-dom";
import classes from "./clientForm.module.scss";
import style from "../input/input.module.scss";
import SubmitButton from "../buttons/submitButton/SubmitButton";
import Select from "../select/Select";
import { addNewUser } from "../../services/userServices";
import { getAllCountries } from "../../services/countryServices";
import { useModal } from "../../context/ModalContext";

const ClientForm = ({ data, setClients }) => {
  const [countries, setCountries] = useState([]);
  const modal = useModal();

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
    notes: yup
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
      notes: data?.notes || "",
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
      setValue("notes", data.notes);
      setValue("passport_number", data.passport_number);
    }
  }, [data]);

  const addNew = async (data) => {
    modal.setSpiner(true);
    try {
      const res = await addNewUser(data);
      setClients(res);
      modal.close();
      modal.setSpiner(false);
    } catch (err) {
      console.log(err);
      modal.setSpiner(false);
    }
  };

  const onSubmit = async (formData) => {
    addNew(formData);
  };

  return (
    <div>
      <form
        className={classes["my-form"]}
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <InputWithController
          className={style["my-input"]}
          label="First Name"
          name="first_name"
          control={control}
          error={errors?.first_name?.message}
        />
        <InputWithController
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

        <InputWithController
          className={style["my-input"]}
          label="Phone Number"
          name="phone_number"
          control={control}
          error={errors?.phone_number?.message}
        />
        <InputWithController
          className={style["my-input"]}
          label="Email"
          name="email"
          control={control}
          error={errors?.email?.message}
        />
        <InputWithController
          className={style["my-input"]}
          label="Notes"
          name="notes"
          control={control}
          error={errors?.notes?.message}
        />
        <InputWithController
          className={style["my-input"]}
          label="Passport Number"
          name="passport_number"
          control={control}
          error={errors?.passport_number?.message}
        />

        <SubmitButton label="Submit" className={style["my-input"]} />
      </form>
    </div>
  );
};

export default ClientForm;
