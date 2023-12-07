import useStore from "../../store/hooks/use-store";
import useSelector from "../../store/hooks/use-selector";
import "./style.css";

function LanguageSwitch() {
  const store = useStore();
  const currentLang = useSelector((state) => state.language.lang);

  const callbacks = {
    switchLang: (e) => {
      store.actions.language.switchLang(e.target.value);
    },
  };

  return (
    <select
      className="LanguageSwitch"
      value={currentLang}
      onChange={callbacks.switchLang}
    >
      <option value="ru">ru</option>
      <option value="en">en</option>
    </select>
  );
}

export default LanguageSwitch;
