interface IProps {
	title?: string;
	titleDesc?: string;
	desc?: string;
	footerText?: string;
	color: string;
}
import Image from "next/image";
export const Card = ({ title, titleDesc, desc, footerText, color }: IProps) => {
	return (
		<div className="ourwork__content min-w-161! max-w-161! ">
			<div
				className={`${color ? color : "bg-red-500"} pb-6 p-8 md:pb-8 md:pt-12 rounded-3xl flex flex-col items-center justify-start gap-6 md:gap-8l`}
			>
				<div className="ourwork__card-icons flex">
					<Image
						src="/1.svg"
						alt="icon"
						width={50}
						height={50}
						className="transform -scale-x-100"
					/>
					<div className="ourwork__icon-text p-5">
						<p className="card__text">{title || "-"}</p>
						<p>{titleDesc || "-"}</p>
					</div>
					<Image
						src="/1.svg"
						alt="icon"
						width={50}
						height={50}
						className="text-white"
					/>
				</div>
				<p className="ourwork__desc-text">{desc || "-"}</p>
				<p className="ourwork__footer-text">{footerText || "-"}</p>
			</div>
		</div>
	);
};
