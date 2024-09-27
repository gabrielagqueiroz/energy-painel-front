import { Image } from "antd";
import logoImg from "../../assets/logo.png";

interface LogoMenuProps {
  collapsed: boolean;
}

const LogoMenu = ({collapsed}: LogoMenuProps) => {
  return (
    <div className="Logo">
      <div className={collapsed ? "LogoIconCollapsed" : "LogoIcon"}>
        <Image
          width={80}
          src={logoImg}
        />
      </div>
    </div>
  )
}

export default LogoMenu;
