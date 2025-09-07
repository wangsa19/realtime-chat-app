"use client";

import Image from "next/image";
import React, { FC } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogOut, Menu, MoreHorizontal, SearchIcon } from "lucide-react";
import { ContactUser } from "../Sidebar";

interface HeaderProps {
  contact: ContactUser;
  onMenuClick: () => void;
}

const Header: FC<HeaderProps> = ({ contact, onMenuClick }) => {
  return (
    <header className="w-full rounded-xl bg-transparent">
      <section className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-md md:px-6">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          {/* Hamburger Button for mobile */}
          <Button
            onClick={onMenuClick}
            variant="ghost"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu />
          </Button>
          <div className="flex items-center gap-3">
            <Image
              src={`https://ui-avatars.com/api/?name=${
                contact.name || contact.email
              }`}
              alt={contact.name || "Avatar"}
              width={48}
              height={48}
              className="rounded-full"
            />
            <h6 className="font-semibold text-lg">{contact.name}</h6>
          </div>
        </div>

        {/* Right Side */}
        <div className="items-center gap-2 flex">
          <Button
            className="h-12 rounded-full px-4 font-medium md:w-24"
            variant={"outline"}
          >
            Profile
          </Button>
          <Button className="h-12 rounded-full bg-black px-4 font-medium hover:bg-black/90 md:w-24">
            Call
          </Button>
          <div className="h-5">
            <Separator orientation="vertical" />
          </div>
          <div className="flex gap-2">
            <SearchIcon className="h-6 w-6" />
            <MoreHorizontal className="h-6 w-6" />
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
