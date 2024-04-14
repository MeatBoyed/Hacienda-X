import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section
      id="SignUpForm"
      className="flex justify-center items-center w-full h-[70vh] mb-72 mt-32"
    >
      <SignUp />
    </section>
  );
}
