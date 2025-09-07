"use client";

import { LogOut, PlusIcon, X } from "lucide-react";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useSession, signOut } from "next-auth/react";

export interface ContactUser {
  id: number;
  name: string | null;
  email: string;
}

interface SidebarProps {
  onSelectContact: (contact: ContactUser) => void;
  selectedContactId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: FC<SidebarProps> = ({
  onSelectContact,
  selectedContactId,
  isOpen,
  onClose,
}) => {
  const [contacts, setContacts] = useState<ContactUser[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchContacts = async () => {
      if (session) {
        try {
          const response = await fetch("/api/contacts");
          if (response.ok) setContacts(await response.json());
        } catch (error) {
          console.error("Failed to fetch contacts:", error);
        }
      }
    };
    fetchContacts();
  }, [session]);

  const handleLogout = () => {
    signOut({ callbackUrl: "/signin" });
  };

  return (
    <aside
      className={`
        absolute md:relative top-0 left-0 w-full max-w-xs md:w-1/3 lg:w-1/4 h-full flex-col p-2 gap-2 bg-slate-100
        transition-transform duration-300 ease-in-out z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:flex
      `}
    >
      {/* Bagian Atas: Header dan Search */}
      <section className="bg-white rounded-xl shadow-md border p-4 flex items-center gap-4">
        <h2 className="font-semibold text-xl md:text-2xl">Chat</h2>
        <div className="relative flex-1">
          <Input placeholder="Search" className="h-12 rounded-full px-4" />
        </div>
        <button onClick={onClose} className="md:hidden">
          <X size={24} />
        </button>
      </section>

      {/* Bagian Tengah: Daftar Kontak (bisa scroll) */}
      <section className="my-2 md:my-0 bg-white w-full flex-1 rounded-xl shadow-md border p-4 flex flex-col gap-2 overflow-y-auto">
        <h5 className="font-normal text-sm px-2">All Contacts</h5>
        <div className="flex flex-col gap-1 w-full">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => onSelectContact(contact)}
              className={`flex w-full items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                selectedContactId === contact.id
                  ? "bg-orange-100"
                  : "hover:bg-slate-100"
              }`}
            >
              <Image
                src={`https://ui-avatars.com/api/?name=${
                  contact.name || contact.email
                }`}
                alt="Avatar"
                width={40}
                height={40}
                className="rounded-full flex-none"
              />
              <div className="flex-1 min-w-0">
                <h6 className="font-semibold text-sm truncate">
                  {contact.name || "No Name"}
                </h6>
                <p className="text-xs text-muted-foreground truncate">
                  Last message...
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bagian Bawah: Tombol Logout */}
      <section className="bg-white rounded-xl shadow-md border p-2 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-semibold text-sm">Logout</span>
        </button>
      </section>
    </aside>
  );
};

export default Sidebar;
