export const DESIGNER = "designer";
export const VISUALIZER = "visualizer";

//Objects defining paths, aliases, and wait conditions for intercepting certain API requests.
export const extension = {
	path: "/api/provider/extension*",
	alias: "extensionFileLoad",
};

export const designEndpoint = {
	path: "/api/pattern*",
	alias: "designEp",
	wait: "@designEp",
	absolutePath: "/api/pattern",
};

export const MESHMAP_PATH = "/extension/meshmap";

export const CANVAS_CONTAINER_ID = "py-canvas-container";

export const TIME = {
	SMALL: 500,
	MEDIUM: 1000,
	LARGE: 1500,
	XLARGE: 2000,
	XXLARGE: 5000,
	XXXLARGE: 10000,
	X4LARGE: 15_000,
};

// export const canvasContainer = {
//   query: id(CANVAS_CONTAINER_ID),
//   alias: "canvas"
// }

export const playwrightTestDesign = {
	url: "/extension/meshmap?design=142f0054-d9ae-4352-8618-887104a81928",
	id: "142f0054-d9ae-4352-8618-887104a81928",
};
//Objects related to specific designs or patterns within the application.
export const hierarchyRelationshipDesign = playwrightTestDesign;

// An object specifying a URL, HTTP method, and aliases related to pattern conversion.
// export const cytoConversion = {
//   url: "/api/pattern?output=cytoscape",
//   method: "POST",
//   alias: "cytoPatternConversion",
//   wait: "@cytoPatternConversion"
// }

/**
 * Selection and general Event Binding Layer
 */
export const canvasLayer0 = {
	query: '[data-id="layer0-selectbox"]',
	alias: "layer0",
};

/**
 * drag and drop Layer
 */
export const canvasLayer1 = {
	query: '[data-id="layer1-drag"]',
	alias: "layer1",
};

/**
 * Node and Element Layer
 */
export const canvaslayer2 = {
	query: '[data-id="layer2-node"]',
	alias: "layer2",
};
