import { useState } from "react";
import { Layout } from "antd";
import MenuList from "../components/MenuList";
import ToggleThemeButton from "../components/ToggleThemeButton";
import AppHeader from "../components/AppHeader";
import PageContent from "../components/PageContent";
import LogoMenu from "../components/LogoMenu";

const { Sider } = Layout;

export function PrivateRoutes() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const toogleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout>
      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        theme={darkTheme ? "dark" : "light"}
      >
        <LogoMenu collapsed={collapsed} />
        <MenuList darkTheme={darkTheme} />
        <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
      </Sider>
      <Layout>
        <AppHeader collapsed={collapsed} toogleCollapsed={toogleCollapsed} />
        <PageContent />
      </Layout>
    </Layout>
  );
}
