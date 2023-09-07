// Card.js
import React from "react";
import { Card as AntdCard } from "antd";
import { useTranslation } from "react-i18next";
import {
  CarOutlined,
  ScheduleTwoTone,
  CheckCircleTwoTone,
  CarryOutTwoTone,
  PushpinTwoTone,
  EuroCircleTwoTone,
} from "@ant-design/icons";
import classes from "./card.module.scss";

const Card = ({
  type,
  plate,
  dateFrom,
  dateTo,
  location1,
  location2,
  price,
  className,
}) => {
  const { t } = useTranslation();
  return (
    <div className={className}>
      <AntdCard
        title={
          <h3
            style={{
              color: "var(--primary-color)",
              borderBottom: "2px solid var(--primary-color)",
            }}
          >
            {t("confirmed")}
            <span>
              <CheckCircleTwoTone
                style={{
                  color: "var(--primary-color)",
                  fontSize: "24px",
                  marginLeft: "10px",
                }}
              />
            </span>
          </h3>
        }
        bordered={true}
        style={{ color: "#63a0d9" }}
      >
        <p>
          {`${t("vehicle")} : ${type}`}{" "}
          <span>
            <CarOutlined
              style={{
                color: "var(--primary-color)",
                fontSize: "24px",
                marginLeft: "10px",
              }}
            />
          </span>
        </p>
        <p>{`${t("licensePlate")} : ${plate}`}</p>
        <p>
          {`${t("startDate")} : ${dateFrom}`}
          <span>
            <ScheduleTwoTone
              style={{
                color: "var(--primary-color)",
                fontSize: "24px",
                marginLeft: "10px",
              }}
            />
          </span>
        </p>
        <p>
          {`${t("endDate")} : ${dateTo}`}
          <span>
            <CarryOutTwoTone
              style={{
                color: "var(--primary-color)",
                fontSize: "24px",
                marginLeft: "10px",
              }}
            />
          </span>
        </p>
        <p>
          {`${t("pickupLocation")} : ${location1}`}
          <span>
            <PushpinTwoTone
              style={{
                color: "var(--primary-color)",
                fontSize: "24px",
                marginLeft: "10px",
              }}
            />
          </span>
        </p>
        <p>
          {`${t("returnLocation")} : ${location2}`}
          <span>
            <PushpinTwoTone
              style={{
                color: "var(--primary-color)",
                fontSize: "24px",
                marginLeft: "10px",
              }}
            />
          </span>
        </p>
        <p>
          {`${t("price")} : ${price}`}
          <span>
            <EuroCircleTwoTone
              style={{
                color: "var(--primary-color)",
                fontSize: "24px",
                marginLeft: "10px",
              }}
            />
          </span>
        </p>
      </AntdCard>
    </div>
  );
};

export default Card;
