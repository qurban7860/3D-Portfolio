import PropTypes from "prop-types";

const ErrorMessage = ({ message }) => (
  <div className="w-full rounded-3xl bg-red-500/10 border border-red-500/20 p-6 text-red-100">
    <p className="text-sm leading-relaxed">{message || "An error occurred while loading data."}</p>
  </div>
);

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default ErrorMessage;
