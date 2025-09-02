export default function Landing() {
    return (
      <main className="flex flex-col justify-center items-center gap-y-[26px] mt-[161px]">
        {/* Title */}
        <span className="text-[40px] font-bold">
          프로젝트 관리의 모든 것, 픽클AI로 간편하게
        </span>
  
        {/* Subtitle */}
        <span className="text-center whitespace-normal break-words w-[660px] mx-auto text-[16px]">
          A smart AI-powered platform that lets anyone manage projects like a pro.
          Intuitive WBS and Gantt UI with automatic predictions enable efficient
          collaboration and clear project visibility without complexity.
        </span>
  
        {/* Start Button */}
        <button className="bg-black text-green-400 font-bold px-5 py-2 rounded-full hover:bg-gray-900 transition">
          Pickle 무료로 시작하기
        </button>
  
        {/* Logo Band */}
        <div className="w-full h-[271px] bg-[url('/landing/logo_band.svg')] bg-repeat-x bg-center bg-[length:820px_271px] mt-[91px]" />
      </main>
    );
  }
  