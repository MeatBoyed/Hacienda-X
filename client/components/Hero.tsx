import houselogo1 from "../app/Lib/Imgs/houselogo1.jpg";
// import {HiLocationMarker} from "react-icons";
export default function Navbar() {
  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container ">
        {/*left side hero section*/}
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <h1>
              Discover <br />
              Your <br /> Next Home
            </h1>
          </div>

          <div className="flexColStart hero-des">
            <span className="secondaryText">
              Find a variety of properties that suit your everyday needs
            </span>
            <span className="secondaryText">
              Forget all difficulties in finding your next home
            </span>
          </div>

          <div className="flexCenter search-bar">
            {/* <HiLocationMarker color="var(--blue)" size={25} /> */}
            <input type="text" placeholder="Location"></input>
            <button className="button">Search</button>
          </div>
        </div>

        {/*right side hero section*/}
        <div className="flexCenter hero-right">
          <div className="image-container">
            <img src={houselogo1.src} alt="hero image" />
          </div>
        </div>
      </div>
    </section>
  );
}
