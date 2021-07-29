import { event_listener_array, calc_delta_time } from './utils';

export function perspective_3d(class_name)
{
    const elements = document.body.getElementsByClassName(class_name);

    let velocity_x = 0;
    let velocity_y = 0;
    let rotation_x = 0;
    let rotation_y = 0;
    let target_rotation_x = 0;
    let target_rotation_y = 0;

    (function update()
    {
        let dt = calc_delta_time();
        const ss = .08;

        velocity_x = spring(rotation_x, target_rotation_x, velocity_x, 10, dt);
        velocity_y = spring(rotation_y, target_rotation_y, velocity_y, 10, dt);
        rotation_x += velocity_x * dt * ss;
        rotation_y += velocity_y * dt * ss;

        const style = `perspective(700px) rotateX(${rotation_y}rad) rotateY(${rotation_x}rad)`;

        for (const el of elements)
        {
            el.style.transform = style;
        }

        requestAnimationFrame(update);
    })();

    event_listener_array(window, ["mousemove", "touchmove"], (e) =>
    {
        if (e.changedTouches && e.changedTouches[0])
        {
            e = e.changedTouches[0];
        }

        target_rotation_x = (e.clientX / window.innerWidth) * 2 - 1;
        target_rotation_y = -(e.clientY / window.innerHeight) * 2 + 1;

        target_rotation_x = clamp(target_rotation_x, -0.5, 0.5);
        target_rotation_y = clamp(target_rotation_y, -0.5, 0.5);
    }, false);

    function spring(position, target, velocity, omega, dt)
    {
        let n1 = velocity - (position - target) * (Math.pow(omega, 2) * dt);
        let n2 = 1 + omega * dt;
        return n1 / Math.pow(n2, 2);
    }
    function clamp(value, min, max)
    {
        return Math.min(Math.max(value, min), max);
    }
}

(function pick_greeting()
{
    const hours = new Date().getHours();
    const greeing_el = document.querySelector(".greeting");

    if (hours < 6)
    {
        const data = "Good night";
        greeing_el.textContent = data;
        greeing_el.innerText = data;
    } else if (hours >= 6 && hours < 12)
    {
        const data = "Good morning";
        greeing_el.textContent = data;
        greeing_el.innerText = data;
    } else if (hours >= 12 && hours < 16)
    {
        const data = "Good afternoon";
        greeing_el.textContent = data;
        greeing_el.innerText = data;
    } else if (hours >= 16 && hours <= 23)
    {
        const data = "Good evening";
        greeing_el.textContent = data;
        greeing_el.innerText = data;
    } else
    {
        const data = "Hello";
        greeing_el.textContent = data;
        greeing_el.innerText = data;
    }

    setTimeout(pick_greeting, 6e4);
})();

(function render_time()
{
    const time = new Date();
    let h = time.getHours();

    h = h.toString().padStart(2, 0);
    let m = time.getMinutes().toString().padStart(2, 0);
    let s = time.getSeconds().toString().padStart(2, 0);

    const clock_el = document.querySelector('.clock');
    if (!clock_el) return;

    const formatted_date = `${h}:${m}:${s}`;
    clock_el.textContent = formatted_date;
    clock_el.innerText = formatted_date;

    setTimeout(render_time, 1e3);
})();