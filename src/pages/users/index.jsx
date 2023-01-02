import React from "react";
import UserManager from "../../components/UserManager";
import DashboardLayout from "../../layouts/dashboard-layout";

function Users() {
  return (
    <DashboardLayout className="dashboard">
      <UserManager />
    </DashboardLayout>
  );
}

export default Users;
