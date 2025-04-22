import { Select } from "@chakra-ui/react";
import { useCategory } from "../context/CategoryContext";

export const AddNewEventSelectCategory = ({
  selectedCategoryIds,
  handleCategoryChange,
}) => {
  const { categories } = useCategory();

  // Haal de namen van de geselecteerde categorieën op
  const selectedCategoryNames = categories
    .filter((category) => selectedCategoryIds.includes(category.id))
    .map((category) => category.name);

  return (
    <>
      <Select.Root
        required={true}
        multiple
        size="sm"
        positioning={{ placement: "top" }}
        borderRadius={4}
        variant={"subtle"}
      >
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder={"select 1 or more categories"}>
              {selectedCategoryNames.length > 0
                ? selectedCategoryNames.join(", ") // Toon de namen van de geselecteerde categorieën
                : "select 1 or more categories"}{" "}
            </Select.ValueText>
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Select.Content>
          {categories
            .filter((category) => category?.name && category?.id)
            .map((category) => (
              <Select.Item
                key={category.id}
                item={category.name}
                selected={selectedCategoryIds.includes(category.id)}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
        </Select.Content>
      </Select.Root>
    </>
  );
};
