import { Select } from "@chakra-ui/react";
import { useState } from "react";
import { useUser } from "../context/UserContext";

export const SelectUser = ({ setSelectedUserId }) => {
  const [selectedUserName, setSelectedUserName] = useState("");
  const { users } = useUser();

  const handleUserChange = (userId, userName) => {
    if (!userId) {
      console.error("Invalid userId ");
      return;
    }
    setSelectedUserId(userId);
    setSelectedUserName(userName);
  };

  return (
    <Select.Root variant={"subtle"}>
      {/* <SelectLabel></SelectLabel> */}
      <Select.Trigger>
        <Select.ValueText placeholder={selectedUserName || "select user"} />
      </Select.Trigger>
      <Select.Content>
        {users.map((user) => (
          <Select.Item
            key={user.id}
            value={user.id}
            item={user.name}
            onClick={() => handleUserChange(user.id, user.name)}
          >
            {user.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};
