const theme = require("../constants/themes.common");

const generateTailwindPalette = () => {
    const variables = theme;
    const palette = {};

    variables.forEach(variable => {
        const key = variable.replace("--", "").replace("-color", "");
        palette[key] = `var(${variable})`;
    });

    return palette;
}

module.exports = generateTailwindPalette;