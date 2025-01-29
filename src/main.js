import "./styles/base.css";
import "./styles/typography.css";
import "./styles/animations.css";
import "./styles/components.css";

import "./effects";
import { add3DRotationEffect, updateGreeting, updateTime } from "./effects";
import { importJsAsModule } from "./utils";

const initialize = async () => {
	await importJsAsModule("/fluid.js");
	add3DRotationEffect("perspective");
	updateGreeting();
	updateTime();
};

window.addEventListener("load", initialize);
