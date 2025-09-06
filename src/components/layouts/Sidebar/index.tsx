"use client";

import { PlusIcon } from "lucide-react";
import Image from "next/image";
import React, { FC } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {
  return (
    <aside className="w-full md:w-1/3 lg:w-1/4 bg-transparent h-auto md:h-screen ps-2 py-2">
      <div className="w-full h-full flex flex-col gap-2">
        <section className="bg-white w-full h-auto md:h-24 rounded-xl shadow-md border border-slate-200 p-4 flex flex-col md:flex-row justify-center items-center gap-4">
          <h2 className="font-semibold text-xl md:text-2xl">Chat</h2>
          <Input
            placeholder="Search"
            className="h-10 md:h-12 rounded-full px-4 placeholder:text-sm md:placeholder:text-base flex-1"
          />
          <PlusIcon className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-full text-white flex-none p-1 cursor-pointer" />
        </section>

        <section className="bg-white w-full flex-1 rounded-xl shadow-md border border-slate-200 px-4 md:px-6 py-4 flex flex-col gap-2">
          <h5 className="text-secondary-foreground font-normal text-sm md:text-base">
            All
          </h5>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex w-full items-center gap-2 border-b-2 border-b-slate-200 pb-2">
              <Image
                src="https://ui-avatars.com/api/?name=John+Doe"
                alt="Avatar"
                width={40}
                height={40}
                className="rounded-full flex-none"
              />
              <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                <h6 className="font-medium text-sm md:text-base truncate">
                  John Doe
                </h6>
                <p className="text-xs text-muted-foreground truncate">
                  Hey there, I'm having trouble open...
                </p>
              </div>
              <div className="flex flex-col items-end gap-1 flex-none">
                <h6 className="font-normal text-xs md:text-sm text-secondary-foreground whitespace-nowrap">
                  11:24 AM
                </h6>
                <Badge
                  variant="default"
                  className="w-5 h-5 text-xs rounded-full"
                >
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
