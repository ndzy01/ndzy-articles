const Input = (props: any) => {
  return <input value={props.value} onChange={(e) => props.onChange(e.target.value)} {...props} />;
};

export default Input;
