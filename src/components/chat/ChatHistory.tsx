import React from "react";
import Image from "next/image";
import { Check, PlayCircle } from "lucide-react";

const ChatHistory = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section
      className="flex-1 overflow-y-auto p-6 space-y-6 bg-white rounded-xl shadow-md border border-slate-200"
      ref={ref}
    >
      <div className="flex justify-center">
        <div className="bg-white border border-slate-300 text-gray-600 text-sm rounded-full px-4 py-2">
          10 June, 2022
        </div>
      </div>

      <div className="flex justify-end">
        <div className="bg-orange-500 text-white p-3 rounded-lg max-w-xs relative">
          <p>Okay, it's almost ready.</p>
          <div className="flex items-center justify-end text-xs text-orange-200 mt-1">
            <span>5:12 PM</span>
            <Check size={16} className="ml-1" />
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <Image
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          alt="Avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex flex-col gap-2">
          <div className="bg-gray-200 p-3 rounded-lg max-w-xs">
            <p>How about these pictures?</p>
          </div>

          <div className="grid grid-cols-2 grid-rows-2 gap-2 max-w-xs">
            <div className="row-span-2">
              <Image
                src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400"
                alt="Image 1"
                width={200}
                height={200}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
            <Image
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
              alt="Image 2"
              width={100}
              height={100}
              className="rounded-lg object-cover w-full h-full"
            />
            <Image
              src="https://images.unsplash.com/photo-1506792006437-256b665541e2?w=400"
              alt="Image 3"
              width={100}
              height={100}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <div className="bg-orange-500 text-white p-3 rounded-lg max-w-xs relative">
          <p>Looks cool, can you find more options?</p>
          <div className="flex items-center justify-end text-xs text-orange-200 mt-1">
            <span>5:12 PM</span>
            <Check size={16} className="ml-1" />
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <Image
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          alt="Avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex flex-col gap-2">
          <div className="bg-gray-200 p-3 rounded-lg max-w-xs">
            <p>Sure, but I'm busy right now.</p>
          </div>

          <div className="bg-gray-200 p-2 rounded-lg max-w-xs flex items-center gap-2">
            <PlayCircle className="text-gray-600" />
            <div className="flex items-center gap-0.5 h-6">
              <span className="w-0.5 h-full bg-gray-400 rounded-full"></span>
              <span className="w-0.5 h-2/5 bg-gray-400 rounded-full"></span>
              <span className="w-0.5 h-4/5 bg-gray-400 rounded-full"></span>
              <span className="w-0.5 h-3/5 bg-gray-400 rounded-full"></span>
              <span className="w-0.5 h-full bg-gray-400 rounded-full"></span>
              <span className="w-0.5 h-1/2 bg-gray-400 rounded-full"></span>
              <span className="w-0.5 h-full bg-gray-400 rounded-full"></span>
              <span className="w-0.5 h-4/5 bg-gray-400 rounded-full"></span>
            </div>
            <span className="text-sm text-gray-600">0:24</span>
          </div>
        </div>
      </div>
    </section>
  );
});

ChatHistory.displayName = "ChatHistory"; // Good practice for debugging with React DevTools

export default ChatHistory;
