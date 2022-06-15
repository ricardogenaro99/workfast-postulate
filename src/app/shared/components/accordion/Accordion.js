import { useRef, useState } from "react";
import "./Accordion.css";
import Chevron from "./Chevron";

const Accordion = (props) => {
	const content = useRef(null);

	const [active, setActiveState] = useState("active_accordion");
	const [height, setHeightState] = useState(`600px`);
	const [rotate, setRotateState] = useState("accordion__icon rotate");

	// const accordionRDInitial = () => {
	// 	console.log(window.innerWidth, valuePx.tabletS);
	// };

	// useEffect(() => {
	// 	window.addEventListener("resize", accordionRDInitial);
	// }, []);

	const toggleAccordion = () => {
		setActiveState(active === "" ? "active_accordion" : "");
		// setHeightState(
		// 	active === "active_accordion"
		// 		? "0px"
		// 		: `${content.current.scrollHeight}px`,
		// );
		setHeightState(active === "active_accordion" ? "0px" : "100%");
		setRotateState(
			active === "active_accordion"
				? "accordion__icon"
				: "accordion__icon rotate",
		);
	};

	return (
		<section className="accordion__section">
			<button className={`accordion ${active}`} onClick={toggleAccordion}>
				<p className="accordion__title">{props.title}</p>
				<Chevron
					className={`${rotate}`}
					width={10}
					fill={"var(--secondary-color-gray)"}
				/>
			</button>
			<div
				ref={content}
				style={{ maxHeight: `${height}` }}
				className="accordion__content"
			>
				<div className="accordion__text">{props.content}</div>
			</div>
		</section>
	);
};

export default Accordion;
