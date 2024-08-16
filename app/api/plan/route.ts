import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const currentUser = await getCurrentUser();

  const status = await db.user.findUnique({
    where: {
      id: currentUser.id,
    },
    select: {
      subscriptionPlan: true,
    },
  });
  return NextResponse.json(status, { status: 200 });
}

export async function POST(req: NextRequest) {
  const currentUser = await getCurrentUser();

  await db.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      subscriptionPlan: "PRO",
    },
  });
  return NextResponse.json(
    { message: "Plan updated successfully" },
    { status: 204 },
  );
}
