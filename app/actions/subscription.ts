"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function cancelSubscription() {
  const currentUser = await getCurrentUser();
  await db.user.update({
    where: { id: currentUser?.id },
    data: {
      subscriptionPlan: "FREE",
    },
  });
}
