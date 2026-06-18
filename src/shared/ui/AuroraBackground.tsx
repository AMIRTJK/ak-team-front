import { FC } from "react";

interface AuroraBackgroundProps {
  /** Классы контейнера. По умолчанию фиксируется на весь экран позади контента */
  className?: string;
  /** Класс затемняющего оверлея для читаемости текста. По умолчанию: bg-black/40 */
  overlayClassName?: string;
}

/**
 * Лёгкий анимированный фон на чистом CSS вместо тяжёлого видео.
 * Не зависит от разрешения (нет потери качества на больших мониторах),
 * дешёвый по производительности и масштабируется на любой экран.
 */
export const AuroraBackground: FC<AuroraBackgroundProps> = ({
  className = "fixed inset-0 -z-10",
  overlayClassName = "bg-black/40",
}) => {
  return (
    <div className={`overflow-hidden bg-[#050505] ${className}`}>
      <div className="absolute inset-0">
        <span className="aurora-blob aurora-blob--1" />
        <span className="aurora-blob aurora-blob--2" />
        <span className="aurora-blob aurora-blob--3" />
      </div>
      <div className={`absolute inset-0 ${overlayClassName}`} />
    </div>
  );
};
