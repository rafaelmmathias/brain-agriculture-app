import { Select, SelectProps } from "antd";
import { BaseOptionType } from "antd/lib/select";
import states from "./br-states.json";

interface OptionType extends BaseOptionType {
  value: string;
  name: string;
}

export const SelectState: React.FC<SelectProps<any, OptionType>> = (props) => {
  return (
    <Select
      style={{ width: 160 }}
      placeholder="Selecione o estado"
      showSearch
      fieldNames={{
        label: "name",
        value: "value",
      }}
      options={states}
      {...props}
    />
  );
};
