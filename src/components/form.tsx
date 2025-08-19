import RegularButton from "./regularButton";

interface FormProps {
    handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Form({ handleSubmit }: FormProps) {
    return (
        <form className="wrapper">
            <RegularButton handleClick={handleSubmit}>
                Start Game
            </RegularButton>
        </form>
    )
}