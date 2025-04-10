import { createContext, useContext, useState, useEffect } from "react";

// Context aanmaken
export const CategoryContext = createContext([]);
CategoryContext.displayName = "CategoryContext";

// Provider Component
export const CategoryContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  const categoryId = (id) => {
    return categories.find((category) => category.id === id);
  };

  const categoryName = () => {
    return categories;
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/categories");
        const category = await response.json();
        setCategories(category);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    getCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, categoryId, categoryName }}>
      {children}
    </CategoryContext.Provider>
  );
};

// Hook om Context te gebruiken
export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error(
      "useCategory must be used within a CategoryContextProvider"
    );
  }
  return context;
};
