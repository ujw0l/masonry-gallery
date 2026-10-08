// The published libraries declare classes but do not export them.
// Keep their original implementation and expose it to webpack.
module.exports = function legacyLibraryLoader(source) {
	const name = this.resourcePath.includes("js-masonry")
		? "jsMasonry"
		: "ctcOverlayViewer";
	return `${source}\nexport { ${name} };\n`;
};
