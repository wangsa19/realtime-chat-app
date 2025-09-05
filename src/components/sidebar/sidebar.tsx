"use client";

import { PlusIcon } from "lucide-react";
import Image from "next/image";
import React, { FC } from "react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {
  return (
    <aside className="w-1/4 bg-transparent h-screen ps-2 py-2">
      <div className="w-full h-full flex flex-col gap-2">
        <section className="bg-white w-full h-24 rounded-xl shadow-md border border-slate-200 p-4 flex justify-center items-center gap-4">
          <h2 className="font-semibold text-2xl">Chat</h2>
          <Input
            placeholder="Search"
            className="h-12 rounded-full px-4 placeholder:text-base"
          />
          <PlusIcon className="w-10 h-10 bg-primary rounded-full text-white flex-none p-1 cursor-pointer" />
        </section>
        <section className="bg-white w-full h-full rounded-xl shadow-md border border-slate-200 px-6 py-4 flex flex-col gap-2">
          <h5 className="text-secondary-foreground font-normal">All</h5>
          <div className="flex flex-col gap-4 w-full h-24">
            <div className="flex w-full h-full items-center gap-2 border-b-2 border-b-slate-200">
              <Image
                src="https://ui-avatars.com/api/?name=John+Doe"
                alt="Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col overflow-hidden">
                <h6 className="font-medium text-base">John Doe</h6>
                <p className="text-xs truncate">Hey there, I'm having trouble open...</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <h6 className="font-normal text-sm text-secondary-foreground whitespace-nowrap">
                  11:24 AM
                </h6>
                <Badge variant="default" className="w-5 h-5 text-xs rounded-full">
                  3
                </Badge>
              </div>
            </div>
          </div>
        </section>
      </div>
    </aside>
  );
};

export default Sidebar;
