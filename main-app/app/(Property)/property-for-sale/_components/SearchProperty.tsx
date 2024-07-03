"use client";
import { SearchQueryParameterSchema } from "@/app/_components/SearchFilters";
import { GetSearch } from "@/app/api/(userActions)/actions";
import { PropertyCard } from "@/components/PropertyCard";
import { SearchBar } from "@/components/SearchBar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { PuffLoader } from "react-spinners";
import useSWR from "swr";
import { z } from "zod";

export default function SearchProperty() {
  //   const searchParams = useSearchParams();

  //   const searchQuery: z.infer<typeof SearchQueryParameterSchema> = {
  //     price: parseInt(searchParams.get("price") || "0"),
  //     bathrooms: parseInt(searchParams.get("bathrooms") || "0"),
  //     bedrooms: parseInt(searchParams.get("bedrooms") || "0"),
  //   };

  //   console.log("Search Query: ", searchQuery);

  //   const [isEmpty, setIsEmpty] = useState(false);
  //   const { data, isLoading } = useSWR(
  //     "search-properties",
  //     GetSearch({
  //       query: searchQuery,
  //     }),
  //     {
  //       onError: (error) => {
  //         console.log("Recieved Error: ", error as Error);
  //       },
  //     }
  //   );

  //   // console.log("Received Data: ", data);

  //   // function filterProperties(data: PropertyWithAddress[]) {
  //   //   setIsEmpty(false);
  //   //   let filteredProperty: PropertyWithAddress[] = data;

  //   //   // const bedrooms = parseInt(searchParams.get("bedrooms") || "0");
  //   //   // const bathrooms = parseInt(searchParams.get("bathrooms ") || "0");

  //   //   if (bedrooms && bedrooms > 0) {
  //   //     filteredProperty = filteredProperty.filter(
  //   //       (prop) => prop.bedrooms === bedrooms
  //   //     );
  //   //   }

  //   //   // if (bathrooms && bathrooms > 0) {
  //   //   //   filteredProperty = filteredProperty.filter(
  //   //   //     (prop) => prop.bathrooms === bathrooms
  //   //   //   );
  //   //   // }

  //   //   if (filteredProperty.length === 0) {
  //   //     filteredProperty = data;
  //   //     setIsEmpty(true);
  //   //   }

  //   //   return filteredProperty;
  //   // }

  //   // const filterCallback = useCallback(filterProperties, [searchParams]);

  //   const properties = useMemo(
  //     () =>
  //       data &&
  //       data.map((prop, i) => (
  //         <PropertyCard
  //           className=" h-48 sm:h-60  md:h-52 lg:h-40"
  //           property={prop}
  //           key={i}
  //         />
  //       )),
  //     [data]
  //   );

  return <p>jhjk</p>;

  //   return (
  //     <div className="flex justify-between flex-col  w-full h-full ">
  //       <div className="flex justify-center sm:flex-row flex-col items-start border gap-3 h-screen rounded-md shadow-md bg-background">
  //         {isLoading && (
  //           <div className="w-full flex justify-center items-center h-[50vh]">
  //             <PuffLoader color="blue" />
  //           </div>
  //         )}
  //         {!isLoading && data && (
  //           <div className="w-full flex justify-center items-center flex-col gap-2">
  //             <SearchBar classname="" />
  //             <ResizablePanelGroup
  //               direction="horizontal"
  //               className="min-h-[95vh] w-full rounded-lg border overflow-y-auto scroll-smooth"
  //             >
  //               <ResizablePanel
  //                 minSize={38}
  //                 maxSize={65}
  //                 defaultSize={45}
  //                 className="overflow-y-auto scroll-smooth"
  //               >
  //                 {isEmpty && (
  //                   <div className="flex flex-col justify-center items-center gap-1 mb-5">
  //                     <p className="text-lg font-semibold ">
  //                       Oh no, it looks like no properties match you query.
  //                     </p>
  //                     <p className="text-base font-normal ">
  //                       Checkout our other properties
  //                     </p>
  //                   </div>
  //                 )}
  //                 <div className=" py-2 px-2 grid grid-cols-1 w-full sm:gap-10 md:grid-cols-2 md:gap-5 lg:grid-cols-2 lg:gap-5">
  //                   {properties}
  //                 </div>
  //               </ResizablePanel>
  //               <ResizableHandle withHandle />
  //               <ResizablePanel minSize={35} maxSize={62} defaultSize={55}>
  //                 {/* {data && (
  //                   <MapComp
  //                     height={"100%"}
  //                     properties={filterProperties(data.results)}
  //                     focusedProperty={filterProperties(data.results)[0]}
  //                   />
  //                 )} */}
  //               </ResizablePanel>
  //             </ResizablePanelGroup>
  //             {/*
  //             <div className="hidden lg:block w-[130vw] min-h-screen">
  //               {data && (
  //                 <MapComp
  //                   height={"55vw"}
  //                   properties={filterProperties(data.results)}
  //                   focusedProperty={filterProperties(data.results)[0]}
  //                 />
  //               )}
  //             </div> */}
  //           </div>
  //         )}
  //         {/* {!isLoading && data && (
  //           <>
  //             <div className="pt-14 lg:pt-4 flex justify-start items-center gap-10 flex-col w-full p-4 overflow-y-auto max-h-screen scroll-smooth">
  //               <SearchBar classname="" />

  //               <div className="h-screen grid grid-cols-1 w-full sm:gap-10 md:grid-cols-2 md:gap-5 lg:grid-cols-2 lg:gap-5">
  //                 {properties}
  //               </div>
  //             </div>

  //             <div className="hidden lg:block w-[130vw] min-h-screen">
  //               {data && (
  //                 <MapComp
  //                   height={"55vw"}
  //                   properties={filterProperties(data.results)}
  //                   focusedProperty={filterProperties(data.results)[0]}
  //                 />
  //               )}
  //             </div>
  //           </>
  //         )} */}
  //       </div>
  //     </div>
  //   );
}
