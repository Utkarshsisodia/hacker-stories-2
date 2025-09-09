function InputWithLabel({
  isFocused,
  id,
  children,
  type = "text",
  handleSearch,
  searchTerm,
}) {
  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        autoFocus={isFocused}
        type={type}
        name={id}
        id={id}
        onChange={handleSearch}
        value={searchTerm}
      />

      <p>
        Searching for <strong>{searchTerm}</strong>
      </p>
    </>
  );
}

export default InputWithLabel;
