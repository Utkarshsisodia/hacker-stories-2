import React from "react";
import InputWithLabel from "./InputWithLabel";

function InputForm({
  isFocused,
  id,
  children,
  type = "text",
  handleSearch,
  searchTerm,
  handleSubmit,
}) {
  return (
    <form action={handleSubmit}>
      <InputWithLabel
        isFocused={isFocused}
        id={id}
        children={children}
        type={type}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        handleSubmit={handleSubmit}
      />
    </form>
  );
}

export default InputForm;
