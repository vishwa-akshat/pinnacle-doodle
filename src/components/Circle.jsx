import { useRef, useEffect } from "react";
import { Circle, Transformer } from "react-konva";

export default function CircleShape({
    circle,
    index,
    handleDragEnd,
    setSelectedCircleIndex,
    selectedCircleIndex,
    isSelected,
    circles,
    setCircles,
}) {
    const shapeRef = useRef();
    const transformerRef = useRef(null);

    useEffect(() => {
        if (isSelected) {
            transformerRef.current.nodes([shapeRef.current]);
            transformerRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    const handleDeleteKeyPress = (e) => {
        if (e.key === "Delete" && selectedCircleIndex !== null) {
            const updatedShapes = circles.filter(
                (_, index) => index !== selectedCircleIndex
            );
            setCircles(updatedShapes);
            setSelectedCircleIndex(null);
        }
    };

    useEffect(() => {
        if (!isSelected) return;

        document.addEventListener("keydown", handleDeleteKeyPress);

        return () => {
            document.removeEventListener("keydown", handleDeleteKeyPress);
        };
    }, [isSelected]);

    return (
        <>
            <Circle
                key={index}
                x={circle.x}
                y={circle.y}
                draggable
                ref={shapeRef}
                stroke="black"
                onDragEnd={(e) => handleDragEnd(e, index)}
                radius={circle.radius}
                strokeWidth={2}
                onClick={() => setSelectedCircleIndex(index)}
                onTransformEnd={(e) => {
                    const node = e.target;
                    const index = node.index;
                    console.log(e);
                    const updatedCircles = [...circles];
                    updatedCircles[index] = {
                        ...updatedCircles[index],
                        x: node.x(),
                        y: node.y(),
                        radius: node.radius() * node.scaleX(),
                    };
                    setCircles(updatedCircles);
                    node.scaleX(1);
                    node.scaleY(1);
                }}
            />
            {isSelected && <Transformer ref={transformerRef} />}
        </>
    );
}
