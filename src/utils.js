export let last_update = Date.now();

export function calc_delta_time() {
    let now = Date.now();
    let dt = (now - last_update) / 1e3;
    dt = Math.min(dt, 0.016);
    last_update = now;
    return dt;
}

export function event_listener_array(whos, event_names, callback, options = null) {
    if (!Array.isArray(whos)) {
        whos = [whos];
    }
    for (const name of event_names) {
        for (const who of whos) {
            who.addEventListener(name, callback, options);
        }
    }
}

export async function import_js_as_module(url) {
    return new Promise((resole, reject) => {
        const body = document.getElementsByTagName('body')[0];
        const script = document.createElement('script');
        script.type = 'module';
        script.src = url;
        script.onload = resole;
        body.appendChild(script);
    });
}