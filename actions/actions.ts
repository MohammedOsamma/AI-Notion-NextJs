"use server";
import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";

export async function createNewDocument() {
  auth.protect();
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
    .doc(sessionClaims?.email)
    .collection("rooms")
    .doc(docRef.id)
    .set({
      userId: sessionClaims?.email,
      role: "owner",
      createdAt: new Date(), // Corrected "new Data()" to "new Date()"
      roomId: docRef.id,
    });

  return  docRef.id ;
}

export async function deleteDocument(roomId:string){
  // we delete documnet referance itself 
  auth.protect();
  console.log("deleteDocument" , roomId);

  try {

    await adminDb.collection('documents').doc(roomId).delete();
    const query =await adminDb.collectionGroup("rooms").where("roomId","==",roomId).get(); 
    const batch = adminDb.batch();

  // delete doucment the room referance in user's collection for every user in the room  
    query.docs.forEach((doc)=>{
      batch.delete(doc.ref);
    })

    await batch.commit();
    await liveblocks.deleteRoom(roomId);
    return {success :true };
  }catch(error){
    console.log(error);
    return {sucess:false};
  }
  
}