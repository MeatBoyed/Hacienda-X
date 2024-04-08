// PRICE MUST BE NUMBER!
interface props {
  name: string;
  detail: string;
  image: string;
  price: string;
}

export default function PropertyCard({ name, detail, image, price }: props) {
  return (
    <div className="flexColStart r-card">
      <img src={image} alt="home" />

      <span className="secondaryText r-price">
        <span>$</span>
        <span>{price}</span>
      </span>

      <span className="primaryText">{name}</span>
      <span className="secondaryText">{detail}</span>
    </div>
  );
}
