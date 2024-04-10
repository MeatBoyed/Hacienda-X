import houselogo1 from "../app/Lib/Imgs/houselogo1.jpg";
import Searchbar from "./Searchbar";
// import {HiLocationMarker} from "react-icons";

export default function Navbar() {
  return (
    <section className="w-full text-primary-foreground">
      <div className="absolute w-[40rem] h-[20rem] bg-[#5275e985] blur-[100px] rounded-[100px] mt-72" />
      <div className="w-full flex justify-between items-end ">
        {/*left side hero section*/}
        <div className="flex justify-center items-start flex-col gap-12 ">
          <h1 className="font-semibold text-6xl">
            Discover <br />
            Your <br /> Next Home
          </h1>

          <div className="flex justify-center items-start flex-col ">
            <p className="text-base text-primary-foreground opacity-60">
              Find a variety of properties that suit your everyday needs
            </p>
            <p className="text-base text-primary-foreground opacity-60">
              Forget all difficulties in finding your next home
            </p>
          </div>

          <Searchbar />
        </div>

        {/*right side hero section*/}
        <div className="flex justify-center items-center ">
          <img
            src={houselogo1.src}
            alt="hero image"
            className="rounded-xl  w-[40rem] h-[30rem]"
          />
        </div>
      </div>
    </section>
  );
}
