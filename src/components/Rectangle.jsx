import { useRef, useEffect } from "react";
import { Rect, Transformer } from "react-konva";

export default function RectangleShape({
    shape,
    index,
    handleDragEnd,
    setSelectedShapeIndex,
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
                key={index}
                x={shape.x}
                y={shape.y}
                width={shape.width}
                height={shape.height}
                stroke="white"
                strokeWidth={2}
                ref={shapeRef}
                draggable
                onDragEnd={(e) => handleDragEnd(e, index)}
                onClick={() => setSelectedShapeIndex(index)}
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
