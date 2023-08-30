import { message } from "antd";

const Message = ({ type, content, duration, onClose }) => {
  return message[type](content, duration, onClose);
};

export default Message;
