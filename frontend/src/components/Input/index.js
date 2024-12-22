import React from "react";
import * as C from "./styles";

const Input = ({ type, name, placeholder, value, onChange, onKeyDown }) => {
  return (
      <C.Input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
      />
  );
};

export default Input