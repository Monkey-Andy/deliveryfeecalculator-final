import clsx from "clsx";

type LargeStandardInputFieldType = {
  className?: string;
  placeholder: string;
  disabled?: boolean;
  key?: string;
  testId?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputProp?: any;
};

export const StandardInputField: React.FC<LargeStandardInputFieldType> = ({
  onChange,
  placeholder,
  value,
  className,
  disabled,
  inputProp,
  key,
  testId,
}) => {
  return (
    <input
      type="text"
      className={clsx(
        "block w-full p-3 text-base placeholder-gray-500 border-2 border-gray-300 rounded-md",
        "shadow-sm focus:ring focus:ring-blue-500 focus:border focus:outline-none sm:flex-1",
        className
      )}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      key={key}
      data-testid={testId}
      onChange={onChange}
      {...inputProp}
    />
  );
};
