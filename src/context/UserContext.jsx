import { createContext, useContext, useState, useEffect } from "react";

// Context aanmaken
export const UserContext = createContext([]);
UserContext.displayName = "UserContext";

// Provider component
export const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const userId = (id) => {
    return users.find((user) => user.id === id);
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        const users = await response.json();
        setUsers(users);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    getUsers();
  }, []);

  return (
    <UserContext.Provider value={{ userId, users }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook om Context te gebruiken
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
};
