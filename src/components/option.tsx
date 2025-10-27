interface OptionProps {
  valueArray: Record<string, string>[];
}

export default function Option({ valueArray }: OptionProps) {
  const optionEl = valueArray.map(({ name, value }) => (
    <option
      key={value}
      value={value}
    >
      {name ? name : value}
    </option>
  ));

  return <>{optionEl}</>;
}
