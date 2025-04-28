'use client'
import { useRouter } from "next/navigation";

const ChoicePage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h2 className="text-3xl font-bold mb-6">What do you want to do today?</h2>
      <div className="flex gap-4">
        <button
          onClick={() => router.push('/design')}
          className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
        >
          Style my Room
        </button>
        <button
          onClick={() => router.push('/design')}
          className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
        >
          Match this Item
        </button>
      </div>
    </div>
  );
};

export default ChoicePage;

