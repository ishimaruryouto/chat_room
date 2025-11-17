// app/page.tsx
"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-dvh flex items-center justify-center bg-[#f8f8f8]">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-10">ルームを作成</h1>
        <button
          onClick={() => router.push("/Room")}
          className="w-72 h-12 rounded-full bg-[#FBF3AD]"
        >
          ルームに入る
        </button>
      </div>
    </main>
  );
}