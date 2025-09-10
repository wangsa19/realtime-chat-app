import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { MessageStatus } from "@prisma/client";

export async function GET(
  _request: Request,
  { params }: { params: { contactId: string } }
) {
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
    const [_, messages] = await prisma.$transaction([
      prisma.messages.updateMany({
        where: {
          sender_id: contactId,
          receiver_id: currentUserId,
          status: { not: "READ" },
        },
        data: {
          status: "READ",
        },
      }),
      prisma.messages.findMany({
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
      }),
    ]);

    const formattedMessages = messages.map((msg) => ({
      id: msg.id.toString(),
      text: msg.content,
      timestamp: new Date(msg.timestamp).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: msg.status as MessageStatus,
      user: {
        id: msg.userSender.id.toString(),
        name: msg.userSender.name!,
        image: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          msg.userSender.name || "User"
        )}`,
      },
    }));

    return NextResponse.json(formattedMessages);
  } catch (error) {
    console.error("GET_MESSAGES_ERROR:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}