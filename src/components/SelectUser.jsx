import {
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  SelectContent,
} from "@chakra-ui/react";
import { useState } from "react";

export const SelectUser = ({ users, setSelectedUserId }) => {
  const [selectedUserName, setSelectedUserName] = useState("");

  const handleUserChange = (userId, userName) => {
    setSelectedUserId(userId);
    setSelectedUserName(userName);
  };

  return (
    <SelectRoot variant={"subtle"}>
      {/* <SelectLabel></SelectLabel> */}
      <SelectTrigger>
        <SelectValueText placeholder={selectedUserName || "select user"} />
      </SelectTrigger>
      <SelectContent>
        {users.map((user) => (
          <SelectItem
            key={user.id}
            value={user.name}
            onClick={() => handleUserChange(user.id, user.name)}
          >
            {user.name}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};
