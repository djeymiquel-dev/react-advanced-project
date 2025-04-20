import { createListCollection } from "@chakra-ui/react";
import { useCategory } from "../context/CategoryContext";
import { useMemo } from "react";

export const useCategoryCollection = () => {
  const { categories } = useCategory();

  return useMemo(() => {
    const list = createListCollection(
      categories.map((category) => ({
        id: category.id,
        name: category.name,
      }))
    );
    console.log("📦 Generated collection:", list);
    return list;
  }, [categories]);
};
