

import {Button} from "./button";
import {DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger} from "./drawer";
import {Drawer} from "vaul";


export default function PdfDialog({trigger, url}) {
    return(<div><a className="hover:text-blue-900"
                                    href={url}
                                    target="_blank"
                                >
                                    {url}
                                </a></div>)
    // return (
    //     <Drawer direction="left">
    //         <DrawerTrigger>{trigger}</DrawerTrigger>
    //         <DrawerContent className="w-3/5 mt-24 h-full max-h-[96%] ">
    //             <DrawerHeader className="flex justify-between">
    //                 <div className="space-y-2">
    //                     <DrawerTitle>PDF Content</DrawerTitle>
    //                     <DrawerDescription>
    //                         File URL:
    //                         <a className="hover:text-blue-900"
    //                             href={url}
    //                             target="_blank"
    //                         >
    //                             {url}
    //                         </a>
    //                     </DrawerDescription>
    //                 </div>
    //                 <DrawerClose asChild>
    //                     <Button variant="outline">Close</Button>
    //                 </DrawerClose>
    //             </DrawerHeader>
    //         </DrawerContent>
    //     </Drawer>
    // );
}
