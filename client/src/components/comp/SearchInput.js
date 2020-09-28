import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SearchInput = ({
  name,
  placeholder,
  value,
  id,
  error,
  info,
  onChange,
  type
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        id={id}
      />
      {info && <small className="form-text text-muted">{info}</small>}

      {error && <div className="inavlid-feedback">{error}</div>}
    </div>
  );
};

SearchInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  info: PropTypes.string
};

SearchInput.defaultProps = {
  type: "text"
};

export default SearchInput;
