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

export const MailIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export const TelegramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.94 4.66a1.3 1.3 0 0 0-1.35-.2L3.4 11.13c-.86.34-.83 1.57.04 1.87l4.3 1.46 1.64 5.06a1 1 0 0 0 1.65.4l2.3-2.18 4.2 3.1a1.3 1.3 0 0 0 2.05-.82l2.36-14.1a1.3 1.3 0 0 0-.4-1.16ZM9.7 14.1l8.2-5.16-6.7 6.24a1 1 0 0 0-.3.6l-.24 2.1-1-3.43a.5.5 0 0 1 .04-.36Z" />
  </svg>
);

export const WhatsappIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
  </svg>
);

export const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .5C5.7.5.5 5.7.5 12a11.5 11.5 0 0 0 7.9 10.9c.6.1.8-.25.8-.56v-2c-3.2.7-3.9-1.37-3.9-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.76.4-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.3-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.5 3.17-1.18 3.17-1.18.63 1.59.23 2.75.11 3.04.74.82 1.19 1.85 1.19 3.11 0 4.43-2.7 5.41-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.81.56A11.5 11.5 0 0 0 23.5 12C23.5 5.7 18.3.5 12 .5Z" />
  </svg>
);

export const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 9h4v12H3V9Zm6 0h3.8v1.71h.05c.53-.95 1.83-1.96 3.77-1.96 4.03 0 4.78 2.5 4.78 5.74V21h-4v-5.18c0-1.23-.02-2.82-1.92-2.82-1.92 0-2.21 1.34-2.21 2.73V21H9V9Z" />
  </svg>
);
