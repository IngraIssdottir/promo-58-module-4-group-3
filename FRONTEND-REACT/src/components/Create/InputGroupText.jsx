function InputGroupText({
  name,
  id,
  placeholder,
  type = "text",
  value,
  onChange,
}) {
  return (
    <input
      className="addForm__input"
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default InputGroupText;
