export const getFillPattern = (patternType, patternColor) => {
    if (!patternType || !patternColor) {
        console.error("getFillPattern: Invalid input. Returning null");
        return null;
    }

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
        console.error("getFillPattern: Could not get 2d context");
        return null;
    }

    const width = 20;
    const height = 20;

    canvas.width = width;
    canvas.height = height;

    context.beginPath();
    context.strokeStyle = patternColor;
    context.lineWidth = 1;

    if (patternType === "mesh") {
        context.moveTo(0, 0);
        context.lineTo(width, height);
        context.moveTo(0, height);
        context.lineTo(width, 0);
    } else if (patternType === "diagonal") {
        context.moveTo(0, 0);
        context.lineTo(width, height);
    }

    context.stroke();

    return canvas;
};
