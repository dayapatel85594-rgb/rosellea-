import { useTheme } from '../contexts/ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-link nav-link"
      style={{ border: 'none', background: 'none', color: 'inherit' }}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`} style={{ fontSize: '1.2rem', color: theme === 'light' ? '#4A4A4A' : '#F5F0EB' }}></i>
    </button>
  );
}

export default ThemeToggle;