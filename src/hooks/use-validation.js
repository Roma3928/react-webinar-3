import { useEffect, useState } from "react";

export const useValidation = (value, validations) => {
  const [error, setError] = useState("");

  useEffect(() => {
    for (const validation in validations) {
      const rule = validations[validation];
      switch (validation) {
        case "isEmpty":
          value
            ? setError("")
            : setError(rule.message || "Поле нужно заполнить!");
          break;
        case "minLength":
          value.length < rule.value
            ? setError(
                rule.message || `Минимальная длина ${rule.value} символов`
              )
            : setError("");
          break;
      }
    }
  }, [value]);

  return error;
};
