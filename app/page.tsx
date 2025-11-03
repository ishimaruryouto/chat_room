import Image from "next/image";
import Link from "next/link";

export default function Room_create() {
  return (
    <>
      <div className="text-center">
        <h1 className="text-4xl font-bold mt-40">ルームを作成</h1>
        <input type="text" id="room" placeholder="ルームを作成" className="w-70 h-12 border border-black rounded-full mt-24" />
        <button type="button" className="w-70 h-12 rounded-full bg-[#FBF3AD] mt-9">ルームを作成</button>
      </div>
    </>
  );
}
