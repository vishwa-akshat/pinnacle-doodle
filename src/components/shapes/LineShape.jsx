import { useRef, useEffect } from "react";
import { Line, Transformer } from "react-konva";

import { getFillPattern } from "../../utils/getFillPatern";

export default function LineShape({
    shape,
    // handleDragEnd,
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
                hitStrokeWidth={40}
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
