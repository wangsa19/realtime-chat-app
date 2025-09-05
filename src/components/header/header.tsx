import Image from "next/image";
import React, { FC } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { MoreHorizontal, SearchIcon } from "lucide-react";

interface HeaderProps {}
const Header: FC<HeaderProps> = ({}) => {
  return (
    <header className="w-full h-auto md:h-24 rounded-xl bg-transparent">
      <section className="bg-white w-full h-full rounded-xl shadow-md border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 p-4 md:px-6">
        {/* Left */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Image
            src="https://ui-avatars.com/api/?name=John+Doe"
            alt="Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h6 className="font-semibold text-base md:text-lg">John Doe</h6>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <Button
            className="font-medium text-sm md:text-base rounded-full px-4 md:w-24 h-10 md:h-12"
            variant={"outline"}
          >
            Profile
          </Button>
          <Button className="font-medium text-sm md:text-base rounded-full px-4 md:w-24 h-10 md:h-12 bg-black hover:bg-black/90">
            Call
          </Button>
          <div className="h-5">
            <Separator orientation="vertical" />
          </div>
          <div className="flex gap-2">
            <SearchIcon className="w-5 h-5 md:w-6 md:h-6" />
            <MoreHorizontal className="w-5 h-5 md:w-6 md:h-6" />
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
