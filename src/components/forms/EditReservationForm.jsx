import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../input/Input";
import Select from "../select/Select";
import SubmitButton from "../buttons/submitButton/SubmitButton";
import moment from "moment";
import { useTranslation } from "react-i18next";
import classes from "./form.module.scss";
import style from "../input/input.module.scss";

const EditReservationForm = ({
  data,
  disabled = "",
  customer = true,
  cities,
  editingReservation,
}) => {
  console.log(cities);
  const { t } = useTranslation();
  console.log(data);
  const schema = yup.object({
    date_from: yup.date().required(t("fieldRequired")),
    date_to: yup
      .date()
      .required(t("fieldRequired"))
      .min(yup.ref("date_from"), t("endDateMin")),
    pickup_location: yup.string().required(t("fieldRequired")),
    drop_off_location: yup.string().required(t("fieldRequired")),
    price: yup
      .number()
      .required(t("fieldRequired"))
      .typeError(t("totalCostTypeError"))
      .min(0, t("totalCostMinValue")),
  });

  const {
    reset,
    setValue,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      date_from: moment().format("YYYY-MM-DD"),
      date_to: moment() + 7 * 24 * 60 * 60 * 1000,
      pickup_location: "",
      drop_off_location: "",
      price: "",
    },
  });

  const initialDateFrom = data.date_from ? moment(data.date_from) : null;
  const initialDateTo = data.date_to ? moment(data.date_to) : null;

  useEffect(() => {
    if (data.id) {
      console.log(data);
      setValue("pickup_location", data?.pickup_location_id);
      setValue("drop_off_location", data?.drop_off_location_id);
      setValue(
        "date_from",
        initialDateFrom ? initialDateFrom.format("YYYY-MM-DD") : ""
      );
      setValue(
        "date_to",
        initialDateTo ? initialDateTo.format("YYYY-MM-DD") : ""
      );
    }
  }, [data]);

  const onSubmit = async (formData) => {
    formData.date_from = moment(formData.date_from).format("YYYY-MM-DD");
    formData.date_to = moment(formData.date_to).format("YYYY-MM-DD");
    formData.pickup_location = Number(formData.pickup_location);
    formData.drop_off_location = Number(formData.drop_off_location);
    formData.vehicle_id = data.vehicle.id;
    formData.customer_id = data.customer.id;
    editingReservation(formData, data.id);
  };

  const dateFrom = watch("date_from");
  const dateTo = watch("date_to");
  useEffect(() => {
    if (dateFrom && dateTo) {
      const startDate = moment(dateFrom);
      const endDate = moment(dateTo);
      const timeDifference = endDate.diff(startDate, "days");

      setValue("price", timeDifference * data.vehicle.daily_rate);
    }
  }, [dateFrom, dateTo]);

  useEffect(() => {
    if (!dateTo || moment(dateTo).isBefore(dateFrom)) {
      const nextDay = moment(dateFrom).add(1, "day");
      setValue("date_to", nextDay.format("YYYY-MM-DD"));
    }
  }, [dateFrom, dateTo, setValue]);

  return (
    <div>
      <div className={classes["vehicle-and-client-data"]}>
        <div>
          <h3 className={classes["vehicle-title"]}>{t("vehicle")}</h3>
          <p>{`${t("vehicleType")}: ${data.vehicle.type}`}</p>
          <p>{` ${t("licensePlate")}: ${data.vehicle.plate_number}`}</p>
          <p>{` ${t("numberOfSeats")}: ${data.vehicle.number_of_seats}`}</p>
          <p>{`${t("rentalPricePerDay")}: ${data.vehicle.daily_rate}`} </p>
          <p>{` ${t("yearOfManufacture")}: ${data.vehicle.production_year}`}</p>
        </div>
        {customer && (
          <div>
            <h3 className={classes["client-title"]}>{t("client")}</h3>
            <p>{`${t("firstName")}: ${data.customer.first_name}`}</p>
            <p>{` ${t("lastName")}: ${data.customer.last_name}`}</p>
            <p>{` ${t("passportNumber")}: ${data.customer.passport_number}`}</p>
            <p>{`${t("phoneNumber")}: ${data.customer.phone_number}`} </p>
            <p>{` ${t("email")}: ${data.customer.email}`}</p>
          </div>
        )}
      </div>

      <form
        className={classes["my-form"]}
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <Input
          className={style["my-input"]}
          label={t("startDate")}
          name="date_from"
          control={control}
          error={errors.date_from?.message}
          type="date"
          disabled={disabled}
          min={moment().format("YYYY-MM-DD")}
        />
        <Input
          className={style["my-input"]}
          label={t("endDate")}
          name="date_to"
          control={control}
          error={errors.date_to?.message}
          type="date"
          disabled={disabled}
          min={initialDateFrom?.format("YYYY-MM-DD")}
        />
        <Select
          className={style["my-input"]}
          label={t("pickupLocation")}
          name="pickup_location"
          control={control}
          error={errors.pickup_location?.message}
          disabled={disabled}
          options={cities}
        />
        <Select
          className={style["my-input"]}
          label={t("dropOffLocation")}
          name="drop_off_location"
          control={control}
          error={errors.drop_off_location?.message}
          disabled={disabled}
          options={cities}
        />
        <Input
          className={style["my-input"]}
          label={t("totalCost")}
          name="price"
          control={control}
          error={errors.price?.message}
          type="number"
          disabled={true}
        />
        <SubmitButton
          label={t("submit")}
          className={style["my-input"]}
          disabled={disabled}
          type="submit"
        />
      </form>
    </div>
  );
};

export default EditReservationForm;
