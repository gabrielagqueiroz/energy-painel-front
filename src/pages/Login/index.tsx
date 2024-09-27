import { Button, Flex, Form, Image, Input, message, Spin } from "antd";
import { useAuth } from "../../providers/auth";
import { UserProps } from "../../providers/auth/types";
import { AxiosError } from "axios";
import { If } from "../../components/If";
import { useState } from "react";

function Login() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (formValues: UserProps) => {
    const { email, password } = formValues;

    setLoading(true);

    login({ email, password })
      .then(() => {
        message.success("Login Successful!");
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          return message.error(error.response?.data?.message);
        }
        message.error("Falha ao efetuar login, tente novamente mais tarde!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="AppBgLogin">
      <div className="LoginForm">
        <Flex justify="center" style={{ marginBottom: 16 }}>
          <Image width={150} src="logo_blue.png" />
        </Flex>
        <Form onFinish={handleLogin} layout="vertical">
          <Form.Item
            rules={[
              {
                required: true,
                type: "email",
                message: "Por favor, insira um email válido",
              },
            ]}
            label="Email"
            name={"email"}
          >
            <Input placeholder="Insira seu email" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Por favor, insira sua senha",
              },
            ]}
            label="Senha"
            name={"password"}
          >
            <Input.Password placeholder="Insira sua senha" />
          </Form.Item>
          <Flex justify="center">
            <If condition={loading}>
              <Spin />
            </If>
            <If condition={!loading}>
              <Button type="primary" htmlType="submit">
                Entrar
              </Button>
            </If>
          </Flex>
        </Form>
      </div>
    </div>
  );
}

export default Login;
