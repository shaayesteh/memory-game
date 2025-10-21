import { useEffect, useRef } from "react";
import RegularButton from "./regularButton";

interface GameOverProps {
  handleClick: () => void;
}

export default function GameOver({ handleClick }: GameOverProps) {
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    divRef.current?.focus();
  }, []);

  return (
    <div
      className="wrapper wrapper--accent"
      ref={divRef}
      tabIndex={-1}
    >
      <p className="p--large">You've matched all the memory cards!</p>
      <RegularButton handleClick={handleClick}>Play again</RegularButton>
    </div>
  );
}
