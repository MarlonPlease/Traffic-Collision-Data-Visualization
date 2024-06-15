

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.zAtH95lk.js","_app/immutable/chunks/scheduler.zMJaRgub.js","_app/immutable/chunks/index.lNTfdG2H.js"];
export const stylesheets = ["_app/immutable/assets/2.MQlFqrIO.css"];
export const fonts = [];
