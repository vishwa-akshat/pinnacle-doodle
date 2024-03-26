import { useRef, useEffect } from "react";
import { Rect, Transformer } from "react-konva";

import { getFillPattern } from "../../utils/getFillPatern";

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
                opacity={shape.opacity}
                dash={[shape.dash]}
                strokeWidth={shape.strokeWidth}
                fill={shape.fillStyle === "full" && shape.fill}
                fillPatternImage={getFillPattern(shape.fillStyle, shape.fill)}
                fillPatternOffset={{ x: 0, y: 0 }}
                fillPatternRepeat="repeat"
                cornerRadius={shape.edge}
                lineCap="butt"
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
