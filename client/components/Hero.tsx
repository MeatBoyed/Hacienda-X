import houselogo1 from "../app/Lib/Imgs/houselogo1.jpg";
import Searchbar from "./Searchbar";
// import {HiLocationMarker} from "react-icons";
export default function Navbar() {
  return (
    <section className="text-primary-foreground">
      <div className="white-gradient" />
      <div className="w-full flex justify-between items-end ">
        {/*left side hero section*/}
        <div className="flex justify-center items-start flex-col gap-12 ">
          {/* <div className="hero-title"> */}
          <h1 className="font-semibold text-6xl">
            Discover <br />
            Your <br /> Next Home
          </h1>
          {/* </div> */}

          {/* <div className="flexColStart hero-des"> */}
          <div className="flex justify-center items-start flex-col ">
            <span className="text-base text-primary-foreground opacity-60">
              Find a variety of properties that suit your everyday needs
            </span>
            <span className="text-base text-primary-foreground opacity-60">
              Forget all difficulties in finding your next home
            </span>
          </div>

          <Searchbar />
        </div>

        {/*right side hero section*/}
        <div className="flex justify-center items-center ">
          {/* <div className="image-container"> */}
          <img
            src={houselogo1.src}
            alt="hero image"
            className="rounded-xl  w-[40rem] h-[30rem]"
          />
          {/* </div> */}
        </div>
      </div>
    </section>
  );
}
