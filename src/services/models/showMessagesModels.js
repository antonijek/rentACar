import Message from "../../components/message/Message";

export const showErrorsMessage = (data, duration) => {
  if (typeof data === "object" && data !== null) {
    const errors = data;

    const errorMessages = [];
    for (const field in errors) {
      if (errors.hasOwnProperty(field)) {
        const messages = errors[field];
        errorMessages.push(...messages);
      }
    }
    for (const errorMessage of errorMessages) {
      console.log(errorMessage);
      Message({ type: "error", content: errorMessage, duration: duration });
    }
  } else if (typeof data === "string") {
    Message({ type: "error", content: data, duration: duration });
  } else {
    Message({ type: "error", content: data, duration: duration });
  }
};

export const showSuccessMessage = (content, duration) => {
  return Message({
    type: "success",
    content: content,
    duration: duration,
  });
};
