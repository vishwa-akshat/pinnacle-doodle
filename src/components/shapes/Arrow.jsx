import { useRef, useEffect } from "react";
import { Arrow, Transformer } from "react-konva";

import { getFillPattern } from "../../utils/getFillPatern";

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
                points={shape.points}
                stroke={shape.stroke}
                strokeWidth={shape.strokeWidth}
                tension={0.5}
                hitStrokeWidth={40}
                lineCap="round"
                dash={[shape.dash]}
                cornerRadius={shape.edge}
                opacity={shape.opacity}
                fill={shape.fillStyle === "full" && shape.fill}
                fillPatternImage={getFillPattern(shape.fillStyle, shape.fill)}
                fillPatternOffset={{ x: 0, y: 0 }}
                fillPatternRepeat="repeat"
                ref={shapeRef}
                draggable={selectedShapeId === shape.id}
                onDragEnd={(e) => handleDragEnd(e, shape.id)}
                onClick={() => handleShapeClick(shape.id)}
                onTransformEnd={(e) => {
                    const node = e.target;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();
                    const width = node.width() * scaleX;
                    const height = node.height() * scaleY;

                    const updatedShapes = shapes.map((shp) => {
                        if (shp.id === shape.id) {
                            return {
                                ...shp,
                                points: [
                                    shp.points[0],
                                    shp.points[1],
                                    shp.points[0] + width,
                                    shp.points[1] + height,
                                ],
                            };
                        }
                        return shp;
                    });

                    setShapes(updatedShapes);
                    node.scaleX(1);
                    node.scaleY(1);
                }}
            />
            {isSelected && <Transformer ref={transformerRef} />}
        </>
    );
}
