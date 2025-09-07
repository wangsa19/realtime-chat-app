import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  console.log(
    "Session User ID:",
    session.user.id,
    "Type:",
    typeof session.user.id
  );

  const currentUserId = session.user.id;

  if (!currentUserId) {
    return new NextResponse("User ID not found in session", { status: 400 });
  }

  try {
    const contactsRelations = await prisma.contact.findMany({
      where: {
        OR: [{ requesterId: currentUserId }, { addresseeId: currentUserId }],
      },
      include: {
        requester: {
          select: { id: true, name: true, email: true, phoneNumber: true },
        },
        addressee: {
          select: { id: true, name: true, email: true, phoneNumber: true },
        },
      },
    });

    const contacts = contactsRelations.map((relation) => {
      if (relation.requesterId === currentUserId) {
        return relation.addressee;
      } else {
        return relation.requester;
      }
    });

    return NextResponse.json(contacts);
  } catch (error) {
    console.error("GET_CONTACTS_ERROR:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
