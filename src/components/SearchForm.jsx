function SearchForm({
  isFocused,
  id,
  children,
  type = "text",
  handleSearch,
  searchTerm,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={id}>{children}</label>
      <input
        autoFocus={isFocused}
        type={type}
        name={id}
        id={id}
        onChange={handleSearch}
        value={searchTerm}
      />
      <button type="submit" disabled={!searchTerm}>
        submit
      </button>

      <p>
        Searching for <strong>{searchTerm}</strong>
      </p>
    </form>
  );
}

export default SearchForm;
