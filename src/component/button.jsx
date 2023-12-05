const Button = ({ btnText, classes, onClick, isDisable }) => {
  const cursor = isDisable ? "cursorNotAllowed btn" : "cursorAllowed btn";
  return (
    <button className={cursor} disabled={isDisable} onClick={onClick}>
      {btnText} <i className={classes}></i>
    </button>
  );
};
export default Button;
