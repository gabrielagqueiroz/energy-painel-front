import { Space, Typography } from "antd";
import Breadcrumbs from "../../components/Breadcrumbs";

interface HeaderPageContentProps {
  title: string;
}

function HeaderPageContent({title}: HeaderPageContentProps) {
  return (
    <Space direction="vertical">
      <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 0 }}>
        {title}
      </Typography.Title>
      <Breadcrumbs />
    </Space>
  )
}

export default HeaderPageContent;
