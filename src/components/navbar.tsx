import { Popover, Transition } from "@headlessui/react";
import { Globe, Menu, X } from "lucide-react";
import { Fragment, ReactNode, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useActiveTab } from "./ActiveTabContext"; // Import the shared context
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from "./ui/select"; // Assuming you have a custom Select component

// NavItem Component
function NavItem({
  href,
  children,
  isActive,
  onClick,
}: {
  href: string;
  children: ReactNode;
  isActive: boolean;
  onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}) {
  return (
    <li className="px-4">
      <a
        href={href}
        onClick={onClick}
        className={`block px-2 py-2 text-base font-bold transition ${isActive ? "text-cyan-400" : "text-white hover:text-cyan-400"
          }`}
      >
        {children}
      </a>
    </li>
  );
}

// Desktop Navigation
function DesktopNavigation() {
  const { activeTab, setActiveTab } = useActiveTab();
  const location = useLocation();

  useEffect(() => {
    setActiveTab(location.pathname + location.hash);
  }, [location.pathname, location.hash, setActiveTab]);

  const handleScrollToSection = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string
  ) => {
    event.preventDefault();

    const [path, hash] = href.split("#");
    if (path && window.location.pathname !== path) {
      window.location.href = `${path}#${hash}`;
    } else {
      const target = document.querySelector(`#${hash}`);
      target?.scrollIntoView({ behavior: "smooth" });
    }

    setActiveTab(href);
  };

  return (
    <nav className="hidden md:flex tracking-wide font-poppins">
      <ul className="flex items-center -space-x-4 tracking-wider text-white text-[26px]">
        <NavItem
          href="/"
          isActive={activeTab === "/" || activeTab === "/#"}
          onClick={() => setActiveTab("/")}>
          Home
        </NavItem>
        <NavItem
          href="/#advisory"
          isActive={activeTab === "/#advisory"}
          onClick={(e) => handleScrollToSection(e, "/#advisory")}>
          Advisory
        </NavItem>
        <NavItem
          href="/#nuqiprive"
          isActive={activeTab === "/#nuqiprive"}
          onClick={(e) => handleScrollToSection(e, "/#nuqiprive")}>
          Prive
        </NavItem>
        <NavItem
          href="/iris"
          isActive={activeTab === "/iris"}
          onClick={() => setActiveTab("/iris")}>
          IRIS
        </NavItem>
        <NavItem
          href="/ethosphere"
          isActive={activeTab === "/ethosphere"}
          onClick={() => setActiveTab("/ethosphere")}>
          Ethosphere
        </NavItem>
      </ul>
    </nav>
  );
}

// Mobile Navigation
function MobileNavigation() {
  const { setActiveTab } = useActiveTab();

  const handleScrollToSection = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    targetHash: string
  ) => {
    event.preventDefault();

    if (window.location.pathname !== "/") {
      window.location.href = `/${targetHash}`;
    } else {
      const target = document.querySelector(targetHash);
      target?.scrollIntoView({ behavior: "smooth" });
    }

    setActiveTab(`/${targetHash}`);
  };

  return (
    <div className="lg:hidden font-poppins">
      <Popover>
        <Popover.Button>
          <Menu className="h-6 w-6 text-white" />
        </Popover.Button>
        <Transition.Root>
          <Transition.Child
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-150 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Popover.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-150 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel className="absolute top-0 left-0 w-full bg-black p-4">
              <div className="flex justify-between items-center">
                <Popover.Button>
                  <X className="h-6 w-6 text-white" />
                </Popover.Button>
              </div>
              <nav className="mt-4 tracking-wide">
                <ul className="space-y-4 tracking-wide">
                  <NavItem href="/" isActive={false} onClick={() => setActiveTab("/")}>
                    Home
                  </NavItem>
                  <NavItem
                    href="/#advisory"
                    isActive={false}
                    onClick={(e) => handleScrollToSection(e, "#advisory")}>
                    Advisory
                  </NavItem>
                  <NavItem
                    href="/#nuqiprive"
                    isActive={false}
                    onClick={(e) => handleScrollToSection(e, "#nuqiprive")}>
                    Prive
                  </NavItem>
                  <NavItem href="/iris" isActive={false} onClick={() => setActiveTab("/iris")}>
                    IRIS
                  </NavItem>
                  <NavItem
                    href="/ethosphere"
                    isActive={false}
                    onClick={() => setActiveTab("/ethosphere")}>
                    Ethosphere
                  </NavItem>
                </ul>
              </nav>

              {/* Mobile Sign Up & Login Links */}
              <div className="mt-6">
                <a href="http://portal.nuqiwealth.com/signup" target="_blank" rel="noopener noreferrer">
                  <button className="w-full px-4 py-2 text-sm font-semibold text-black bg-cyan-400 rounded-xl whitespace-nowrap hover:text-black">
                    Sign Up
                  </button>
                </a>

                <a href="http://portal.nuqiwealth.com/signin" target="_blank" rel="noopener noreferrer">
                  <button className="w-full mt-3 px-4 py-2 text-sm font-semibold text-white bg-transparent border border-cyan-400 rounded-xl hover:bg-cyan-400 hover:text-black">
                    Login
                  </button>
                </a>
              </div>
            </Popover.Panel>
          </Transition.Child>
        </Transition.Root>
      </Popover>
    </div>
  );
}

