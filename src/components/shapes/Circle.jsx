import { useRef, useEffect } from "react";
import { Circle, Transformer } from "react-konva";

import { getFillPattern } from "../../utils/getFillPatern";

export default function CircleShape({
    shape,
    handleDragEnd,
    selectedShapeId,
    isSelected,
    shapes,
    setShapes,
    handleShapeClick,
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
            <Circle
                x={shape.x}
                y={shape.y}
                dash={[shape.dash]}
                fill={shape.fillStyle === "full" && shape.fill}
                fillPatternImage={getFillPattern(shape.fillStyle, shape.fill)}
                fillPatternOffset={{ x: 0, y: 0 }}
                fillPatternRepeat="repeat"
                draggable={selectedShapeId === shape.id}
                ref={shapeRef}
                opacity={shape.opacity}
                cornerRadius={shape.edge}
                stroke={shape.stroke}
                onDragEnd={(e) => handleDragEnd(e, shape.id)}
                radius={shape.radius}
                strokeWidth={shape.strokeWidth}
                onClick={() => handleShapeClick(shape.id)}
                onTransformEnd={(e) => {
                    const node = e.target;
                    const index = node.index;

                    const updatedshapes = [...shapes];
                    updatedshapes[index] = {
                        ...updatedshapes[index],
                        x: node.x(),
                        y: node.y(),
                        radius: node.radius() * node.scaleX(),
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
