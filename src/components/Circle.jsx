import { useRef, useEffect } from "react";
import { Circle, Transformer } from "react-konva";

export default function CircleShape({
    circle,
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
            <Circle
                key={index}
                x={circle.x}
                y={circle.y}
                draggable={selectedShapeIndex === index}
                ref={shapeRef}
                stroke="white"
                onDragEnd={(e) => handleDragEnd(e, index)}
                radius={circle.radius}
                strokeWidth={2}
                onClick={() => setSelectedShapeIndex(index)}
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
