import { useRef, useEffect } from "react";
import { Rect, Transformer } from "react-konva";

// Function to generate a mesh pattern
const getMeshPattern = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const width = 200; // Width of the canvas
    const height = 100; // Height of the canvas

    canvas.width = width;
    canvas.height = height;

    context.beginPath();
    context.strokeStyle = "#fff"; // Color of the mesh lines with opacity
    context.lineWidth = 1; // Width of the lines

    // Draw diagonal lines with equal spacing between them
    const spacing = 20; // Spacing between lines

    for (let i = -width; i < width; i += spacing) {
        context.moveTo(i, 0);
        context.lineTo(i + height, height);
    }
    for (let i = width + width; i > width; i -= spacing) {
        context.moveTo(i, 0);
        context.lineTo(i + height, height);
    }

    context.stroke();

    return canvas;
};

// Function to generate a mesh pattern
const getMeshXPattern = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const width = 20; // Width of each mesh square
    const height = 20; // Height of each mesh square

    canvas.width = width;
    canvas.height = height;

    context.beginPath();
    context.strokeStyle = "#fff"; // Color of the mesh lines with opacity
    context.lineWidth = 1; // Width of the lines

    // Draw diagonal lines forming an "X" pattern
    context.moveTo(0, 0);
    context.lineTo(width, height);
    context.moveTo(0, height);
    context.lineTo(width, 0);

    context.stroke();

    return canvas;
};

export default function RectangleShape({
    shape,
    handleDragEnd,
    handleShapeClick,
    selectedShapeId,
    isSelected,
    shapes,
    setShapes,
}) {
    const shapeRef = useRef();
    const transformerRef = useRef(null);

    useEffect(() => {
        if (isSelected) {
            transformerRef.current.nodes([shapeRef.current]);
            transformerRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <>
            <Rect
                key={shape.id}
                x={shape.x}
                y={shape.y}
                width={shape.width}
                height={shape.height}
                stroke={shape.stroke}
                fill={shape.fill}
                opacity={1}
                strokeWidth={2}
                fillPatternImage={getMeshXPattern()} // Set a mesh pattern image
                fillPatternOffset={{ x: 0, y: 0 }}
                fillPatternRepeat="repeat"
                ref={shapeRef}
                draggable={selectedShapeId === shape.id}
                onDragEnd={(e) => handleDragEnd(e, shape.id)}
                onClick={() => handleShapeClick(shape.id)}
                onTransformEnd={(e) => {
                    const node = e.target;
                    const index = node.index;
                    const updatedshapes = [...shapes];
                    updatedshapes[index] = {
                        ...updatedshapes[index],
                        x: node.x(),
                        y: node.y(),
                        width: node.width() * node.scaleX(),
                        height: node.height() * node.scaleY(),
                    };
                    setShapes(updatedshapes);
                    node.scaleX(1);
                    node.scaleY(1);
                }}
            />
            {isSelected && <Transformer ref={transformerRef} />}
        </>
    );
}
