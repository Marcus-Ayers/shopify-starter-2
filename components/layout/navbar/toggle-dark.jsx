'use client';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export default function Toggle() {
  const [cookies, setCookie] = useCookies(['theme']);
  const [isActive, setIsActive] = useState(cookies.theme === 'dark');

  const toggleClass = () => {
    if (isActive) {
      document.documentElement.classList.remove('dark');
      setCookie('theme', 'light', { path: '/' });
    } else {
      document.documentElement.classList.add('dark');
      setCookie('theme', 'dark', { path: '/' });
    }
    setIsActive(!isActive);
  };

  useEffect(() => {
    if (cookies.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <>
      <div className="form-control">
        <label className="label cursor-pointer">
          <input type="checkbox" className="toggle" checked={isActive} onChange={toggleClass} />
        </label>
      </div>
    </>
  );
}
