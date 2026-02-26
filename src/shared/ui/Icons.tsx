export const LogoIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" stroke="#EAE4D3" strokeWidth="2" />
    <path d="M12 6L16 14H8L12 6Z" fill="#D4AF37" />
  </svg>
);

export const ScrollIcon = () => {
  return (
    <div className="w-[26px] h-[52px] border-1 border-[#3c3c3b] rounded-full flex justify-center items-start pt-[6px]">
      <style>
        {`
          @keyframes scrollDown {
            0% {
              transform: translateY(8px);
              opacity: 0;
            }
              20% {
              opacity: 1;
            }
              40% {
              opacity: 1;
            }

            100% {
              transform: translateY(30px);
              opacity: 0;
            }
          }
          .animate-scroll {
            animation: scrollDown 2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
          }
        `}
      </style>

      <div className="w-[6px] h-[10px] bg-[#D24A43] rounded-full animate-scroll"></div>
    </div>
  );
};
