import { Alert, Layout, Spin } from "antd";
import { Content } from "antd/es/layout/layout";

interface LoadingErrorProps {
    loading: boolean;
    error: Error | null;
    children: React.ReactNode;
  }

const LoadingError = ({ loading, error, children } : LoadingErrorProps) => {

  if (loading) {
    return (
      <Layout>
        <Content className="p-8 min-h-[400px] flex justify-center items-center">
          <Spin size="large" />
        </Content>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Content className="p-8 min-h-[400px]">
          <Alert message="Erro ao carregar dados" type="error" showIcon />
        </Content>
      </Layout>
    );
  }

  return <>{children}</>;
};

export default LoadingError;
