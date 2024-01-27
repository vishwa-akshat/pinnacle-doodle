import { useRef, useEffect } from "react";
import { Line, Transformer } from "react-konva";

export default function LineShape({
    shape,
    index,
    handleDragEnd,
    setSelectedShapeIndex,
    selectedShapeIndex,
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
                key={index}
                points={shape.points}
                stroke="white"
                strokeWidth={2}
                tension={0.5}
                ref={shapeRef}
                lineCap="round"
                draggable
                onDragEnd={(e) => {
                    const node = e.target;
                    const updatedShapes = [...shapes];
                    updatedShapes[selectedShapeIndex] = {
                        ...updatedShapes[selectedShapeIndex],
                        points: node.points(),
                    };
                    setShapes(updatedShapes);
                }}
                onClick={() => setSelectedShapeIndex(index)}
                onTransformEnd={(e) => {
                    const node = e.target;
                    const updatedShapes = [...shapes];
                    updatedShapes[selectedShapeIndex] = {
                        ...updatedShapes[selectedShapeIndex],
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
