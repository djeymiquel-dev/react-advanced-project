import { Select, Portal, VStack, Flex } from "@chakra-ui/react";
import { useCategory } from "../context/CategoryContext";

export const SelectCategoryFilter = ({ CallbackFN, selectedCategory }) => {
  const { categories } = useCategory();

  const handleClearSelection = () => {
    CallbackFN(""); // Reset de selectie naar een lege waarde
  };

  console.log("selectedCategory from selected filter", selectedCategory);

  return (
    <VStack align="start" spacing={2}>
      <Select.Root
        w={"10rem"}
        size={"sm"}
        value={selectedCategory || []} // Zorg ervoor dat dit een array is
        onValueChange={(value) => CallbackFN(value)} // Zorg dat alleen een list wordt doorgegeven
      >
        <Select.Control>
          <Select.Trigger cursor={"pointer"}>
            <Flex
              flexDir={"row"}
              alignItems="center"
              justifyContent={"space-between"}
              w="100%"
            >
              <Select.ValueText placeholder="Select a category">
                {selectedCategory}
              </Select.ValueText>
              <Flex alignItems="center" gap="0.5rem">
                {selectedCategory && (
                  // Als er een selectie is, toon de clear-knop
                  // div met role="button" en tabIndex={0} voor toegankelijkheid.
                  // (het kan geen <Button /> zijn want Select.Trigger is een button (voorkom dat de button in een button zit))
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation(); // Voorkom dat de klik de dropdown opent
                      handleClearSelection(e); // Roep de clear-functie aan
                    }}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "none",
                      border: "none",
                      padding: 0,
                    }}
                  >
                    ✕ {/* Of een ander symbool of icoon */}
                  </div>
                )}
                <Select.Indicator />
              </Flex>
            </Flex>
          </Select.Trigger>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {categories.map((category) => (
                <Select.Item
                  item={category.name}
                  key={category.id}
                  value={category.name}
                >
                  {category.name}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </VStack>
  );
};
