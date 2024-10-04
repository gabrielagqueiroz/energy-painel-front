import { Button, Checkbox, Form, Input, message, Spin } from "antd";
import { useAuth } from "../../providers/auth";
import { UserProps } from "../../providers/auth/types";
import { AxiosError } from "axios";
import { useState } from "react";
import logo from "../../assets/logo.png"

function Login() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (formValues: UserProps) => {
    const { email, password } = formValues;

    setLoading(true);

    login({ email, password })
      .then(() => {
        message.success("Logado com sucesso!");
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
    <div className="relative flex justify-center items-center w-full h-screen p-4 bg-gradient-to-r from-[#001529] to-[#002346] overflow-hidden">
<div 
  className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
  style={{ backgroundImage: `url(${logo})`, backgroundSize: '80%', }}
/>
<div className="relative bg-gray-200 bg-opacity-15 backdrop-filter backdrop-blur-lg rounded-md shadow-2xl shadow-[#0e0e0e] p-8 max-w-md w-full">
  <Form
    name="login"
    initialValues={{ remember: true }}
    onFinish={handleLogin}
    layout="vertical"
    className="space-y-4"
  >
    <div className="text-center">
      <h1 className="text-2xl text-[#f8f8f8] font-bold">Login</h1>
    </div>

    <Form.Item
      name="email"
      rules={[
        {
          required: true,
          type: "email",
          message: "Por favor, insira um email válido",
        },
      ]}
      label={<span className="text-[#f8f8f8] font-medium">Email</span>}
    >
      <Input
        className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Insira seu email"
      />
    </Form.Item>

    <Form.Item
      name="password"
      rules={[
        {
          required: true,
          message: "Por favor, insira sua senha",
        },
      ]}
      label={<span className="text-[#f8f8f8] font-medium">Senha</span>}
    >
      <Input.Password
        className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Insira sua senha"
      />
    </Form.Item>

    <div className="flex items-center justify-between">
      <Form.Item name="remember" valuePropName="checked" noStyle>
        <Checkbox className="text-sm text-[#f8f8f8] font-medium">Lembre de mim</Checkbox>
      </Form.Item>
      <a href="/" className="text-sm text-[#f8f8f8] hover:underline">
        Esqueceu sua senha?
      </a>
    </div>

    <Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        disabled={loading}
      >
        {loading ? <Spin /> : "Entrar"}
      </Button>
    </Form.Item>
  </Form>
</div>
</div>
);

}


export default Login;
