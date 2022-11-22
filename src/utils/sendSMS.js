import axios from "axios";

const sendSMS = (params) => {
  console.log("sending sms", params);
  axios
    .get("https://api.sema.co.tz/api/SendSMS", {
      params: params,
    })
    .then((response) => {
      const status = response.data["status"];
      if (status === "S") {
        // notyf.open({
        //   type: "success",
        //   message: "SMS submitted succesfully!",
        //   duration: 10000,
        //   ripple: true,
        //   dismissible: true,
        //   position: { x: "center", y: "top" },
        // });
        // GetDeliveryReport(response.data["message_id"]);
        axios
          .get("https://api.sema.co.tz/api/GetDeliveryStatus", {
            params: {
              api_id: "API213160153",
              api_password: "ForDemoClient123",
              message_id: response.data["message_id"],
            },
          })
          .then((response) => {
            const deliveryData = { ...response.data };
            let notif_message = "Hi";
            let notif_type = "danger";
            switch (deliveryData.DLRStatus) {
              case "Failed":
                notif_message =
                  "[FAILED] The SMS to " +
                  deliveryData.PhoneNumber +
                  " at " +
                  deliveryData.SentDateUTC +
                  " was not delivered due to " +
                  deliveryData.ErrorDescription;
                notif_type = "warning";
                break;
              case "Delivered":
                notif_message =
                  "[SUCCESS] The SMS to " +
                  deliveryData.PhoneNumber +
                  " at " +
                  deliveryData.SentDateUTC +
                  " was delivered successfully whith client cost " +
                  deliveryData.ClientCost;
                notif_type = "success";
                break;
              default:
                break;
            }
            // notyf.open({
            //   type: notif_type,
            //   message: notif_message,
            //   duration: 10000,
            //   ripple: true,
            //   dismissible: true,
            //   position: { x: "center", y: "top" },
            // });
          })
          .catch();
        //end
      } else if (status === "F") {
        // notyf.open({
        //   type: "danger",
        //   message: "SMS failed to submit! Check network connection",
        //   duration: 10000,
        //   ripple: true,
        //   dismissible: true,
        //   position: { x: "center", y: "top" },
        // });
        // notyf.close();
      }
    })
    .catch((err) => {
      console.log(err);
      if (err.message === "Network Error") {
        // notyf.open({
        //   type: "warning",
        //   message: "Network Error! Please check your Internet Connection",
        //   duration: 10000,
        //   ripple: true,
        //   dismissible: true,
        //   position: { x: "center", y: "top" },
        // });
      } else {
        // notyf.open({
        //   type: "warning",
        //   message: "Message not sent! from catch",
        //   duration: 10000,
        //   ripple: true,
        //   dismissible: true,
        //   position: { x: "center", y: "top" },
        // });
      }
    });
};

export default sendSMS;
