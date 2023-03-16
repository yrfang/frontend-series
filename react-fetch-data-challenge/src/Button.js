const Button = ({ buttonText, reqType, setReqType }) => {
  return (
    <button
      className={ reqType === buttonText ? "select" : null }
      onClick={() => setReqType(buttonText)}
    >
      {buttonText}
    </button>
  );
}
 
export default Button;