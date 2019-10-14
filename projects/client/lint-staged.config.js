module.exports = {
    "*.config.js": ["prettier --write", "git add"],
    "src/**/*.{ts,js}": ["prettier --write", "tslint --fix", "git add"]
};
