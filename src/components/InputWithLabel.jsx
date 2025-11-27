import SearchForm from "./SearchForm";

function InputWithLabel({
  isFocused,
  id,
  children,
  type = "text",
  handleSearch,
  searchTerm,
  handleSubmit,
}) {
  return (
    <SearchForm
      isFocused={isFocused}
      id={id}
      children={children}
      type={type}
      handleSearch={handleSearch}
      searchTerm={searchTerm}
      handleSubmit={handleSubmit}
    />
  );
}

export default InputWithLabel;
