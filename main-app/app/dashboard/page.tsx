import CreatePropertyForm from "./_components/CreatePropertyForm";

// Real Estate agent's dashboard
export default function Dashbaord() {
  return (
    <div className="flex justify-center items-center flex-col px-40">
      <h1> Real Estate Agents dashboard</h1>
      <CreatePropertyForm />
    </div>
  );
}
