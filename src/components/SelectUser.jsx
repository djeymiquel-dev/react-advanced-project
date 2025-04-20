import {
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  SelectContent,
} from "@chakra-ui/react";
import { useState } from "react";
import { useUser } from "../context/UserContext";

export const SelectUser = ({ setSelectedUserId }) => {
  const [selectedUserName, setSelectedUserName] = useState("");
  const { users } = useUser();

  const handleUserChange = (userId, userName) => {
    if (!userId || !userName) {
      console.error("Invalid userId or userName");
      return;
    }
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
            item={user.name}
            // selected={selectedUserName === user.name}
            onClick={() => handleUserChange(user.id, user.name)}
          >
            {user.name}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};
