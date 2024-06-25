import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section
      id="SignUpForm"
      className="flex justify-center items-center w-full h-[70vh] mb-52 mt-16"
    >
      <SignUp />
    </section>
  );
}
