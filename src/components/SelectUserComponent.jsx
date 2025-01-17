import {
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  SelectContent,
} from "@chakra-ui/react";
import { useState } from "react";

export const SelectUserComponent = ({ users, setSelectedUserId }) => {
  const [selectedUserName, setSelectedUserName] = useState("");

  const handleUserChange = (userId, userName) => {
    setSelectedUserId(userId); // Update de geselecteerde userId
    setSelectedUserName(userName);
  };

  return (
    <SelectRoot>
      {/* <SelectLabel></SelectLabel> */}
      <SelectTrigger bg={"blackAlpha.900"} color={"white"}>
        <SelectValueText placeholder={selectedUserName || "select user"} />
      </SelectTrigger>
      <SelectContent>
        {users.map((user) => (
          <SelectItem
            key={user.id}
            item={user.name}
            onClick={() => handleUserChange(user.id)}
          >
            {user.name}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};
