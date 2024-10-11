"use client";

import { Button } from "@/components/ui/button";
import { Moon, MoonStar, SunIcon } from "lucide-react";
import { useState, type FC } from "react";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  const [isDark, setIsDark] = useState(false);

  return (
    <nav className='h-20 w-full border-b border-gray-100 '>
      <div className='size-full flex items-center justify-between max-w-screen-2xl max-2xl:px-6 mx-auto'>
        <div>
          <img src='/assets/logo.svg' alt='logo' className='h-9 w-auto' />
        </div>

        <Button
          onClick={() => setIsDark(!isDark)}
          variant='outline'
          size={"icon"}
          className='text-zinc-500 p-2'>
          {isDark ? <SunIcon /> : <Moon />}
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
