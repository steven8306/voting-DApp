import Link from "next/link";
import React, { FC, useState } from "react";
import { KeyedMutator } from "swr";
import { UserEntity } from "../../types";
import { Logo } from "../Logo";
import { LogoutAlert } from "../LogoutAlert";
import { EditProfileButton } from "./EditProfileButton";
import { MobileMenu } from "./MobileMenu";

interface Props {
  user?: UserEntity;
  mutate: KeyedMutator<UserEntity>;
}

const Authenticated: FC<Props> = ({ user, mutate }) => {
  const [isLogoutOpen, setIsLogoutOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const { name, walletAddress, isSeller } = user || {};

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isProfileCompleted = !(!user?.name && user?.walletAddress);

  const mobileMenuProps = { isMenuOpen, setIsMenuOpen, isProfileCompleted };
  const editProfileButtonProps = {
    name,
    walletAddress,
    mutate,
    setIsLogoutOpen,
  };
  const logoutAlertProps = {
    isOpen: isLogoutOpen,
    setIsOpen: setIsLogoutOpen,
    isCentered: true,
  };

  return (
    <div
      className={`fixed z-50 flex items-center justify-between h-16 md:h-20 w-screen px-6 transition-all duration-200 ease-in-out ${
        isMenuOpen ? "bg-none" : "bg-white shadow-lg shadow-gray-100"
      }`}
    >
      {/* Left */}
      <div className="z-50 flex flex-row h-full items-center">
        <>
          <div className="relative aspect-square h-1/2 w-auto mr-3">
            <Logo />
          </div>
          <h1 className="text-xl font-Basic text-primary">Tri Payments</h1>
        </>
        <div className="hidden md:flex md:mx-10">
          <Link href="/explore">
            <button className="font-Basic text-primary mx-4">Explore</button>
          </Link>
          <Link href="/tokens">
            <button className="font-Basic text-primary mx-4">My tokens</button>
          </Link>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-row ml-auto">
        {/* Mobile only menu */}
        <button onClick={toggleMenu} className="md:hidden text-3xl">
          <MobileMenu {...mobileMenuProps} />
        </button>

        {isProfileCompleted ? (
          <div className="hidden md:flex flex-row h-full items-center mx-6">
            {!user ? (
              <div className="animate-pulse flex items-center space-x-6">
                <div className="h-5 w-28 bg-slate-300 rounded"></div>
                <div className="h-8 w-36 bg-slate-300 rounded-full"></div>
              </div>
            ) : (
              <>
                <EditProfileButton {...editProfileButtonProps} />
                {isSeller ? (
                  <Link href="/dashboard">
                    <button className="font-Basic text-sm text-white bg-primary px-6 py-1.5 ml-2 rounded-full hover:bg-secondary">
                      Seller dashboard
                    </button>
                  </Link>
                ) : (
                  <Link href="/register">
                    <button className="font-Basic text-sm text-white bg-primary px-6 py-1.5 ml-2 rounded-full hover:bg-secondary">
                      Become a seller
                    </button>
                  </Link>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="hidden md:flex flex-row h-full items-center mx-6">
            <Link href="/register">
              <button className="font-Basic text-sm text-white bg-primary px-6 py-1.5 ml-2 rounded-full hover:bg-secondary">
                Complete your profile
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Logout Modal */}
      <LogoutAlert {...logoutAlertProps} />
    </div>
  );
};

export { Authenticated };