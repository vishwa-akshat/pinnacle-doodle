import { useRef, useEffect } from "react";
import { Text, Transformer } from "react-konva";

export default function TextShape({
    shape,
    index,
    handleDragEnd,
    setSelectedShapeIndex,
    selectedShapeIndex,
    isSelected,
    shapes,
    setTextValue,
    setShapes,
    textValue,
}) {
    const shapeRef = useRef();
    const transformerRef = useRef(null);

    useEffect(() => {
        if (isSelected) {
            transformerRef.current.nodes([shapeRef.current]);
            transformerRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    const handleTextChange = (e) => {
        setTextValue(e.target.value);
    };

    return (
        <>
            <Text
                key={index}
                x={shape.x}
                y={shape.y}
                text={shape.text}
                fontSize={16}
                fill="white"
                ref={shapeRef}
                draggable={selectedShapeIndex === index}
                onDragEnd={(e) => handleDragEnd(e, index)}
                onClick={() => setTextValue(shapes[index]?.text || "")}
                // onTransformEnd={(e) => {
                //     const node = e.target;
                //     const index = node.index;
                //     const updatedshapes = [...shapes];
                //     updatedshapes[index] = {
                //         ...updatedshapes[index],
                //         x: node.x(),
                //         y: node.y(),
                //         width: node.width() * node.scaleX(),
                //         height: node.height() * node.scaleY(),
                //     };
                //     setShapes(updatedshapes);
                //     node.scaleX(1);
                //     node.scaleY(1);
                // }}
            >
                <input
                    type="text"
                    placeholder="Enter text"
                    value={textValue}
                    onChange={handleTextChange}
                />
            </Text>
            {isSelected && <Transformer ref={transformerRef} />}
        </>
    );
}
