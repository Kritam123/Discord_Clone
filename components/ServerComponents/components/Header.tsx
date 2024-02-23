import { MemberRole, Server } from "@prisma/client";
import React from "react";
import DropdownMenu from "../DropdownMenu";
interface ServerHeaderProps {
  server: Server;
  role?: MemberRole;
};
const Header: React.FC<ServerHeaderProps> = ({ server, role }) => {
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;
  return (


    <DropdownMenu server={server} isAdmin={isAdmin} isModerater={isModerator} />

  );
};

export default Header;
