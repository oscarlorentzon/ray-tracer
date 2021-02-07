export default {
    collectCoverage: true,
    collectCoverageFrom: [
        "<rootDir>/src/**/*",
    ],
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "/build/src/ray-tracer.js",
    ],
    coverageProvider: "v8",
    moduleDirectories: [
        "node_modules",
    ],
    moduleFileExtensions: [
        "js"
    ],
    rootDir: "build",
    slowTestThreshold: 1,
    watchman: false,
};
