import * as path from "path";
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import rollupReplace from "@rollup/plugin-replace";
import tsconfigPaths from 'vite-tsconfig-paths';
import fs from "fs";
export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	return {
		root: "src",
		build:{
			outDir:"../../public",
		},
		// server: {
		// 	https: {
		// 		key: fs.readFileSync('./certs/localhost-key.pem'),
		// 		cert: fs.readFileSync('./certs/localhost.pem'),
		// 	}
		// },
		plugins: [
			tsconfigPaths(),
			react(),
			rollupReplace({
				preventAssignment: true,
				values: {
					__DEV__: JSON.stringify(true),
					"process.env.NODE_ENV": JSON.stringify("development"),
				},
			}),
		],
		resolve: process.env.USE_SOURCE
			? {
				alias: {
					"@remix-run/router": path.resolve(
						__dirname,
						"../../packages/router/index.ts"
					),
					"react-router": path.resolve(
						__dirname,
						"../../packages/react-router/index.ts"
					),
					"react-router-dom": path.resolve(
						__dirname,
						"../../packages/react-router-dom/index.tsx"
					),
				},
			}
			: {},
		define: {
			'process.env': env ,
		},
	};
});
