import { Button } from "antd";
import {HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';

interface ToggleThemeButtonProps {
  darkTheme: boolean;
  toggleTheme: () => void; 
}

const ToggleThemeButton = ({ darkTheme, toggleTheme }: ToggleThemeButtonProps) => {
  return (
    <div className="ToggleThemeBtn">
      <Button onClick={toggleTheme}>
        {darkTheme ? <HiOutlineSun /> : <HiOutlineMoon />}
      </Button>
    </div>
  )
}

export default ToggleThemeButton;
