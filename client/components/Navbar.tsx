import logo from "../app/Lib/Imgs/logo.png";
import NavbarAuth from "@/lib/Navbar";
export default function Navbar() {
  return (
    <nav className="text-primary-foreground mb-16">
      <div className="flex justify-between items-center w-full ">
        <a className="valuestransition" href="/">
          {" "}
          <img src={logo.src} alt="logo" width={100}></img>{" "}
        </a>
        <div className="flex justify-center items-center gap-8">
          <a className="valuestransition" href="/property">
            Residencies
          </a>
          <a className="valuestransition" href="#about">
            Our Values
          </a>
          <a className="valuestransition" href="#about">
            Contact Us
          </a>
          <NavbarAuth />
        </div>
      </div>
    </nav>
  );
}
