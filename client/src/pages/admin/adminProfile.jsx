import React, { useContext } from "react";
import { UserContext } from "../../App";
import Admin from "../../components/admin/adminTemplate";

import ProfileHead from "../../components/admin/profile/profile";

export default function AdminProfile() {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <Admin>
      <ProfileHead />
    </Admin>
  );
}
