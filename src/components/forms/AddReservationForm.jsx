import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../input/Input";
import Select from "../select/Select";
import SubmitButton from "../buttons/submitButton/SubmitButton";
import { addNewReservation } from "../../services/reservationServices";
import { useModal } from "../../context/ModalContext";
import { useTranslation } from "react-i18next";
import {
  showErrorsMessage,
  showSuccessMessage,
} from "../../services/models/showMessagesModels";
import classes from "./form.module.scss";
import style from "../input/input.module.scss";
import { getAllCities } from "../../services/cityServices";
import { getUsersForSelect } from "../../services/userServices";

const calculateMinEndDate = () => {
  const today = new Date();
  const minEndDate = new Date(today);
  minEndDate.setDate(today.getDate() + 7);
  return minEndDate.toISOString().split("T")[0];
};

const AddReservationForm = ({ data, navigatePage, disabled = "" }) => {
  const [cities, setCities] = useState([]);
  const [clients, setClients] = useState([]);
  const modal = useModal();
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
      date_from: new Date().toISOString().split("T")[0],
      date_to: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      pickup_location: "",
      drop_off_location: "",
      price: "",
    },
  });

  const getCities = async () => {
    try {
      const res = await getAllCities();
      setCities(res);
    } catch (err) {
      console.log(err);
    }
  };
  const getClients = async () => {
    try {
      const res = await getUsersForSelect();

      setClients(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCities();
    getClients();
    reset();
  }, []);

  const addNew = async (formData) => {
    modal.setSpiner(true);
    try {
      const res = await addNewReservation(formData);
      showSuccessMessage(t("successAdd", 3));
      modal.setSpiner(false);
      modal.close();
      reset();
      navigatePage();
    } catch (err) {
      console.log(err);
      showErrorsMessage(err.response.data.errors, 5);
      modal.setSpiner(false);
    }
  };
  const dateFrom = watch("date_from");
  const dateTo = watch("date_to");
  useEffect(() => {
    if (dateFrom && dateTo) {
      const startDate = new Date(dateFrom);
      const endDate = new Date(dateTo);
      const timeDifference = endDate.getTime() - startDate.getTime();
      const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

      setValue("price", numberOfDays * data.daily_rate);
    }
  }, [dateFrom, dateTo]);

  const onSubmit = async (formData) => {
    formData.vehicle_id = data.id;
    formData.date_from = new Date(formData.date_from)
      .toISOString()
      .split("T")[0];
    formData.date_to = new Date(formData.date_to).toISOString().split("T")[0];
    addNew(formData);
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
          className={style["my-input"]}
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
          min={new Date().toISOString().split("T")[0]}
        />
        <Input
          className={style["my-input"]}
          label={t("endDate")}
          name="date_to"
          control={control}
          error={errors.date_to?.message}
          type="date"
          disabled={disabled}
          min={calculateMinEndDate()}
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
