import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest): Promise<NextResponse> { 
    const currentUser = await getCurrentUser();
    await db.user.delete({
        where: {
            id: currentUser.id,
        },
    });
    return NextResponse.json(
        { status: 200 },
      );
}