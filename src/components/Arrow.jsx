import { useRef, useEffect } from "react";
import { Arrow, Transformer } from "react-konva";

export default function ArrowShape({
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
            <Arrow
                key={index}
                points={shape.points}
                stroke="white"
                strokeWidth={2}
                tension={0.5}
                lineCap="round"
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
