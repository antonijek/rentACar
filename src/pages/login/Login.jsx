import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SubmitButton from "../../components/buttons/submitButton/SubmitButton";
import classes from "./login.module.scss";
import Input from "../../components/input/Input";
import { login } from "../../services/authServices";
import { set } from "../../services/storageServices";
import { storageKeys } from "../../config/config";
import { useNavigate } from "react-router-dom";
import { userData } from "../../context/UserContext";
import Spiner from "../../components/spiner/Spiner";
import { showErrorsMessage } from "../../services/models/showMessagesModels";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { getUser } = userData();

  const schema = yup.object({
    email: yup
      .string()
      .required("Field is required!")
      .email("Invalid email format"),

    password: yup
      .string()
      .required("Field is required!")
      .matches(
        /^[a-zA-Z0-9!#%&]{4,12}$/,
        "Password must be 4-12 characters and can include letters, numbers, and special characters ! # % &"
      ),
  });

  const {
    reset,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const res = await login(formData.email, formData.password);
      set(storageKeys.USER, res.access_token);
      await getUser();
      setIsLoading(false);
      navigate("/");
    } catch (err) {
      if (err.response) {
        showErrorsMessage(err.response.data.message, 2);
      }
      setIsLoading(false);
    }
  };

  return (
    <div className={classes["login-container"]}>
      <form
        className={classes["my-form"]}
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <h2 className={classes["title"]}>Login</h2>

        <Input
          className={classes["my-input"]}
          label="Email"
          name="email"
          control={control}
          error={errors?.email?.message}
          labelColor={classes["label-color"]}
        />

        <Input
          className={classes["my-input"]}
          label="Password"
          name="password"
          control={control}
          error={errors?.password?.message}
          labelColor={classes["label-color"]}
          type="password"
        />

        <SubmitButton label="Submit" className={classes["my-input"]} />
      </form>
      {isLoading && <Spiner />}
    </div>
  );
};

export default Login;
