"use client";

import { useRouter } from "next/navigation";

export default function ErrorView() {
  const router = useRouter();

  return (
    <div className="text-center py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong.</h1>
      <p className="text-gray-600 mb-6">Please try again.</p>
      <button
        onClick={() => router.refresh()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Reload Page
      </button>
    </div>
  );
}

export function MessageView({
  h1,
  p,
  button,
}: {
  h1: string;
  p: string;
  button?: { text: string; href: string; refresh?: boolean };
}) {
  const router = useRouter();

  return (
    <div className="text-center py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{h1}</h1>
      <p className="text-gray-600 mb-6">{p} </p>
      {button && (
        <button
          onClick={() => (button.refresh ? router.refresh() : router.push(button.href))}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {button.text}
        </button>
      )}
    </div>
  );
}
export function EmptyView() {
  const router = useRouter();

  return (
    <div className="text-center py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">No properties found.</h1>
      <p className="text-gray-600 mb-6">You can add a property by clicking the button below.</p>
      <button
        onClick={() => router.push("/add-property")}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Property
      </button>
    </div>
  );
}
