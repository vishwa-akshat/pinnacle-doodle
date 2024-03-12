import React, { useState, useEffect } from "react";
import { Layer, Rect } from "react-konva";

export default function Grid({ baseCellSize, scale, strokeColor, isBottom }) {
    const [canvasSize, setCanvasSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [numRows, setNumRows] = useState(0);
    const [numCols, setNumCols] = useState(0);

    useEffect(() => {
        const calculateGridDimensions = () => {
            const calculatedNumRows = Math.ceil(
                canvasSize.height / (baseCellSize * scale)
            );
            const calculatedNumCols = Math.ceil(
                canvasSize.width / (baseCellSize * scale)
            );
            setNumRows(calculatedNumRows);
            setNumCols(calculatedNumCols);
        };

        calculateGridDimensions();

        const handleResize = () => {
            setCanvasSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [baseCellSize, canvasSize.height, canvasSize.width, scale]);

    const gridCells = [];
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const cellSize = baseCellSize * scale;
            gridCells.push(
                <Rect
                    strokeWidth={1}
                    key={`${row}-${col}`}
                    x={col * cellSize}
                    y={row * cellSize}
                    width={cellSize}
                    height={cellSize}
                    fill={isBottom && "black"}
                    stroke={strokeColor}
                    dash={!isBottom && [4, 5]}
                />
            );
        }
    }

    return <Layer>{gridCells}</Layer>;
}
