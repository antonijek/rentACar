import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../input/Input";
import SubmitButton from "../buttons/submitButton/SubmitButton";
import TextArea from "../TextArea";
import {
  addNewVehicle,
  editVehicle,
  getVehicles,
} from "../../services/vehicleServices";
import { useModal } from "../../context/ModalContext";
import { useTranslation } from "react-i18next";
import {
  showErrorsMessage,
  showSuccessMessage,
} from "../../services/models/showMessagesModels";
import classes from "./clientForm.module.scss";
import style from "../input/input.module.scss";

const VehicleForm = ({ data, setVehicles, disabled = "" }) => {
  const modal = useModal();
  const { t } = useTranslation();

  const schema = yup.object({
    plate_number: yup
      .string()
      .required(t("licensePlateRequired"))
      .matches(/^[A-Za-z0-9\s-]+$/, t("licensePlateInvalid"))
      .min(5, t("licensePlateMinLength"))
      .max(15, t("licensePlateMaxLength")),
    production_year: yup
      .number()
      .required(t("yearRequired"))
      .typeError(t("yearTypeError"))
      .min(1900, t("yearMinValue"))
      .max(new Date().getFullYear(), t("yearMaxValue")),
    type: yup
      .string()
      .required(t("vehicleTypeRequired"))
      .max(50, t("vehicleTypeMaxLength")),
    number_of_seats: yup
      .number()
      .required(t("seatsRequired"))
      .typeError(t("seatsTypeError"))
      .min(1, t("seatsMinValue"))
      .max(10, t("seatsMaxValue")),
    daily_rate: yup
      .number()
      .required(t("rentalPriceRequired"))
      .typeError(t("dailyRateTypeError"))
      .min(0, t("rentalPriceMinValue"))
      .max(1000, t("rentalPriceMaxValue")),
    note: yup
      .string()
      .required(t("fieldRequired"))
      .max(100, t("noteMaxLength")),
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
      plate_number: "",
      production_year: "",
      type: "",
      number_of_seats: "",
      daily_rate: "",
      note: "",
    },
  });

  useEffect(() => {
    reset();
    if (data?.plate_number) {
      setValue("plate_number", data.plate_number);
      setValue("production_year", data.production_year);
      setValue("type", data.type);
      setValue("number_of_seats", data.number_of_seats);
      setValue("daily_rate", data.daily_rate);
      setValue("note", data.note);
    }
  }, [data]);

  const addNew = async (formData) => {
    modal.setSpiner(true);
    try {
      const res = await addNewVehicle(formData);
      showSuccessMessage(t("successAdd", 3));
      const vehicles = await getVehicles();
      setVehicles(vehicles);
      reset();
      modal.close();
      modal.setSpiner(false);
    } catch (err) {
      modal.setSpiner(false);
      showErrorsMessage(err.response.data.errors, 5);
    }
  };

  const edit = async (formData, plate_number) => {
    modal.setSpiner(true);
    try {
      const res = await editVehicle(formData, plate_number);
      showSuccessMessage(t("successEdit"), 3);
      const vehicles = await getVehicles();
      setVehicles(vehicles);
      reset();
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

      edit(payload, data.id);
    } else {
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
          label={t("licensePlate")}
          name="plate_number"
          control={control}
          error={errors.plate_number?.message}
          disabled={disabled}
        />
        <Input
          className={style["my-input"]}
          label={t("yearOfManufacture")}
          name="production_year"
          control={control}
          error={errors.production_year?.message}
          type="number"
          disabled={disabled}
        />
        <Input
          className={style["my-input"]}
          label={t("vehicleType")}
          name="type"
          control={control}
          error={errors.type?.message}
          disabled={disabled}
        />
        <Input
          className={style["my-input"]}
          label={t("numberOfSeats")}
          name="number_of_seats"
          control={control}
          error={errors.number_of_seats?.message}
          type="number"
          disabled={disabled}
        />
        <Input
          className={style["my-input"]}
          label={t("rentalPricePerDay")}
          name="daily_rate"
          control={control}
          error={errors.daily_rate?.message}
          type="number"
          disabled={disabled}
        />
        <TextArea
          className={style["my-input"]}
          label={t("note")}
          name="note"
          control={control}
          error={errors.note?.message}
          rows={4}
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

export default VehicleForm;
