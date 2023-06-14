"use client";

import ReactSelect from "react-select";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface SelectProps {
  label: string;
  value?: Record<string, any>;
  onChange?: (value: any) => void;
  options: Record<string, any>[];
  disabled?: boolean;
  isMulti?: boolean;
  register?: UseFormRegister<FieldValues>;
  errors?: FieldErrors;
  otherProps?: SelectProps;
}

const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  disabled,
  isMulti,
  otherProps,
}) => {
  return (
    <>
      {isMulti ? (
        <div className="z-[100]">
          <label
            className="
          block 
          text-sm 
          font-medium 
          leading-6 
          text-gray-900
        ">
            {label}
          </label>
          <div className="mt-2">
            <ReactSelect
              isDisabled={disabled}
              value={value}
              onChange={onChange}
              options={options}
              isMulti
              menuPortalTarget={document.body}
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              }}
              classNames={{
                control: () => "text-sm",
              }}
            />
          </div>
        </div>
      ) : (
        <div className="z-[100]">
          <label
            className="
          block 
          text-sm 
          font-medium 
          leading-6 
          text-gray-900
        ">
            {label}
          </label>
          <div className="mt-2">
            <ReactSelect
              {...otherProps}
              isDisabled={disabled}
              value={value}
              onChange={onChange}
              options={options}
              classNames={{
                control: () => "text-sm",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Select;
