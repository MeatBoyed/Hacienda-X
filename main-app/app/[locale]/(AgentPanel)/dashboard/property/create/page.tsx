import PropertyForm from "../_components/PropertyForm";

// Allow user's to request property features for us to add
// params: { locale: string };
export default async function CreatePropertyPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <section
      id="createpropertyform"
      className="w-full flex justify-start items-center gap-10  pb-20  my-24 flex-col px-3 sm:px-5 min-h-screen  "
    >
      <PropertyForm locale={locale} />
    </section>
  );
}
