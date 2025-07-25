const Path = require("path");
const fs = require("fs");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

require("dotenv").config({path: Path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`)});

// Function to generate HTML plugins dynamically
function generateHtmlPlugins(templateDir) {
	const templateFiles = fs.readdirSync(Path.resolve(__dirname, templateDir));
	return templateFiles
		.map((item) => {
			const parts = item.split(".");
			const name = parts[0];
			const extension = parts[1];
			if (["html", "hbs"].includes(extension)) {
				return new HtmlWebpackPlugin({
					filename: templateDir.includes("sluzby")
						? `sluzby/${name}.html`
						: `${name}.html`,
					template: Path.resolve(
						__dirname,
						`${templateDir}/${name}.${extension}`
					),
					minify: false,
					base: process.env.BASE_URL
						? process.env.BASE_URL
						: false,
				});
			}
		})
		.filter((item) => item); // Filter undefined items
}

const htmlPlugins = [
  ...generateHtmlPlugins("../src"),
  ...generateHtmlPlugins("../src/sluzby"),
];

module.exports = {
	entry: {
		app: Path.resolve(__dirname, "../src/scripts/index.js"),
	},
	output: {
		path: Path.join(__dirname, "../build"),
		filename: "js/[name].js",
	},
	optimization: {
		splitChunks: {
			chunks: "all",
			name: false,
		},
	},
	resolve: {
		alias: {
			"~": Path.resolve(__dirname, "../src"),
		},
		modules: [Path.resolve(__dirname, "../node_modules"), "node_modules"],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{ from: Path.resolve(__dirname, "../public"), to: "public" },
				{ from: Path.resolve(__dirname, "../src/assets"), to: "assets" },
				{ from: Path.resolve(__dirname, "../static/.htaccess"), to: ".htaccess" },
				{ from: Path.resolve(__dirname, "../static/form-process.php"), to: Path.resolve(__dirname, "../form-process.php") },
			],
		}),
		...htmlPlugins, // Spread all dynamically generated HtmlWebpackPlugin instances
		function() {
			console.log('NODE_ENV:', process.env.NODE_ENV);
			console.log('Resolved .env path:', Path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`));
			console.log('BASE_URL:', process.env.BASE_URL);
		},
	],
	module: {
		rules: [
			{
				test: /\.mjs$/,
				include: /node_modules/,
				type: "javascript/auto",
			},
			{
				test: /\.html$/i,
				loader: "html-loader",
				options: {
					minimize: false
				}
			},
			{
				test: /\.hbs$/,
				loader: "handlebars-loader",
				options: {
					partialDirs: [
						Path.resolve(__dirname, "../src/templates")
					]
				}
			},
			{
				test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
				type: "asset",
			},
		],
	},
};
