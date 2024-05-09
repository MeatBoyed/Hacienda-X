"use client";

import React, { useMemo, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
// import { Marker, Popup } from "react-leaflet";
import { Icon, LatLngExpression, popup } from "leaflet";
import PinIcon from "@/public/MapPin.png";
import "leaflet/dist/leaflet.css";
import { Property } from "@prisma/client";
import { cn } from "@/lib/utils";

import { Home } from "lucide-react";
import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
} from "react-map-gl";
import Link from "next/link";

// export function MapComp({
//   focusedProperty,
//   properties,
// }: {
//   focusedProperty: Property;
//   properties: Property[];
// }) {
//   const [showFocusedPropPopup, setShowFocusedPropPopup] =
//     useState<boolean>(false);
//   const [popupInfo, setPopupInfo] = useState<Property | null>(null);

//   const focusedPropertyMarker = useMemo(
//     () => (
//       <Marker
//         longitude={focusedProperty.longitude}
//         latitude={focusedProperty.latitude}
//         anchor="center"
//         onClick={(e) => {
//           e.originalEvent.stopPropagation();
//           setShowFocusedPropPopup(true);
//         }}
//       >
//         <div className="bg-background p-2 rounded-full shadow-md">
//           <Home size={18} className="text-red-500" />
//         </div>
//       </Marker>
//     ),
//     []
//   );

//   const propertiesMarkers = useMemo(
//     () => (
//       <>
//         {properties && (
//           <>
//             {properties.map((property, index) => (
//               <Marker
//                 longitude={property.longitude}
//                 latitude={property.latitude}
//                 anchor="center"
//                 onClick={(e) => {
//                   e.originalEvent.stopPropagation();
//                   setPopupInfo(property);
//                 }}
//                 key={index}
//               >
//                 <div className="bg-background p-2 rounded-full shadow-md">
//                   <Home size={18} className="text-red-500" />
//                 </div>
//               </Marker>
//             ))}
//           </>
//         )}
//       </>
//     ),
//     []
//   );

//   return (
//     <Map
//       initialViewState={{
//         longitude: focusedProperty.longitude,
//         latitude: focusedProperty.latitude,
//         zoom: 15, // 3.5 in example
//       }}
//       style={{ width: "100%", height: "55vh", borderRadius: 10 }}
//       mapStyle="mapbox://styles/mapbox/streets-v9"
//       mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
//     >
//       {/* User Map Controls */}
//       <GeolocateControl position="top-left" />
//       <FullscreenControl position="top-left" />
//       <NavigationControl position="top-left" />
//       <ScaleControl />

//       {/* Render Page-Property Pin*/}
//       {focusedPropertyMarker}

//       {/* Render (Related) Property Pins */}
//       {propertiesMarkers}

//       {/* Page-Property PopUp */}
//       {showFocusedPropPopup && (
//         <Popup
//           longitude={focusedProperty.longitude}
//           latitude={focusedProperty.latitude}
//           anchor="bottom"
//           onClose={() => setShowFocusedPropPopup(false)}
//           className="w-32 h-20"
//         >
//           <p className="leading-7">{focusedProperty.title}</p>
//           <p className="text-lg font-semibold">{focusedProperty.price}</p>
//           <Link
//             className="leading-7"
//             href={`/property-for-sale/${focusedProperty.title}`}
//           >
//             View Property
//           </Link>
//         </Popup>
//       )}

//       {popupInfo && (
//         <Popup
//           longitude={popupInfo.longitude}
//           latitude={popupInfo.latitude}
//           anchor="bottom"
//           onClose={() => setPopupInfo(null)}
//           className="w-32 h-20"
//         >
//           <p className="leading-7">{focusedProperty.title}</p>
//           <p className="text-lg font-semibold">{focusedProperty.price}</p>
//           <Link
//             className="leading-7"
//             href={`/property-for-sale/${focusedProperty.title}`}
//           >
//             View Property
//           </Link>
//         </Popup>
//       )}
//     </Map>
//   );
// }

// export function MapViewer({
//   properties,
//   className,
// }: {
//   properties: Property[];
//   className: string;
// }) {
//   // const center: LatLngExpression = [-26.1045525, 28.0545147];
//   const center: LatLngExpression = [
//     properties[0].latitude,
//     properties[0].longitude,
//   ];

//   const customIcon = new Icon({
//     iconUrl: PinIcon.src,
//     iconSize: [38, 38],
//   });

//   return (
//     <div className={cn("w-full", className)} id="Map">
//       <MapContainer
//         center={center}
//         zoom={13}
//         scrollWheelZoom={false}
//         className="w-full h-full z-10"
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

//         {properties.map((property, index) => {
//           const location: LatLngExpression = [
//             property.latitude,
//             property.longitude,
//           ];

//           return (
//             <Marker key={index} position={location} icon={customIcon}>
//               {/* <Popup>
//                 <h2>{property.description}</h2>
//               </Popup> */}
//             </Marker>
//           );
//         })}
//         {/* {markers.map((location, index) => (
//           <Marker key={index} position={location.geocode} icon={customIcon}>
//             <Popup>
//               <h2>{location.message}</h2>
//             </Popup>
//           </Marker>
//         ))} */}
//       </MapContainer>
//     </div>
//   );
// }
