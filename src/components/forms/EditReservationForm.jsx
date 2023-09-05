import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../input/Input";
import Select from "../select/Select";
import SubmitButton from "../buttons/submitButton/SubmitButton";

import {
  addNewReservation,
  editReservation,
  getReservations,
} from "../../services/reservationServices";
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

const EditReservationForm = ({ data, setReservations, disabled = "" }) => {
  const [cities, setCities] = useState([]);
  const [clients, setClients] = useState([]);
  const modal = useModal();
  const { t } = useTranslation();

  const schema = yup.object({
    date_from: yup.date().required(t("fieldRequired")),
    date_to: yup
      .date()
      .required(t("fieldRequired"))
      .min(yup.ref("date_from"), t("endDateMin")),
    pickup_location_id: yup.string().required(t("fieldRequired")),
    drop_off_location_id: yup.string().required(t("fieldRequired")),
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
      date_from: new Date().toISOString().split("T")[0],
      date_to: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      pickup_location_id: "",
      drop_off_location_id: "",
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
  /*  const getClients = async () => {
    try {
      const res = await getUsersForSelect();

      setClients(res);
    } catch (err) {
      console.log(err);
    }
  }; */

  useEffect(() => {
    if (data.id) {
      const dateFrom = data.start_date ? new Date(data.start_date) : null;
      let dateTo = "";
      if (data.date_to) {
        dateTo = new Date(data.date_to);
      }
      const formatDate = (date) => {
        if (!date) return "";
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      reset({
        pickup_location_id: data?.pickup_location_id,
        date_from: formatDate(dateFrom),
        date_to: formatDate(dateTo),
        drop_off_location_id: data?.drop_off_location_id,
        price: data?.price,
      });

      getCities();
      //getClients();
    }
  }, [data]);

  const edit = async (formData, id) => {
    modal.setSpiner(true);
    try {
      const res = await editReservation(formData, id);
      showSuccessMessage(t("successEdit"), 3);
      const reservations = await getReservations();
      setReservations(reservations);
      reset();
      modal.close();
      modal.setSpiner(false);
    } catch (err) {
      showErrorsMessage(err.response.data.errors, 5);
      modal.setSpiner(false);
    }
  };

  const onSubmit = async (formData) => {
    /* formData.date_from = new Date(formData.date_from)
      .toISOString()
      .split("T")[0];
    formData.date_to = new Date(formData.date_to).toISOString().split("T")[0];
    formData.pickup_location_id = Number(formData.pickup_location_id);
    formData.drop_off_location_id = Number(formData.drop_off_location_id); */
    formData = { drop_off_location: 2 };
    edit(formData, data.id);
  };
  const dateFrom = watch("date_from");
  const dateTo = watch("date_to");
  useEffect(() => {
    if (dateFrom && dateTo) {
      const startDate = new Date(dateFrom);
      const endDate = new Date(dateTo);
      const timeDifference = endDate.getTime() - startDate.getTime();
      const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

      setValue("price", numberOfDays * data.vehicle.daily_rate);
    }
  }, [dateFrom, dateTo]);

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
        <div>
          <h3 className={classes["client-title"]}>{t("client")}</h3>
          <p>{`${t("firstName")}: ${data.customer.first_name}`}</p>
          <p>{` ${t("lastName")}: ${data.customer.last_name}`}</p>
          <p>{` ${t("passportNumber")}: ${data.customer.passport_number}`}</p>
          <p>{`${t("phoneNumber")}: ${data.customer.phone_number}`} </p>
          <p>{` ${t("email")}: ${data.customer.email}`}</p>
        </div>
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
          name="pickup_location_id"
          control={control}
          error={errors.pickup_location?.message}
          disabled={disabled}
          options={cities}
        />
        <Select
          className={style["my-input"]}
          label={t("dropOffLocation")}
          name="drop_off_location_id"
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
