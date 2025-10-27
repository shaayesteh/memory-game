import { data } from "../data/data";
import Option from "./option";

interface SelectProps {
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({ handleChange }: SelectProps) {
  const selectEl = Object.entries(data).map(([key, value]) => (
    <div
      key={key}
      className="form__inner-wrapper"
    >
      <label htmlFor={key}>Select a {key}</label>
      <select
        name={key}
        id={key}
        onChange={handleChange}
      >
        <Option valueArray={value} />
      </select>
    </div>
  ));

  return <>{selectEl}</>;
}
