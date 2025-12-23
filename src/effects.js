import { addEventListeners, calcDeltaTime } from "./utils";

/**
 * Adds 3D perspective rotation effect to elements with the specified class name.
 * The rotation is controlled by mouse/touch movement and uses spring physics for smooth animation.
 * @param {string} className - The class name of elements to apply the 3D effect to
 */
export const add3DRotationEffect = (className) => {
	const elements = document.body.getElementsByClassName(className);

	const state = {
		velocity: { x: 0, y: 0 },
		rotation: { x: 0, y: 0 },
		targetRotation: { x: 0, y: 0 },
	};

	/**
	 * Calculates spring physics for smooth animation
	 * @param {number} position - Current position
	 * @param {number} target - Target position
	 * @param {number} velocity - Current velocity
	 * @param {number} omega - Angular frequency
	 * @param {number} dt - Delta time
	 * @returns {number} New velocity
	 */
	const spring = (position, target, velocity, omega, dt) => {
		const n1 = velocity - (position - target) * (omega ** 2 * dt);
		const n2 = 1 + omega * dt;
		return n1 / n2 ** 2;
	};

	/**
	 * Clamps a value between min and max
	 * @param {number} value - Value to clamp
	 * @param {number} min - Minimum value
	 * @param {number} max - Maximum value
	 * @returns {number} Clamped value
	 */
	const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

	/**
	 * Updates rotation values and applies transform styles in animation frame
	 */
	const updateRotation = () => {
		const dt = calcDeltaTime();
		const springConstant = 0.08;

		state.velocity.x = spring(
			state.rotation.x,
			state.targetRotation.x,
			state.velocity.x,
			4,
			dt
		);
		state.velocity.y = spring(
			state.rotation.y,
			state.targetRotation.y,
			state.velocity.y,
			4,
			dt
		);

		state.rotation.x += state.velocity.x * dt * springConstant;
		state.rotation.y += state.velocity.y * dt * springConstant;

		const style = `perspective(700px) rotateX(${state.rotation.y}rad) rotateY(${state.rotation.x}rad)`;
		Array.from(elements).forEach((el) => (el.style.transform = style));

		requestAnimationFrame(updateRotation);
	};

	/**
	 * Handles mouse/touch movement to update target rotation
	 * @param {(MouseEvent|TouchEvent)} e - Mouse or touch event
	 */
	const handleMovement = (e) => {
		const event = e.changedTouches?.[0] || e;

		state.targetRotation.x = (event.clientX / window.innerWidth) * 2 - 1;
		state.targetRotation.y = -(event.clientY / window.innerHeight) * 2 + 1;

		state.targetRotation.x = clamp(state.targetRotation.x, -0.5, 0.5);
		state.targetRotation.y = clamp(state.targetRotation.y, -0.5, 0.5);
	};

	addEventListeners(window, ["mousemove", "touchmove"], handleMovement, false);

	updateRotation();
};

/**
 * Updates greeting text based on time of day.
 * Updates every minute.
 */
export const updateGreeting = () => {
	const hours = new Date().getHours();
	const greetingEl = document.querySelector(".greeting");
	if (!greetingEl) return;

	/**
	 * Gets appropriate greeting based on hour of day
	 * @param {number} hours - Hour in 24-hour format
	 * @returns {string} Greeting text
	 */
	const getGreeting = (hours) => {
		if (hours < 6) return "Good night";
		if (hours < 12) return "Good morning";
		if (hours < 16) return "Good afternoon";
		if (hours <= 23) return "Good evening";
		return "Hello";
	};

	const greeting = getGreeting(hours);
	greetingEl.textContent = greeting;

	setTimeout(updateGreeting, 60_000); // 60 seconds
};

/**
 * Updates clock display with current time in HH:MM:SS format.
 * Updates every second.
 */
export const updateTime = () => {
	const clockEl = document.querySelector(".clock");
	if (!clockEl) return;

	const time = new Date();
	const formatted_date = [time.getHours(), time.getMinutes(), time.getSeconds()]
		.map((num) => num.toString().padStart(2, "0"))
		.join(":");

	clockEl.textContent = formatted_date;

	setTimeout(updateTime, 1000);
};
