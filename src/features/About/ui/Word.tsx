import { MotionValue } from "framer-motion";
import { Char } from "./Char";

interface IProps {
	children: string;
	progress: MotionValue<number>;
	range: [number, number];
}

export const Word = ({ children, progress, range }: IProps) => {
	const letters = children.split("");
	const amount = range[1] - range[0];
	const step = amount / letters.length;

	return (
		<span style={{ display: "inline-flex", marginRight: "0.25em" }}>
			{letters.map((char, i) => {
				const start = range[0] + i * step;
				const end = range[0] + (i + 1) * step;

				return (
					<Char key={i} progress={progress} range={[start, end]}>
						{char}
					</Char>
				);
			})}
		</span>
	);
};
