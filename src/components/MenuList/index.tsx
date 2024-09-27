import { HomeOutlined, PoweroffOutlined, TeamOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Menu, message } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/auth";
import { GiElectric } from "react-icons/gi";

interface MenuListProps {
  darkTheme: boolean;
}

function MenuList({ darkTheme }: MenuListProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  return (
    <Menu
      className="Menubar"
      mode="inline"
      theme={darkTheme ? "dark" : "light"}
      onClick={({ key }) => {
        if (key === "logout") {
          logout();
          navigate("/");
          message.success("Logout Successful!");
        } else {
          navigate(key);
        }
      }}
      defaultSelectedKeys={[window.location.pathname]}
      selectedKeys={[selectedKeys]}
    >
      <Menu.Item icon={<HomeOutlined />} key={"/"}>
        Home
      </Menu.Item>

      <Menu.Item icon={<TeamOutlined />} key={"/meus-locatarios"}>
        Locatarios
      </Menu.Item>

      <Menu.Item icon={<GiElectric />} key={"/meus-eletropostos"}>
        Eletropostos
      </Menu.Item>

      <Menu.Item icon={<EnvironmentOutlined />} key={"/mapa"}>
        Mapa
      </Menu.Item>

      <Menu.Item icon={<PoweroffOutlined />} key={"logout"} danger={true}>
        Logout
      </Menu.Item>
    </Menu>
  );
}

export default MenuList;
