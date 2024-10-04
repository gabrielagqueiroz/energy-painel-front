import React from "react";
import TableList from "../../components/TableList";
import RegisterTenants from "../../components/RegisterTenants";
import { Space } from "antd";


const Tenants: React.FC = () => {
  return (
    <Space direction="vertical" size="large">
      <div className="mb-4">
        <RegisterTenants />
      </div>
      <TableList />
    </Space>
  );
};

export default Tenants;
