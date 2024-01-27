import { useRef, useState, useEffect } from "react";
import { Stage, Layer } from "react-konva";
import styled from "styled-components";

import CircleShape from "./Circle";
import RectangleShape from "./Rectangle";

import useCanvasStore from "../store/canvasStore";
import LineShape from "./LineShape";
import ArrowShape from "./Arrow";
import UndoRedoButtons from "./UndoRedoButtons";
import TextShape from "./Text";

const Wrapper = styled.div`
    position: relative;
`;
const ButtonsWrapper = styled.div`
    position: absolute;
    z-index: 999;
    bottom: 30px;
    left: 30px;
`;

export default function Canvas() {
    const stageRef = useRef(null);
    const layerRef = useRef(null);

    const [active, setActive] = useState(false);
    const [shapes, setShapes] = useState([]);
    const [selectedShapeIndex, setSelectedShapeIndex] = useState(null);
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [textValue, setTextValue] = useState("");

    const { activeShape, setActiveShape } = useCanvasStore();

    const handleDeleteKeyPress = (e) => {
        if (e.key === "Delete" && selectedShapeIndex !== null) {
            const updatedShapes = shapes.filter(
                (_, index) => index !== selectedShapeIndex
            );
            setShapes(updatedShapes);
            addToHistory(updatedShapes);
            setSelectedShapeIndex(null);
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleDeleteKeyPress);

        return () => {
            document.removeEventListener("keydown", handleDeleteKeyPress);
        };
    }, [selectedShapeIndex, shapes]);

    const addToHistory = (shapes) => {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(shapes);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    };

    const handleMouseDown = () => {
        if (activeShape === "Selector") {
            return;
        }

        const stage = stageRef.current;
        const position = stage.getPointerPosition();

        let newShape;

        switch (activeShape) {
            case "Circle":
                newShape = {
                    x: position.x,
                    y: position.y,
                    radius: 0,
                    type: activeShape,
                };
                break;
            case "Rectangle":
                newShape = {
                    x: position.x,
                    y: position.y,
                    width: 0,
                    height: 0,
                    type: activeShape,
                };
                break;
            case "Line":
            case "Arrow":
            case "Draw":
                newShape = {
                    points: [position.x, position.y],
                    type: activeShape,
                };
                break;
            case "Text":
                newShape = {
                    x: position.x,
                    y: position.y,
                    text: textValue,
                    type: activeShape,
                };
                break;
            default:
                break;
        }
        const updatedShapes = [...shapes, newShape];
        setShapes(updatedShapes);
        addToHistory(updatedShapes);
        setActive(true);
    };

    const handleMouseMove = () => {
        if (!active) {
            return;
        }

        const stage = stageRef.current;
        const position = stage.getPointerPosition();

        const updatedShapes = [...shapes];
        const currentShape = updatedShapes[updatedShapes.length - 1];

        if (currentShape) {
            switch (activeShape) {
                case "Selector":
                    return;
                case "Circle":
                    currentShape.radius = Math.sqrt(
                        Math.pow(position.x - currentShape.x, 2) +
                            Math.pow(position.y - currentShape.y, 2)
                    );
                    break;
                case "Line":
                case "Arrow":
                    currentShape.points = [
                        currentShape.points[0],
                        currentShape.points[1],
                        position.x,
                        position.y,
                    ];
                    break;
                case "Draw":
                    currentShape.points = [
                        ...currentShape.points,
                        position.x,
                        position.y,
                    ];
                    break;
                case "Rectangle":
                    currentShape.width = position.x - currentShape.x;
                    currentShape.height = position.y - currentShape.y;
                    break;
                case "Text":
                    currentShape.x = position.x;
                    currentShape.y = position.y;
                    break;
                default:
                    break;
            }
        }

        setShapes(updatedShapes);
    };

    const handleMouseUp = () => {
        setActive(false);
        setActiveShape("Selector");
        setSelectedShapeIndex(null);
        console.log(shapes);
    };

    const handleDragEnd = (e, index) => {
        const updatedShape = [...shapes];
        updatedShape[index] = {
            ...updatedShape[index],
            x: e.target.x(),
            y: e.target.y(),
        };
        setShapes(updatedShape);
    };

    return (
        <Wrapper>
            <ButtonsWrapper>
                <UndoRedoButtons
                    history={history}
                    historyIndex={historyIndex}
                    setShapes={setShapes}
                    setHistoryIndex={setHistoryIndex}
                    setSelectedShapeIndex={setSelectedShapeIndex}
                />
            </ButtonsWrapper>

            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                ref={stageRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                style={{
                    cursor: activeShape !== "pointer" ? "grab" : "pointer",
                    background: "#1B4242",
                }}
            >
                <Layer ref={layerRef}>
                    {shapes.map((shape, index) => {
                        if (shape.type === "Rectangle") {
                            return (
                                <RectangleShape
                                    shape={shape}
                                    index={index}
                                    handleDragEnd={handleDragEnd}
                                    setSelectedShapeIndex={
                                        setSelectedShapeIndex
                                    }
                                    selectedShapeIndex={selectedShapeIndex}
                                    isSelected={selectedShapeIndex === index}
                                    layerRef={layerRef}
                                    setShapes={setShapes}
                                    shapes={shapes}
                                />
                            );
                        } else if (shape.type === "Circle") {
                            return (
                                <CircleShape
                                    circle={shape}
                                    index={index}
                                    handleDragEnd={handleDragEnd}
                                    setSelectedShapeIndex={
                                        setSelectedShapeIndex
                                    }
                                    selectedShapeIndex={selectedShapeIndex}
                                    isSelected={selectedShapeIndex === index}
                                    layerRef={layerRef}
                                    setShapes={setShapes}
                                    shapes={shapes}
                                />
                            );
                        } else if (shape.type === "Line") {
                            return (
                                <LineShape
                                    shape={shape}
                                    index={index}
                                    handleDragEnd={handleDragEnd}
                                    setSelectedShapeIndex={
                                        setSelectedShapeIndex
                                    }
                                    selectedShapeIndex={selectedShapeIndex}
                                    isSelected={selectedShapeIndex === index}
                                    layerRef={layerRef}
                                    setShapes={setShapes}
                                    shapes={shapes}
                                />
                            );
                        } else if (shape.type === "Draw") {
                            return (
                                <LineShape
                                    shape={shape}
                                    index={index}
                                    handleDragEnd={handleDragEnd}
                                    setSelectedShapeIndex={
                                        setSelectedShapeIndex
                                    }
                                    selectedShapeIndex={selectedShapeIndex}
                                    isSelected={selectedShapeIndex === index}
                                    layerRef={layerRef}
                                    setShapes={setShapes}
                                    shapes={shapes}
                                />
                            );
                        } else if (shape.type === "Arrow") {
                            return (
                                <ArrowShape
                                    shape={shape}
                                    index={index}
                                    handleDragEnd={handleDragEnd}
                                    setSelectedShapeIndex={
                                        setSelectedShapeIndex
                                    }
                                    selectedShapeIndex={selectedShapeIndex}
                                    isSelected={selectedShapeIndex === index}
                                    layerRef={layerRef}
                                    setShapes={setShapes}
                                    shapes={shapes}
                                />
                            );
                        } else if (shape.type === "Text") {
                            return (
                                <TextShape
                                    shape={shape}
                                    index={index}
                                    handleDragEnd={handleDragEnd}
                                    setSelectedShapeIndex={
                                        setSelectedShapeIndex
                                    }
                                    selectedShapeIndex={selectedShapeIndex}
                                    isSelected={selectedShapeIndex === index}
                                    layerRef={layerRef}
                                    setShapes={setShapes}
                                    shapes={shapes}
                                    setTextValue={setTextValue}
                                    textValue={textValue}
                                />
                            );
                        }
                    })}
                </Layer>
            </Stage>
        </Wrapper>
    );
}
