import { HStack, CheckboxGroup } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import { Controller } from "react-hook-form";
// import { Field } from "./ui/field";

export const CategoryCheckbox = ({ categories, control }) => {
  return (
    <Controller
      name="categoryIds"
      control={control}
      defaultValue={[]}
      render={({ field }) => (
        <CheckboxGroup
          value={field.value}
          onChange={(selectedValues) => {
            field.onChange(selectedValues.map((value) => Number(value)));
          }}
        >
          <HStack spacing={3}>
            {categories.map((category) => (
              <Checkbox key={category.id} value={category.id}>
                {category.name}
              </Checkbox>
            ))}
          </HStack>
        </CheckboxGroup>
      )}
    />
  );
};
