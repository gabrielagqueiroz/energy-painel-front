import React, { useState } from "react";
import TableList from "../../components/TableList";
import { Space } from "antd";
import TenantsProvider from "../../services/tenants/tenantsProvider";
import DynamicForm from "../../components/DynamicForm";


const Tenants: React.FC = () => {
  const [uuid, setUuid] = useState<string | undefined>(undefined);
  const [EditMode, setEditMode] = useState(false);
  return (
    <TenantsProvider>
      <Space direction="vertical" size="large">
        <div className="mb-4">
          <DynamicForm uuid={uuid} setUuid={setUuid} EditMode={EditMode} setEditMode={setEditMode} />
        </div>
        <TableList uuid={uuid} setUuid={setUuid} setEditMode={setEditMode}/>
      </Space>
    </TenantsProvider>
  );
};

export default Tenants;
