import PropertyForm from "../_components/PropertyForm";

// Allow user's to request property features for us to add
export default async function CreatePropertyPage() {
  return (
    <section
      id="createpropertyform"
      className="w-full flex justify-start items-center gap-10  pb-20  my-5 flex-col px-3 sm:px-5 min-h-screen  "
    >
      <PropertyForm />
    </section>
  );
}
