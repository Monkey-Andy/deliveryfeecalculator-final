import React, { useState } from "react";
import DeliveryForm, { TForm } from "./components/DeliveryForm";
import clsx from "clsx";
import { computeTotal, TCartTotal } from "./services";

export function App() {
  const [result, setResult] = React.useState<TCartTotal>();
  const handleSubmit = (form: TForm) => {
    const computeAmount = Number(form.cartValue);
    const computeDistance = Number(form.deliveryDistance);
    const computeTime = new Date(form.time);
    const numebrOfItems = Number(form.amountOfItems);

    // validate for NaNs

    const totalCharges = computeTotal(
      computeAmount,
      numebrOfItems,
      computeTime,
      computeDistance
    );

    console.log(totalCharges);
    setResult(totalCharges);
  };

  return (
    <main
      className={clsx(
        "bg-cover", "bg-map-background",
        "min-h-screen"
      )}
    >
      <div className="m-auto max-w-lg py-5">
        <div className={clsx("text-center text-zinc-800")}>
          <h1 className="font-bold text-white py-4 text-3xl">
            Delivery Fee Calculator
          </h1>
        </div>
        <div className={"flex bg-white shadow-xl rounded-lg px-7 py-4"}>
          <DeliveryForm onSubmit={handleSubmit} />
        </div>
        {result && (
          <div
            className={clsx(
              "flex flex-col justify-center items-center bg-white px-8 py-4",
              "my-10 rounded-md shadow-md border-t-8 border-blue-500"
            )}
          >
            <h2 className="text-lg font-semibold tracking-wider">
              Order breakdown{" "}
            </h2>

            <div className="grid grid-cols-2 my-8 gap-y-2">
              {/* minimum cart amount */}
              {result.minimumCartCharge > 0 && (
                <>
              <div className="flex justify-start items-center">
                <p className="text-left">Small order surcharge <br /> <span className="text-left text-xs">(Small orders cost more to deliver)</span></p>
                {/* <p className="text-left">We Charge The Difference Between The Minimum Order Amount And Your Order</p>                */}
              </div>             
              <p className="text-right pr-8">{result.minimumCartCharge.toFixed(2)}€</p>
              </>
              )}
              {/* delivery charge */}
              <div className="flex justify-start items-center">
                <p className="text-left">Delivery fee</p>
              </div>
              <p className="text-right pr-8">{result.deliveryFee}€</p>
              {/* Surplus Items Fee */}
              {result.surplusItemFee > 0 && (
                <>
              <div className="flex justify-start items-center">
                <p className="text-left">Surplus item fee <br /> <span className="text-left text-xs">(Large orders cost more to deliver)</span></p>
              </div>
              <p className="text-right pr-8">{result.surplusItemFee.toFixed(2)}</p>
              </>
              )}
              {/* Rush hour fee */}
              {result.rushHourFee > 0 && (
                <>
                  <div className="flex justify-start items-center">
                    <p className="text-left">Rush hour fee</p>
                  </div>
                  <p className="text-right pr-8">
                    {result.rushHourFee.toFixed(2)}€
                  </p>
                </>
              )}

              <div className="flex justify-end items-center col-span-full mx-4 my-3 p-3 shadow-lg rounded-xl">
                <p className="text-lg font-bold">Total sum </p>
                <p className="ml-4  font-light text-lg">{result.total}€</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
