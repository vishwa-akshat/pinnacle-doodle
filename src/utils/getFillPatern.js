export const getFillPattern = (patternType, patternColor) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const width = 20; // Width of each mesh square
    const height = 20; // Height of each mesh square

    canvas.width = width;
    canvas.height = height;

    context.beginPath();
    context.strokeStyle = patternColor; // Color of the mesh lines with opacity: ;
    context.lineWidth = 1; // Width of the lines

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

// // Function to generate a mesh pattern
// export const getMeshPattern = () => {
//     const canvas = document.createElement("canvas");
//     const context = canvas.getContext("2d");

//     const width = 200; // Width of the canvas
//     const height = 100; // Height of the canvas

//     canvas.width = width;
//     canvas.height = height;

//     context.beginPath();
//     context.strokeStyle = "#fff"; // Color of the mesh lines with opacity
//     context.lineWidth = 1; // Width of the lines

//     // Draw diagonal lines with equal spacing between them
//     const spacing = 20; // Spacing between lines

//     for (let i = -width; i < width; i += spacing) {
//         context.moveTo(i, 0);
//         context.lineTo(i + height, height);
//     }
//     for (let i = width + width; i > width; i -= spacing) {
//         context.moveTo(i, 0);
//         context.lineTo(i + height, height);
//     }

//     context.stroke();

//     return canvas;
// };

// // Function to generate a mesh pattern
// export const getMeshXPattern = () => {
//     const canvas = document.createElement("canvas");
//     const context = canvas.getContext("2d");

//     const width = 20; // Width of each mesh square
//     const height = 20; // Height of each mesh square

//     canvas.width = width;
//     canvas.height = height;

//     context.beginPath();
//     context.strokeStyle = "#fff"; // Color of the mesh lines with opacity
//     context.lineWidth = 1; // Width of the lines

//     // Draw diagonal lines forming an "X" pattern
//     context.moveTo(0, 0);
//     context.lineTo(width, height);
//     context.moveTo(0, height);
//     context.lineTo(width, 0);

//     context.stroke();

//     return canvas;
// };
