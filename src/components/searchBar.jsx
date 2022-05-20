import PropTypes from "prop-types";

const SearchBar = ({ placeholder, handleChange }) => {
  return (
    <div className="d-flex col-12  mb-2 text-center">
      <input
        type="search"
        className=" form-control center searchBar"
        placeholder={placeholder}
        onInput={handleChange}
      />
    </div>
  );
};

// SearchBar.propTypes = {
//   placeholder: PropTypes.string.isRequired,
//   handleChange: PropTypes.func.isRequired,
// };

export default SearchBar;
