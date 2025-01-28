/** Timestamp of the last update used for delta time calculation */
export let last_update = Date.now();

/**
 * Calculates the time elapsed since the last update, capped at 60fps
 * @returns {number} Delta time in seconds
 */
export function calcDeltaTime() {
	const now = Date.now();
	const MAX_DELTA = 0.016; // 60fps cap
	let dt = (now - last_update) / 1000;
	dt = Math.min(dt, MAX_DELTA);
	last_update = now;
	return dt;
}

/**
 * Adds event listeners to one or more elements for multiple event types
 * @param {HTMLElement|HTMLElement[]} elements - Single element or array of elements
 * @param {string[]} eventNames - Array of event names to listen for
 * @param {Function} callback - Event handler function
 * @param {(boolean|AddEventListenerOptions|null)} [options=null] - Event listener options
 */
export function addEventListeners(
	elements,
	eventNames,
	callback,
	options = null
) {
	// Convert single element to array if needed
	const elementArray = Array.isArray(elements) ? elements : [elements];

	// Add event listeners to each element for each event name
	eventNames.forEach((eventName) => {
		elementArray.forEach((element) => {
			element.addEventListener(eventName, callback, options);
		});
	});
}

/**
 * Imports a JavaScript file as an ES module by injecting a script tag
 * @param {string} url - URL of the JavaScript file to import
 * @returns {Promise<void>} Resolves when the script has loaded
 */
export const importJsAsModule = async (url) => {
	return new Promise((resolve, reject) => {
		const body = document.querySelector("body");
		const script = document.createElement("script");

		script.type = "module";
		script.src = url;
		script.onload = resolve;

		body.appendChild(script);
	});
};
