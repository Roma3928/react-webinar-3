import { useState } from "react";
import { useValidation } from "./use-validation";

export const useInput = (defaultValue, validations) => {
  const [value, setValue] = useState(defaultValue);
  const [isDirty, setDirty] = useState(false);
  const error = useValidation(value, validations);

  const onBlur = () => {
    setDirty(true);
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    value,
    isDirty,
    error,
    onBlur,
    onChange,
    reset,
  };
};
