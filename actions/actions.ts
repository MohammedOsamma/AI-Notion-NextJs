"use server";
import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";

export async function createNewDocument() {
  auth.protect();
  const { sessionClaims } = await auth();

  // Ensure the sessionClaims exist before proceeding
  if (!sessionClaims?.email || typeof sessionClaims?.email !== "string") {
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

    return {sucess:false};
  }
  
}

export async function inviteUserToDocument(roomId:string , email:string){
  auth.protect();
  
  try{
    await adminDb.collection("users")
    .doc(email)
    .collection("rooms")
    .doc(roomId)
    .set({
      userId:email,
      role:"editor",
      createdAt:new Date(),
      roomId,
    })
    return {success :true};
  }catch(error){
  
    return{success :false};
  }
}

export async function removeUserFormDocument(roomId: string  ,email: string  ){
try{
  auth.protect();

  await adminDb.collection("users")
  .doc(email)
  .collection('rooms')
  .doc(roomId)
  .delete();

  return {success:true};
}catch(error){
  return {success :false };
}
}