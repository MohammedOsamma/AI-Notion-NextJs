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
import { inviteUserToDocument } from "@/actions/actions";
import {toast} from "sonner";
import { Input } from "./ui/input";

function InviteUser() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isPending , startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();


  const handleInvite = async (e:FormEvent)=>{
    e.preventDefault();
    const roomId = pathname.split("/").pop();
    if(!roomId) return;

    startTransition(async ()=>{
        const {success} = await inviteUserToDocument(roomId,email);

        if(success){
            setIsOpen(false);
           setEmail('');
            toast.success("User Added To Room Successfully!");

        }else{
            toast.error("Faild to Add User To Room! ");
        }
    })
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant={"outline"}>
        <DialogTrigger>Invite</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite a User To Collaborate! </DialogTitle>
          <DialogDescription>
          Enter The Email of The User You Want To Invite.  
          </DialogDescription>
        </DialogHeader>
      <form className ="flex gap-2" onSubmit={handleInvite}>
        <Input type="email" placeholder="Email" className="w-full" value ={email} onChange={(e)=> setEmail(e.target.value)} />
        <Button type="submit" disabled ={!email||isPending}>{isPending ? "Inviting ...": "Invite"}</Button>
      </form>
      </DialogContent>
    </Dialog>
  );
}
export default InviteUser;
