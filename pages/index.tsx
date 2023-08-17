import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <button
        className="text-blue-500"
        onClick={async () => {
          await callDirectly();
          await callViaEdge();
        }}
      >
        Click me and check console + server logs
      </button>
    </main>
  );
}

const callDirectly = async () => {
  const response = await fetch("/api/bug/serverless", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ why_do: "you hate me too" }),
  });
  if (!response.ok) {
    console.error("Error calling /api/bug/serverless", response);
  } else {
    console.log("Called directly, successfully");
  }
};

const callViaEdge = async () => {
  const response = await fetch("/api/bug/edge", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  if (!response.ok) {
    console.error("Error calling /api/bug/edge", response);
  } else {
    console.log("Called via edge, successfully");
  }
};
