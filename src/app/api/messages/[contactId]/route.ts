import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { contactId: string } }
) {
  console.log("API MESSAGES PARAMS:", params);

  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const currentUserId = session.user.id;
  const contactId = Number(params.contactId); 

  if (!contactId || isNaN(contactId)) {
    return new NextResponse("Invalid Contact ID", { status: 400 });
  }

  try {
    const messages = await prisma.messages.findMany({
      where: {
        OR: [
          { sender_id: currentUserId, receiver_id: contactId },
          { sender_id: contactId, receiver_id: currentUserId },
        ],
      },
      include: {
        userSender: true,
      },
      orderBy: {
        timestamp: "asc",
      },
    });

    const formattedMessages = messages.map((msg) => ({
      id: msg.id.toString(),
      text: msg.content,
      timestamp: new Date(msg.timestamp).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      user: {
        id: msg.userSender.id.toString(),
        name: msg.userSender.name!,
        image: `https://ui-avatars.com/api/?name=${msg.userSender.name}`,
      },
    }));

    return NextResponse.json(formattedMessages);
  } catch (error) {
    console.error("GET_MESSAGES_ERROR:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}