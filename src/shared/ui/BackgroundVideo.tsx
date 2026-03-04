import { FC } from "react";

interface BackgroundVideoProps {
  /** Путь к видеофайлу */
  src: string;
  /** Классы для настройки оверлея (например, прозрачности). По умолчанию: bg-black/40 */
  overlayClassName?: string;
  /** Классы для главного контейнера. По умолчанию фиксируется на весь экран */
  containerClassName?: string;
  /** Тип видеофайла. По умолчанию: video/mp4 */
  type?: string;
}

export const BackgroundVideo: FC<BackgroundVideoProps> = ({
  src,
  overlayClassName = "bg-black/40",
  containerClassName = "fixed top-0 left-0 w-full h-screen z-0",
  type = "video/mp4",
}) => {
  return (
    <div className={`overflow-hidden bg-black ${containerClassName}`}>
      {/* Оверлей для затемнения (или любого другого эффекта) */}
      <div className={`absolute inset-0 z-10 ${overlayClassName}`} />

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={src} type={type} />
        Ваш браузер не поддерживает тег video.
      </video>
    </div>
  );
};
