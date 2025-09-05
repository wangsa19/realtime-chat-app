import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Send, Smile, Mic } from "lucide-react";

export default function MessageInput() {
  return (
    <section className="bg-white rounded-xl shadow-md border border-slate-200 p-4">
      <div className="bg-white w-full h-full rounded-xl flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-gray-500">
          <Paperclip />
        </Button>
        <Input
          placeholder="Write messages..."
          className="flex-1 bg-slate-100 border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full h-12 px-4"
        />
        <Button variant="ghost" size="icon" className="text-gray-500">
          <Smile />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-500">
          <Mic />
        </Button>
        <Button className="bg-orange-500 hover:bg-orange-600 rounded-full w-12 h-12">
          <Send className="text-white text-center" />
        </Button>
      </div>
    </section>
  );
}
