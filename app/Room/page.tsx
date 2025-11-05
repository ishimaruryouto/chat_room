import Image from "next/image";

export default function Room_create() {
    return (
        <>
            <h1 className="text-4xl font-bold text-center mt-20">チャット欄</h1>
            <div className="grid grid-cols-2 gap-2.5 w-4/5 mx-auto mt-12">
                <div className="relative flex items-center w-[150px] h-[150px] px-[2.2em] py-[2em] bg-[#fdf6af] text-[#333]
            before:absolute before:bottom-[-5px] before:right-[7px] before:-z-10 before:rotate-[5deg]
            before:w-[70%] before:h-[50%] before:bg-[#d0d0d0] before:blur-[4px] before:content-['']">
                    <textarea name="text" id="" placeholder="ここに書き込み" className="w-full h-full bg-transparent resize-none outline-none text-sm"></textarea>
                </div>

                <div className="relative flex items-center w-[150px] h-[150px] px-[2.2em] py-[2em] bg-[#fdf6af] text-[#333]
            before:absolute before:bottom-[-5px] before:right-[7px] before:-z-10 before:rotate-[5deg]
            before:w-[70%] before:h-[50%] before:bg-[#d0d0d0] before:blur-[4px] before:content-['']">
                    <textarea name="text" id="" placeholder="ここに書き込み" className="w-full h-full bg-transparent resize-none outline-none text-sm"></textarea>
                </div>

                <div className="relative flex items-center w-[150px] h-[150px] px-[2.2em] py-[2em] bg-[#fdf6af] text-[#333]
            before:absolute before:bottom-[-5px] before:right-[7px] before:-z-10 before:rotate-[5deg]
            before:w-[70%] before:h-[50%] before:bg-[#d0d0d0] before:blur-[4px] before:content-['']">
                    <textarea name="text" id="" placeholder="ここに書き込み" className="w-full h-full bg-transparent resize-none outline-none text-sm"></textarea>
                </div>

                <div className="relative flex items-center w-[150px] h-[150px] px-[2.2em] py-[2em] bg-[#fdf6af] text-[#333]
            before:absolute before:bottom-[-5px] before:right-[7px] before:-z-10 before:rotate-[5deg]
            before:w-[70%] before:h-[50%] before:bg-[#d0d0d0] before:blur-[4px] before:content-['']">
                    <textarea name="text" id="" placeholder="ここに書き込み" className="w-full h-full bg-transparent resize-none outline-none text-sm"></textarea>
                </div>

                <div className="relative flex items-center w-[150px] h-[150px] px-[2.2em] py-[2em] bg-[#fdf6af] text-[#333]
            before:absolute before:bottom-[-5px] before:right-[7px] before:-z-10 before:rotate-[5deg]
            before:w-[70%] before:h-[50%] before:bg-[#d0d0d0] before:blur-[4px] before:content-['']">
                    <textarea name="text" id="" placeholder="ここに書き込み" className="w-full h-full bg-transparent resize-none outline-none text-sm"></textarea>
                </div>

                <div className="relative flex items-center w-[150px] h-[150px] px-[2.2em] py-[2em] bg-[#fdf6af] text-[#333]
            before:absolute before:bottom-[-5px] before:right-[7px] before:-z-10 before:rotate-[5deg]
            before:w-[70%] before:h-[50%] before:bg-[#d0d0d0] before:blur-[4px] before:content-['']">
                    <textarea name="text" id="" placeholder="ここに書き込み" className="w-full h-full bg-transparent resize-none outline-none text-sm"></textarea>
                </div>
            </div>
        </>
    );
}
