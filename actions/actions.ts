"use server";
import { adminDb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";

export async function createNewDocument() {
  const { sessionClaims } = await auth();

  // Ensure the sessionClaims exist before proceeding
  if (!sessionClaims || !sessionClaims.email) {
    throw new Error("User not authenticated or email not found");
  }

  const docCollectionRef = adminDb.collection("documents");
  const docRef = await docCollectionRef.add({
    title: "New Doc",
  });

  await adminDb
    .collection("users")
    .doc(sessionClaims.email)
    .collection("rooms")
    .doc(docRef.id)
    .set({
      userId: sessionClaims.email,
      role: "owner",
      createdAt: new Date(), // Corrected "new Data()" to "new Date()"
      roomId: docRef.id,
    });

  return { docId: docRef.id };
}
