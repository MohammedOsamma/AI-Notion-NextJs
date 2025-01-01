import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";
import { use } from "react";


  function DocLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params:Promise<{id:string}>;
}) {
  auth.protect();
  const { id } = use(params);
  
  return <RoomProvider roomId={id}>{children}</RoomProvider>;
}

export default DocLayout;
