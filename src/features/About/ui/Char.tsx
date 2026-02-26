import { motion, MotionValue, useTransform } from "framer-motion";

interface IProps {
	children: string;
	progress: MotionValue<number>;
	range: [number, number];
}

export const Char = ({ children, progress, range }: IProps) => {
	const opacity = useTransform(progress, range, [0, 1]);
	const blur = useTransform(progress, range, [10, 0]);
	const y = useTransform(progress, range, [10, 0]);

	return (
		<motion.span
			style={{
				opacity: opacity,
				filter: useTransform(blur, (v) => `blur(${v}px)`),
				y: y,
				display: "inline-block",
			}}
		>
			{children}
		</motion.span>
	);
};
