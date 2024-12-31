"use client";

import { useTransition, useState, FormEvent, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Editor from "./Editor";
import useOwner from "../lib/useOwner";
import DeleteDocument from "./DeleteDocument";
import InviteUser from "./InviteUser";
import ManageUsers from "./ManageUsers";
import Avatars from "./Avatars";
function Document({ id }: { id: string }) {
  const [input, setInput] = useState("");
  const [isUpdate, startTransition] = useTransition();
  const [data, error, loading] = useDocumentData(doc(db, "documents", id));
  const isOwner = useOwner();

  // To Put The Title Of Doc in Input when Refresh
  useEffect(() => {
    if (data) {
      setInput(data.title);
    }
  }, [data]);

  // Form Submit Functions
  const updateTitle = (e: FormEvent) => {
    e.preventDefault();

    if (input.trim()) {
      startTransition(async () => {
        await updateDoc(doc(db, "documents", id), {
          title: input,
        });
      });
    }
  };

  return (
    <div className="flex-1 h-full bg-white p-5">
      <div className="flex max-w-6xl mx-auto  justify-center pb-5">
        <form className="flex flex-1 space-x-2" onSubmit={updateTitle}>
          <Input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <Button disabled={isUpdate} type="submit">
            {isUpdate ? "Updataing..." : "Update"}
          </Button>
          {isOwner && (
            <>
             <InviteUser />
              <DeleteDocument />
            </>
          )}
        </form>
      </div>
      <div className="flex max-w-6xl mx-auto justify-between items-center mb-5">
        {/* ManageUsers */}
        <ManageUsers />
        {/* Avatars */}
        <Avatars />
        
      </div>
      <hr className="pb-10" />
      <Editor />
      {/* Collabrative Editor  */}
    </div>
  );
}

export default Document;
