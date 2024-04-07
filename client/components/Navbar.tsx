import logo from "../app/Lib/Imgs/logo.png";
import { Button } from "./ui/button";
export default function Navbar() {
  return (
    <nav className="text-primary-foreground mb-16">
      <div className="flex justify-between items-center w-full ">
        <img src={logo.src} alt="logo" width={100}></img>
        <div className="flex justify-center items-center gap-8">
          <a className="valuestransition" href="">
            Residencies
          </a>
          <a className="valuestransition" href="">
            Our Values
          </a>
          <a className="valuestransition" href="">
            Contact Us
          </a>
          <a className="valuestransition" href="">
            Get Started
          </a>
          <Button
            className="rounded-sm font-medium tracking-widest pl-6 pr-6 pt-2 pb-2 buttonTail"
            size={"lg"}
          >
            <a href="/contact">Contact</a>
          </Button>
        </div>
      </div>
    </nav>
  );
}
