import { useRef, useEffect } from "react";
import { Arrow, Transformer } from "react-konva";

export default function ArrowShape({
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
            <Arrow
                key={shape.id}
                points={shape.points}
                stroke={shape.stroke}
                strokeWidth={2}
                tension={0.5}
                lineCap="round"
                fill={shape.fill}
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
