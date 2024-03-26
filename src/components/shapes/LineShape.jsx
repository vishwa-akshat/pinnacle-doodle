import { useRef, useEffect } from "react";
import { Line, Transformer } from "react-konva";

import { getFillPattern } from "../../utils/getFillPatern";

export default function LineShape({
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
            <Line
                key={shape.id}
                points={shape.points}
                stroke={shape.stroke}
                dash={[shape.dash]}
                strokeWidth={shape.strokeWidth}
                tension={0.5}
                opacity={shape.opacity}
                cornerRadius={shape.edge}
                fill={shape.fillStyle === "full" && shape.fill}
                fillPatternImage={getFillPattern(shape.fillStyle, shape.fill)}
                fillPatternOffset={{ x: 0, y: 0 }}
                fillPatternRepeat="repeat"
                ref={shapeRef}
                draggable={selectedShapeId === shape.id}
                onDragEnd={(e) => {
                    const node = e.target;
                    const index = node.index;
                    const updatedShapes = [...shapes];
                    updatedShapes[index] = {
                        ...updatedShapes[index],
                        points: node.points(),
                    };
                    setShapes(updatedShapes);
                }}
                onClick={() => handleShapeClick(shape.id)}
                onTransformEnd={(e) => {
                    const node = e.target;
                    const index = node.index;
                    const updatedShapes = [...shapes];
                    updatedShapes[index] = {
                        ...updatedShapes[index],
                        points: node.points(),
                    };
                    setShapes(updatedShapes);
                    node.scaleX(1);
                    node.scaleY(1);
                }}
            />
            {isSelected && <Transformer ref={transformerRef} />}
        </>
    );
}
