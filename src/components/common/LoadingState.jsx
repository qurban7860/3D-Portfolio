import PropTypes from "prop-types";

const LoadingState = ({ message = "Loading..." }) => (
  <div className="w-full min-h-[260px] flex items-center justify-center rounded-3xl bg-black-100 border border-white/10 p-8 text-center">
    <div>
      <div className="mx-auto mb-4 h-12 w-12 rounded-full border-4 border-t-[#915EFF] border-white/10 animate-spin" />
      <p className="text-secondary text-base">{message}</p>
    </div>
  </div>
);

LoadingState.propTypes = {
  message: PropTypes.string,
};

export default LoadingState;
