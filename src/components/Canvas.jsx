import { useRef, useState } from "react";
import { Stage, Layer } from "react-konva";

import CircleShape from "./Circle";

import useCanvasStore from "../store/canvasStore";

export default function Canvas() {
    const stageRef = useRef(null);
    const layerRef = useRef(null);

    const [circles, setCircles] = useState([]);
    const [active, setActive] = useState(false);
    const [selectedCircleIndex, setSelectedCircleIndex] = useState(null);

    const { activeDraw, setActiveDraw } = useCanvasStore();

    const handleMouseDown = (e) => {
        if (!activeDraw) {
            return;
        }

        const stage = stageRef.current;
        const position = stage.getPointerPosition();

        const newCircle = {
            x: position.x,
            y: position.y,
            radius: 0,
        };

        setCircles((prevCircles) => [...prevCircles, newCircle]);
        setActive(true);
    };

    const handleMouseMove = (e) => {
        if (!active) {
            return;
        }

        const stage = stageRef.current;
        const position = stage.getPointerPosition();

        const updatedCircles = [...circles];
        const currentCircle = updatedCircles[updatedCircles.length - 1];

        if (currentCircle) {
            currentCircle.radius = Math.sqrt(
                Math.pow(position.x - currentCircle.x, 2) +
                    Math.pow(position.y - currentCircle.y, 2)
            );
        }

        setCircles(updatedCircles);
    };

    const handleMouseUp = (e) => {
        setActive(false);
        setActiveDraw(false);
        setSelectedCircleIndex(null);
    };

    const handleDragEnd = (e, index) => {
        const updatedCircles = [...circles];
        updatedCircles[index] = {
            ...updatedCircles[index],
            x: e.target.x(),
            y: e.target.y(),
        };
        setCircles(updatedCircles);
    };
    return (
        <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            ref={stageRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{
                cursor: activeDraw ? "grab" : "pointer",
                background: "#1B4242",
            }}
        >
            <Layer ref={layerRef}>
                {circles.map((circle, index) => (
                    <CircleShape
                        circle={circle}
                        index={index}
                        handleDragEnd={handleDragEnd}
                        setSelectedCircleIndex={setSelectedCircleIndex}
                        selectedCircleIndex={selectedCircleIndex}
                        isSelected={selectedCircleIndex === index}
                        layerRef={layerRef}
                        setCircles={setCircles}
                        circles={circles}
                    />
                ))}
            </Layer>
        </Stage>
    );
}
