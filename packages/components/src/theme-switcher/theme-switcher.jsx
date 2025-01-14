'use client';
import Switcher from '../switcher/switcher';
import IconSun from '../svg-icon/icon-sun/icon-sun';
import IconMoon from '../svg-icon/icon-moon/icon-moon';
import { useThemeState } from './theme-context';

function ThemeSwitcher(props) {
  const { theme, setTheme } = useThemeState();

  return (
    <Switcher
      checked={theme === 'dark'}
      theme={props.iconTheme}
      firstOption={<IconSun theme={props.iconTheme} />}
      secondOption={<IconMoon theme={props.iconTheme} />}
      onChange={(isChecked) => setTheme(isChecked ? 'dark' : 'light')}
      className={props.className}
    />
  );
}

export default ThemeSwitcher;
