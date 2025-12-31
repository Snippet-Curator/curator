const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["concourse_3_bold.woff2","concourse_3_bold_italic.woff2","concourse_3_italic.woff2","concourse_3_regular.woff2","concourse_4_bold.woff2","concourse_4_regular.woff2","favicon.svg","icon.png","icon.svg"]),
	mimeTypes: {".woff2":"font/woff2",".svg":"image/svg+xml",".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.jE5kPVpv.js",app:"_app/immutable/entry/app.DgsVe8zI.js",imports:["_app/immutable/entry/start.jE5kPVpv.js","_app/immutable/chunks/FAXfw1af.js","_app/immutable/chunks/CqKpht16.js","_app/immutable/entry/app.DgsVe8zI.js","_app/immutable/chunks/Dp1pzeXC.js","_app/immutable/chunks/CqKpht16.js","_app/immutable/chunks/D6MYdS9h.js","_app/immutable/chunks/cli-iPJS.js","_app/immutable/chunks/iduMi8zz.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-CNur345M.js')),
			__memo(() => import('./chunks/1-mCSBdKiI.js')),
			__memo(() => import('./chunks/2-CCedvalj.js')),
			__memo(() => import('./chunks/3-B-RIzLGR.js')),
			__memo(() => import('./chunks/4-DAGHnf-G.js')),
			__memo(() => import('./chunks/5-B96WhCfD.js')),
			__memo(() => import('./chunks/6-VWdJtv9w.js')),
			__memo(() => import('./chunks/7-CPD_WoC_.js')),
			__memo(() => import('./chunks/8-Cu2lJ4iD.js')),
			__memo(() => import('./chunks/9-BQcmJBoI.js')),
			__memo(() => import('./chunks/10-D3iHk9Pf.js')),
			__memo(() => import('./chunks/11-DUXrjxIy.js')),
			__memo(() => import('./chunks/12-CWxm3K4W.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/archive",
				pattern: /^\/archive\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/discover",
				pattern: /^\/discover\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/import",
				pattern: /^\/import\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/notebook/[slug]",
				pattern: /^\/notebook\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/note/[slug]",
				pattern: /^\/note\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/organize",
				pattern: /^\/organize\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/settings",
				pattern: /^\/settings\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/tags/[slug]",
				pattern: /^\/tags\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/test",
				pattern: /^\/test\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/trash",
				pattern: /^\/trash\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
