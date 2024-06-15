export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","Ethnicity.csv","favicon.png","map_LA.geojson","sobriety_data.csv","traffic_collision_data.csv"]),
	mimeTypes: {".csv":"text/csv",".png":"image/png",".geojson":"application/geo+json"},
	_: {
		client: {"start":"_app/immutable/entry/start.t04_18Fy.js","app":"_app/immutable/entry/app.KpyMPFtm.js","imports":["_app/immutable/entry/start.t04_18Fy.js","_app/immutable/chunks/entry.g_iytxBL.js","_app/immutable/chunks/scheduler.zMJaRgub.js","_app/immutable/entry/app.KpyMPFtm.js","_app/immutable/chunks/scheduler.zMJaRgub.js","_app/immutable/chunks/index.lNTfdG2H.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
