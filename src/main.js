import "./css/style.css";
import "./css/font.css";
import "./css/animation.css";
import "./css/button.css";

import "./app";
import { add3DRotationEffect, updateGreeting, updateTime } from "./app";
import { importJsAsModule } from "./utils";

const initialize = async () => {
	await importJsAsModule("/fluid.js");
	add3DRotationEffect("perspective");
	updateGreeting();
	updateTime();
};

window.addEventListener("load", initialize);
