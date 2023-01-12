import React from "react";
import StepIndicator from "../../components/UI-components/StepIndicator";
import OrderOverview from "../../components/OrderOverview";
import MobileOrderOverview from "../../components/MobileOrderOverview";
import { useMediaQuery } from "usehooks-ts";
import InputMask from "react-input-mask";
import { useRouter } from "next/router";
import { insertOrder } from "../../modules/db";

function step4(props) {
  //number pattern="[0-9+]{16,19}"
  // order overview responsiveness
  const matches = useMediaQuery("(min-width: 1100px)");
  // routing
  const router = useRouter();

  // BUTTONS - send reservation request & reroute
  async function confirm(e) {
    e.preventDefault();
    const request = await fetch("https://morning-mountain-4570.fly.dev/fullfill-reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: props.orderInfo.orderID }),
    });
    const response = await request.json();
    const message = response.message;

    const payload = {
      totalTickets: props.orderInfo.totalTickets,
      regTickets: props.orderInfo.regTickets,
      vipTickets: props.orderInfo.vipTickets,
      selectedArea: props.orderInfo.selectedArea,
      tentService: props.orderInfo.tentService,
      greenCamping: props.orderInfo.greenCamping,
      guestInfo: props.orderInfo.guests,
    };

    if (message === "Reservation completed") {
      router.push("/tickets/confirmation");
      const response = await insertOrder(payload);
      console.log("database response:", response);
    }
    if (message === "ID not found") {
      router.push("/tickets/timeout");
    }
  }

  // BUTTONS - go back to previous page
  function goBack() {
    router.push("/tickets/step3");
  }

  return (
    <form onSubmit={confirm}>
      <div className="order-container">
        <section className="order-interface">
          <StepIndicator step={4} />
          <h2>Payment information</h2>
          <h5>Please enter your payment information.</h5>
          <div className="payment-field">
            <h3>Credit Card Details</h3>
            <div className="payment-form-field">
              <div className="card-details">
                <label htmlFor="formName">
                  Name on card
                  <input id="formName" title="Must be a valid name" required pattern="[A-Za-z]{1,50}" aria-required="true" type="text" name="formName" placeholder="John Applebaum" />
                </label>

                <label htmlFor="formCardNo">
                  Card number
                  <InputMask
                    id="formCardNo"
                    inputmode="numeric"
                    mask="9999 9999 9999 9999"
                    maskChar={null}
                    title="Enter up to 16 digits card number"
                    required
                    aria-required="true"
                    type="tel"
                    name="formCardNo"
                    placeholder="1234 1234 1234 1234"
                    size="16"
                  />
                </label>

                <label htmlFor="formExpMonth">
                  Expiry date
                  <input required title="Enter a valid month" inputmode="numeric" placeholder="MM" type="tel" pattern="[0-9+]{2,2}" name="formExpMonth" id="formExpMonth" aria-required="true" size="2" minLength={2} maxLength={2} />
                </label>
                <label className="form-expiry" htmlFor="formExpYear">
                  <input required title="Enter a valid year" inputmode="numeric" placeholder="YY" type="tel" pattern="[0-9+]{2,2}" name="formExpYear" id="formExpYear" aria-required="true" size="2" minLength={2} maxLength={2} />
                </label>
                <label htmlFor="formCvc">
                  CVC number
                  <input required title="Enter the 3 digits at the back of your card" type="tel" name="formCvc" inputmode="numeric" aria-required="true" id="formCvc" pattern="[0-9+]{3,}" minLength={3} maxLength={3} placeholder="123" size="3" />
                </label>
              </div>

              <label htmlFor="formEmail">
                Email
                <input required type="email" pattern="[A-Za-z0-9._+-]+@[A-Za-z0-9 -]+\.[a-z]{2,}" name="formEmail" aria-required="true" id="formEmail" title="Enter a valid email address" placeholder="JohnApplebaum@gmail.com" />
              </label>

              <label htmlFor="formTelephone">
                Phone Number
                <InputMask id="formTelephone" inputmode="numeric" mask="99 99 99 99" maskChar={null} title="Must be a valid phone number" required aria-required="true" type="tel" name="formTelephone" placeholder="12 34 56 78" size="16" />
              </label>
            </div>
          </div>
        </section>
        {matches ? (
          <OrderOverview orderInfo={props.orderInfo} setOrderInfo={props.setOrderInfo} tentPrice={props.tentPrice} setUpPrice={props.setUpPrice} />
        ) : (
          <MobileOrderOverview orderInfo={props.orderInfo} tentPrice={props.tentPrice} setUpPrice={props.setUpPrice} />
        )}
        <div className="booking-steps-buttons">
          <button className="secondary" onClick={goBack}>
            Back
          </button>
          <button type="submit" className="primary" onSubmit={confirm}>
            Confirm payment →
          </button>
        </div>
      </div>
    </form>
  );
}

export default step4;
