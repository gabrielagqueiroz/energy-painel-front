import React from "react";
import TableList from "../../components/TableList";
import { Space } from "antd";
import TenantsProvider from "../../services/tenants/tenantsProvider";
import DynamicForm from "../../components/DynamicForm";
import TenantDetails from "../../components/TenantDetails";


const Tenants: React.FC = () => {

  return (
    <TenantsProvider>
      <Space direction="vertical" size="large">
        <div className="mb-4">
          <DynamicForm />
        </div>
        <TenantDetails />
        <TableList />
      </Space>
    </TenantsProvider>
  );
};

export default Tenants;
