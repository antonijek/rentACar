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
  BoxPlotTwoTone,
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
          <span>
            <CarOutlined
              style={{
                color: "var(--primary-color)",
                fontSize: "20px",
                marginRight: "10px",
              }}
            />
          </span>
          {`${t("vehicle")}: ${type}`}
        </p>
        <p>
          {" "}
          <span>
            <BoxPlotTwoTone
              style={{
                color: "var(--primary-color)",
                fontSize: "24px",
                marginRight: "10px",
              }}
            />
          </span>
          {`${t("licensePlate")}: ${plate}`}
        </p>
        <p>
          {" "}
          <span>
            <ScheduleTwoTone
              style={{
                color: "var(--primary-color)",
                fontSize: "24px",
                marginRight: "10px",
              }}
            />
          </span>
          {`${t("startDate")}: ${dateFrom}`}
        </p>
        <p>
          <span>
            <CarryOutTwoTone
              style={{
                color: "var(--primary-color)",
                fontSize: "20px",
                marginRight: "10px",
              }}
            />
          </span>
          {`${t("endDate")}: ${dateTo}`}
        </p>
        <p>
          {" "}
          <span>
            <PushpinTwoTone
              style={{
                color: "var(--primary-color)",
                fontSize: "24px",
                marginRight: "10px",
              }}
            />
          </span>
          {`${t("pickupLocation")}: ${location1}`}
        </p>
        <p>
          <span>
            <PushpinTwoTone
              style={{
                color: "var(--primary-color)",
                fontSize: "24px",
                marginRight: "10px",
              }}
            />
          </span>
          {`${t("returnLocation")}: ${location2}`}
        </p>
        <p>
          {" "}
          <span>
            <EuroCircleTwoTone
              style={{
                color: "var(--primary-color)",
                fontSize: "20px",
                marginRight: "10px",
              }}
            />
          </span>
          {`${t("price")}: ${price} EUR`}
        </p>
      </AntdCard>
    </div>
  );
};

export default Card;
