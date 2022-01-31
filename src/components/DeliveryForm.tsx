import React from "react";
import { MdSend } from "react-icons/md";
import { IconWithTextButton } from "./Button";
import { StandardInputField } from "./InputField";

export type TForm = {
  cartValue: string;
  deliveryDistance: string;
  amountOfItems: string;
  time: string;
};

const getCurrentDateString = () => {
  const date = new Date();
  return {
    datetime: `${date.getFullYear()}-${date.getMonth() + 1}.padStart(
      2,
      "0"
    )}-${date.getDate()}.padStart(2, "0")}T${date.getHours()}.padStart(
      2,
      "0"
    )}:${date.getMinutes()}.padStart(2, "0")}`,
  };
};

const DeliveryForm: React.FC<{
  onSubmit: (t: TForm) => void;
}> = ({ onSubmit }) => {
  const [form, setForm] = React.useState<TForm>({
    cartValue: "",
    amountOfItems: "",
    deliveryDistance: "",
    time: getCurrentDateString().datetime,
  });

  const onChange =
    (key: keyof TForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [key]: e.target.value });
    };

  return (
    <>
      <div className={""}>
        <div className="grid grid-cols-2 gap-y-6">
          {/* Cart Value */}
          <div className="flex items-center">
            <label className="text-xl text-left"> Cart Value</label>
          </div>
          <StandardInputField
            value={form.cartValue}
            onChange={onChange("cartValue")}
            placeholder=" 15 €"
          />
          {/* Delivery Distance */}
          <div className={"flex items-center"}>
            <label htmlFor="Delivery Distance" className="text-xl text-left">
              Delivery distance{" "}
            </label>
          </div>
          <StandardInputField
            value={form.deliveryDistance}
            onChange={onChange("deliveryDistance")}
            placeholder=" 1000 m"
          />
          {/* Amount of Items */}
          <div className={"flex items-center"}>
            <label className="text-xl text-left">Amount of items</label>
          </div>
          <StandardInputField
            value={form.amountOfItems}
            onChange={onChange("amountOfItems")}
            placeholder="3"
          />

          {/* Time */}
          <div className={"flex items-center"}>
            <label htmlFor="Time" className="text-xl text-left">
              Time
            </label>
          </div>

          <div className="relative">
            <input
              type="datetime-local"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring focus:ring-blue-500 focus:outline-none block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select date"
              value={form.time}
              onChange={onChange("time")}
            />
          </div>

          <div className="flex justify-center items-center col-span-full">
            <IconWithTextButton
              className="bg-blue-500 text-white"
              icon={<MdSend />}
              onClick={() => onSubmit(form)}
              placeholder="Calculate Delivery Fee"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryForm;
