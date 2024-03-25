import logo from "../app/Lib/Imgs/logo.png";
export default function Navbar() {
  return (
    <nav className="h-wrapper">
      <div className="flexCenter paddings innerWidth h-container">
        <img src={logo.src} alt="logo" width={100}></img>
        <div className="flexCenter h-menu">
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
          <button className="button">
            <a href="">Contact</a>
          </button>
        </div>
      </div>
    </nav>
  );
}
