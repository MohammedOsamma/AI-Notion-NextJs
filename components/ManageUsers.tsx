"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { FormEvent, useState ,useTransition } from "react";
import {Button} from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { inviteUserToDocument, removeUserFormDocument } from "@/actions/actions";
import {toast} from "sonner";
import { useUser } from "@clerk/nextjs";
import { useRoom } from "@liveblocks/react/suspense";
import useOwner from "@/lib/useOwner";
import { useCollection } from "react-firebase-hooks/firestore";
import { collectionGroup, query, where } from "firebase/firestore";
import { db } from "@/firebase";

function ManageUsers() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending , startTransition] = useTransition();
  const {user} = useUser();
  const room = useRoom();
  const isOwner = useOwner()

  const [usersInRoom ]= useCollection(
    user && query(collectionGroup(db,'rooms'),where('roomId' , '==' , room.id))
  )

  const handleDelete =  (userId: string )=>{
   startTransition( ()=>{
    (async ()=>{
        if(!user) return;
        const {success} = await removeUserFormDocument(room.id , userId);
        if(success){
            return toast.success("User removed from room successfully!");
        }else{
            return toast.error("Failed to remove user from room!");
        }

   })();
   })
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant={"outline"}>
        <DialogTrigger>Users({usersInRoom?.docs.length})</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Users With Access</DialogTitle>
          <DialogDescription>
          Below is a list of users who have access to this docuemnt. 
          </DialogDescription>
        </DialogHeader>
        <hr className="my-2" />
        <div className="flex flex-col space-y-2">
          {usersInRoom?.docs.map((doc)=>(
            <div key={doc.data().userId} className="flex items-center justify-between">
                <p>
                   {doc.data().userId === user?.emailAddresses[0].toString()
                   ?`You (${doc.data().userId})`
                   :doc.data().userId} 
                </p>
                <div className="flex items-center gap-2">
                    <Button variant={"outline"}>{doc.data().role}</Button>
                    {
                        isOwner && doc.data().userId !== user?.emailAddresses[0].toString() 
                        &&(
                            <Button 
                            onClick={()=>handleDelete(doc.data().userId)}
                            variant={"destructive"}
                            disabled={isPending}
                            size="sm"
                            >{isPending ? "Removing ...":"X"}</Button>
                        )
                    }
                </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default ManageUsers;
