import Image from "next/image";
import React, { FC } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { MoreHorizontal, SearchIcon } from "lucide-react";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <>
      <header className="w-full h-24 rounded-xl bg-transparent pb-2">
        <section className="bg-white w-full h-full rounded-xl shadow-md border border-slate-200 flex justify-center items-center gap-4">
          <div className="flex w-full h-full items-center gap-2 px-6">
            <Image
              src="https://ui-avatars.com/api/?name=John+Doe"
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex flex-col overflow-hidden">
              <h6 className="font-semibold text-lg">John Doe</h6>
            </div>
            <div className="ms-auto flex gap-2">
              <Button
                className="font-medium text-base rounded-full w-24 h-12"
                variant={"outline"}
              >
                Profile
              </Button>
              <Button className="font-medium text-base rounded-full w-24 h-12 bg-black hover:bg-black/90">
                Call
              </Button>
            </div>
            <div className="h-5">
              <Separator orientation="vertical" />
            </div>
            <div className="flex gap-2">
                <SearchIcon/>
                <MoreHorizontal/>
            </div>
          </div>
        </section>
      </header>
    </>
  );
};

export default Header;
