"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Logo } from "./Logo";
import { AuthModal } from "./AuthModal";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Hardcoded navigation items - no Prismic connection
  const navigationItems = [
    { text: "Home", href: "/" },
    { text: "Packages", href: "/packages" },
    { text: "Campaigns", href: "/campaigns" },
    { text: "About", href: "/about" },
  ];

  return (
    <>
    <header className="header absolute left-0 right-0 top-0 z-50 ~h-32/48 ~px-4/6 ~py-4/6 hd:h-32">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[auto,auto] items-center gap-6 md:grid-cols-[1fr,auto,1fr]">
        <Link href="/" className="justify-self-start">
          <Logo className="text-brand-purple ~h-12/20" />
        </Link>
        <nav
          aria-label="Main"
          className="col-span-full row-start-2 md:col-span-1 md:col-start-2 md:row-start-1"
        >
          <ul className="flex flex-wrap items-center justify-center gap-8">
            {navigationItems.map((item) => (
              <li key={item.text}>
                <Link href={item.href} className="~text-lg/xl">
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="justify-self-end flex items-center gap-4">
          {/* Cart Button */}
          <button
            className="button-cutout group inline-flex items-center justify-center bg-gradient-to-b from-brand-orange to-brand-lime from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom text-black hover:text-black w-12 h-12"
            aria-label="Cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </button>

          {/* Login/User Button */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <span className="text-brand-purple font-bold">
                {user.username}
              </span>
              <button
                onClick={logout}
                className="button-cutout group inline-flex items-center bg-gradient-to-b from-red-500 to-red-700 from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom text-white px-4 py-2 text-base"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="button-cutout group inline-flex items-center bg-gradient-to-b from-brand-purple to-brand-lime from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom text-white hover:text-black gap-3 px-6 py-3 text-lg"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>

    <AuthModal
      isOpen={isAuthModalOpen}
      onClose={() => setIsAuthModalOpen(false)}
    />
    </>
  );
}
