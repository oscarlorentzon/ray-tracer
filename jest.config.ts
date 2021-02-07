export default {
    collectCoverage: true,
    collectCoverageFrom: ["<rootDir>/src/**/*"],
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
