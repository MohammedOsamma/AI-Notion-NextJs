import { useOthers, useSelf } from '@liveblocks/react/suspense'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


function Avatars() {
   const self = useSelf();
   const others = useOthers();

   const all =[self , ...others];
   
   
    useOthers();
  return (
    <div className='flex items-center gap-2'>
        <p className='font-light text-sm'>Users currently editing this page</p>
        <div className='flex -space-x-5'>
    {all.map((other,index)=>(
        <TooltipProvider key={other?.id + index}>
        <Tooltip>
          <TooltipTrigger>
          <Avatar className='border-2 hover:z-50'>
                <AvatarImage src={other?.info.avatar} />
                <AvatarFallback>
                  {other?.info.name}
                </AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>
            {self?.id === other?.id ? "You":other?.info.name}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
    ))}
        </div>
    </div>
  )
}

export default Avatars