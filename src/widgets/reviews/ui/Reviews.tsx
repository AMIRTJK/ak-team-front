"use client";

import { useTranslation } from "@/shared/lib/i18n";
import { motion } from "framer-motion";

interface Review {
  id: string;
  name: string;
  rating: number;
}

const REVIEWS = [
  {
    id: "review-1",
    name: "Farkhod D.",
    rating: 5,
  },
  {
    id: "review-2",
    name: "Rustam M.",
    rating: 5,
  },
  {
    id: "review-3",
    name: "Zarina K.",
    rating: 5,
  },
];

const getAvatar = (id: string, lang: string) => {
  if (lang === "RU") {
    if (id === "review-1") return "ФД";
    if (id === "review-2") return "РМ";
    if (id === "review-3") return "ЗК";
  }
  if (id === "review-1") return "FD";
  if (id === "review-2") return "RM";
  if (id === "review-3") return "ZK";
  return "";
};

const StarIcon = () => (
  <svg
    className="h-4.5 w-4.5 fill-[#C8FF12] text-[#C8FF12]"
    viewBox="0 0 24 24"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export const Reviews = () => {
  const { t, language } = useTranslation();

  return (
    <section
      id="reviews"
      className="w-full bg-gradient-to-b from-[#050505] to-[#0a0a0a] px-6 py-24 md:px-15"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col items-center gap-8 text-center">
          <h2 className="text-[clamp(56px,12vw,180px)] font-semibold leading-[1.2] text-[#C8FF12]">
            {t("reviews.title")}
          </h2>
          <p className="mb-12 max-w-2xl text-lg text-zinc-300 md:text-2xl">
            {t("reviews.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-[#C8FF12]/30 hover:bg-white/[0.04] md:p-8 group"
            >
              {/* Subtle hover glow effect */}
              <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-[#C8FF12]/5 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div>
                {/* Rating stars & Tag */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="flex gap-1">
                    {Array.from({ length: review.rating }).map((_, idx) => (
                      <StarIcon key={idx} />
                    ))}
                  </div>
                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-zinc-400 border border-white/5">
                    {t(`reviews.items.${review.id}.tag`)}
                  </span>
                </div>

                {/* Review Text */}
                <p className="relative z-10 text-base leading-relaxed text-zinc-300">
                  &ldquo;{t(`reviews.items.${review.id}.text`)}&rdquo;
                </p>
              </div>

              {/* Reviewer profile info */}
              <div className="mt-8 flex items-center gap-4 border-t border-white/5 pt-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#C8FF12]/20 to-transparent text-sm font-semibold text-[#C8FF12] border border-[#C8FF12]/20">
                  {getAvatar(review.id, language)}
                </div>
                <div>
                  <h4 className="font-semibold text-white text-base leading-tight">
                    {review.name}
                  </h4>
                  <p className="text-sm text-zinc-500 mt-1">
                    {t(`reviews.items.${review.id}.role`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

