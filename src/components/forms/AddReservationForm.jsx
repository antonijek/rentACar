import React, { useEffect } from "react";
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

const AddReservationForm = ({
  data,
  navigatePage,
  disabled = "",
  clients,
  cities,
  addReservation,
}) => {
  const { t } = useTranslation();

  const schema = yup.object({
    customer_id: yup.string().required(t("fieldRequired")),
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
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      customer_id: "",
      date_from: moment().format("YYYY-MM-DD"),
      date_to: moment().add(7, "days").format("YYYY-MM-DD"),
      pickup_location: "",
      drop_off_location: "",
      price: "",
    },
  });

  const dateFrom = watch("date_from");
  const dateTo = watch("date_to");

  useEffect(() => {
    if (dateFrom && dateTo) {
      const startDate = moment(dateFrom);
      const endDate = moment(dateTo);
      const timeDifference = endDate.diff(startDate, "days");
      setValue("price", timeDifference * data.daily_rate);
    }
  }, [dateFrom, dateTo]);

  useEffect(() => {
    if (dateFrom && dateTo && moment(dateTo).isBefore(dateFrom)) {
      setValue("date_to", dateFrom);
    }
  }, [dateFrom, dateTo]);

  const onSubmit = (formData) => {
    formData.vehicle_id = data.id;
    formData.date_from = moment(formData.date_from).format("YYYY-MM-DD");
    formData.date_to = moment(formData.date_to).format("YYYY-MM-DD");
    addReservation(formData);
    navigatePage();
  };

  return (
    <div>
      <div className={classes["vehicle-data"]}>
        <h3 className={classes["vehicle-title"]}>{t("vehicle")}</h3>
        <p>{`${t("vehicleType")}: ${data.type}`}</p>
        <p>{` ${t("licensePlate")}: ${data.plate_number}`}</p>
        <p>{` ${t("numberOfSeats")}: ${data.number_of_seats}`}</p>
        <p>{`${t("rentalPricePerDay")}: ${data.daily_rate}`} </p>
        <p>{` ${t("yearOfManufacture")}: ${data.production_year}`}</p>
      </div>

      <form
        className={classes["my-form"]}
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <Select
          className={classes["select"]}
          label={t("client")}
          name="customer_id"
          control={control}
          error={errors.customer_id?.message}
          disabled={disabled}
          options={clients}
        />
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
          min={dateFrom}
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

export default AddReservationForm;
