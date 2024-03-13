import { useRef, useEffect } from "react";
import { Line, Transformer } from "react-konva";

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
                strokeWidth={shape.strokeWidth}
                tension={0.5}
                fill={shape.fill}
                ref={shapeRef}
                lineCap="round"
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