function CountrySelect() {
  return (
    <div className="flex items-center justify-center">
      <Select
        onValueChange={(value) => {
          if (value === "india") {
            window.location.href = "https://in.nuqiwealth.com/";
          } else {
            window.location.href = "https://uae.nuqiwealth.com/";
          }
        }}
      >
        <SelectTrigger className="w-full bg-black text-white border border-cyan-400 rounded-3xl hover:bg-cyan-400 hover:text-black transition-all duration-200">
          {/* Default globe icon */}
          <Globe className="text-white" />
        </SelectTrigger>
        <SelectContent className="bg-black text-white border border-cyan-400 rounded-xl">
          <SelectItem value="india">
            <div className="flex items-center">
              <img
                className="w-6 h-6 object-contain mr-2"
                src="/india.jpg"
                alt="India"
              />
              India
            </div>
          </SelectItem>
          <SelectItem value="uae">
            <div className="flex items-center">
              <img
                className="w-6 h-6 object-contain mr-2"
                src="/uae.jpg"
                alt="UAE"
              />
              UAE
            </div>
          </SelectItem>


        </SelectContent>
      </Select>
    </div>
  );
}


// Home Logo Component
function HomeLogo() {
  return (
    <Link to="/" className="block">
      <img
        src="/logo2.png"
        alt="Nuqi Logo"
        className="h-8 sm:h-10 md:h-12 w-auto lg:ml-20 object-contain"
      />
    </Link>
  );
}

// Main Navbar Component
export function Navbar() {
  const { activeTab } = useActiveTab();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      target?.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeTab]);

  return (
    <header className="fixed top-0 w-full z-50 bg-black backdrop-blur-xl bg-opacity-50 border-opacity-50 border-b-[1px] border-[#4d4d4d] shadow-lg">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between font-poppins">
        {/* Logo */}
        <div className="flex-shrink-0">
          <HomeLogo />
        </div>

        {/* Desktop Navigation (Visible only on desktop) */}
        <div className="hidden lg:flex flex-grow justify-center">
          <DesktopNavigation />
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3 lg:space-x-4 lg:mr-5">
          {/* User Icon with Dropdown for Mobile */}
          <div className="lg:hidden relative">
            <Popover>
              <Popover.Button>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black border border-cyan-500 text-white cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="white"
                    viewBox="0 0 24 24"
                    stroke="none"
                  >
                    <path d="M12 12c2.28 0 4-1.72 4-4s-1.72-4-4-4-4 1.72-4 4 1.72 4 4 4zm0 2c-3.31 0-10 1.67-10 5v1h20v-1c0-3.33-6.69-5-10-5z" />
                  </svg>
                </div>
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel className="absolute z-10 justify-center items-center -mr-6  w-24 h-16 sm:-mt-3 bg-black border border-cyan-400 rounded-2xl shadow-lg top-full right-0">
                  <div className="flex flex-col py-2">
                    <a href="http://portal.nuqiwealth.com/signin" target="_blank" rel="noopener noreferrer">
                      <button className="flex items-center px-4 py-1 text-sm text-white hover:bg-cyan-400 hover:text-black">
                        <span className="ml-2">Login</span>
                      </button>
                    </a>
                    <a href="http://portal.nuqiwealth.com/signup" target="_blank" rel="noopener noreferrer">
                      <button className="flex items-center px-4 py-1 text-sm text-white hover:bg-cyan-400 hover:text-black">
                        <span className="ml-2">Sign Up</span>
                      </button>
                    </a>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          </div>

          {/* Mobile Navigation (Hamburger Menu) */}
          <div className="lg:hidden order-3">
            <MobileNavigation />
          </div>
          <div className="lg:hidden">
            <CountrySelect />
          </div>

          {/* Sign Up & Login for Desktop */}
          <div className="hidden lg:flex space-x-4 order-2">
            <a href="http://portal.nuqiwealth.com/signup" target="_blank" rel="noopener noreferrer">
              <button className="px-3 py-2 text-sm font-semibold text-black bg-cyan-400 rounded-xl whitespace-nowrap hover:text-black">
                Sign Up
              </button>
            </a>

            <a href="http://portal.nuqiwealth.com/signin" target="_blank" rel="noopener noreferrer">
              <button className="px-3 py-2 text-sm font-semibold text-white bg-transparent border border-cyan-400 rounded-xl hover:bg-cyan-400 hover:text-black">
                Login
              </button>
            </a>

            <div className="flex lg:ml-4">
              <CountrySelect />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}


