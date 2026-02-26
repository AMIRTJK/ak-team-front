"use client";

import { useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { Word } from "./Word";

export const TextRender = () => {
	const containerRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start 0.9", "start 0.4"],
	});

	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 14,
		damping: 30,
		restDelta: 0.001,
	});

	const text =
		"As a division of Wonder Makers ↗, a digital product studio fueled by excitement, we specialize in game design, Web3 and immersive website development.";
	const words = text.split(" ");

	return (
		<div
			ref={containerRef}
			className="about__text-render h-[60vh]"
			// style={{ margin: "20vh 0", position: "relative" }}
		>
			<p
				style={{
					display: "flex",
					flexWrap: "wrap",
					lineHeight: "1.2",
					fontSize: "clamp(1.75rem, 5.5vw, 4rem)",
					color: "#fff",
					fontWeight: "500",
				}}
			>
				{words.map((word, i) => {
					const start = i / words.length;
					const end = start + 1 / words.length;

					return (
						<Word key={i} progress={smoothProgress} range={[start, end]}>
							{word}
						</Word>
					);
				})}
			</p>
		</div>
	);
};
