import { useEffect, useRef } from "react";
import RegularButton from "./regularButton";
import Select from "./select";

interface FormProps {
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isFirstRender: boolean;
}

export default function Form({
  handleSubmit,
  handleChange,
  isFirstRender,
}: FormProps) {
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isFirstRender) divRef.current?.focus();
  }, []);

  return (
    <div
      className="form-container"
      ref={divRef}
      tabIndex={-1}
    >
      <p className="p--regular">
        Customize the game by selecting an emoji category and a number of memory
        cards.
      </p>
      <form className="wrapper">
        <Select handleChange={handleChange} />
        <RegularButton handleClick={handleSubmit}>Start Game</RegularButton>
      </form>
    </div>
  );
}
