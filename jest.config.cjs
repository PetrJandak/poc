module.exports =  {
    transform: {},

    preset: '@shelf/jest-mongodb',
    testEnvironment: 'node',
    collectCoverage: true,
    runners: "groups",
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: [
        '/node_modules/']
};
