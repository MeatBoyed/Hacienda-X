"use client";
import { useContext, useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";

const Heart = ({ id }: { id: any }) => {
  const [heartColor, setHeartColor] = useState("white");

  // const {
  //   userDetails: { favourites, token },
  //   setUserDetails,
  // } = useContext(UserDetailContext);

  // useEffect(() => {
  //   setHeartColor(() => checkFavourites(id, favourites));
  // }, [favourites]);

  // const { mutate } = useMutation({
  //   mutationFn: () => toFav(id, user?.email, token),
  //   onSuccess: () => {
  //     setUserDetails((prev) => ({
  //       ...prev,
  //       favourites: updateFavourites(id, prev.favourites),
  //     }));
  //   },
  // });

  // const handleLike = () => {
  //   if (validateLogin()) {
  //     mutate();
  //     setHeartColor((prev) => (prev === "#fa3e5f" ? "white" : "#fa3e5f"));
  //   }
  // };

  return (
    <AiFillHeart
      size={24}
      color={heartColor}
      onClick={(e) => {
        e.stopPropagation();
        // handleLike();
      }}
    />
  );
};

export default Heart;
