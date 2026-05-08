import React from "react";


interface FieldProps {
  name: string;
  logo: React.ReactNode;
  placeholder: string;
  type: string;
  inputName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Field: React.FC<FieldProps> = ({
  name,
  logo,
  placeholder,
  type,
  inputName,
  onChange,
}) => {
  return (
    <div className="flex flex-col space-y-2 w-full">
      <h2 className="text-black text-sm sm:text-base font-semibold">
        {name}
      </h2>

      <div className="flex bg-gray-100 p-3 rounded-xl gap-2 items-center border">
        {logo}
        <input
          type={type}
          name={inputName}
          placeholder={placeholder}
          onChange={onChange}
          className="bg-transparent outline-none w-full text-sm sm:text-base"
        />
      </div>
    </div>
  );
};

export default Field;