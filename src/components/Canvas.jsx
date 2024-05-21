import { useRef, useState, useEffect } from "react";
import { Stage, Layer } from "react-konva";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import CircleShape from "./shapes/Circle";
import RectangleShape from "./shapes/Rectangle";

import useCanvasStore from "../store/canvasStore";
import LineShape from "./shapes/LineShape";
import ArrowShape from "./shapes/Arrow";
import UndoRedoButtons from "./UndoRedoButtons";
import TextShape from "./Text";
import ZoomInZoomOutButtons from "./ZoomInZoomOutButtons";
import Grid from "./Grid";
import ShapeEditor from "./ShapeEditor";
// import GridBG from "./GridBG";

const Wrapper = styled.div`
    position: relative;
`;
const ButtonsWrapper = styled.div`
    position: absolute;
    z-index: 999;
    bottom: 30px;
    left: 30px;
    display: flex;
    gap: 30px;
`;

const ShapeEditorWrapper = styled.div`
    position: absolute;
    z-index: 999;
    top: 100px;
    left: 30px;
`;

export default function Canvas() {
    const stageRef = useRef(null);
    const layerRef = useRef(null);

    const [active, setActive] = useState(false);
    const [shapes, setShapes] = useState([]);
    const [selectedShapeId, setSelectedShapeId] = useState(null);
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [textValue, setTextValue] = useState("");
    const [scale, setScale] = useState(1);
    const [stagePos, setStagePos] = useState({ x: 0, y: 0 });

    const { activeShape, setActiveShape } = useCanvasStore();

    useEffect(() => {
        layerRef.current.scale({ x: scale, y: scale });
        layerRef.current.x(stagePos.x);
        layerRef.current.y(stagePos.y);
    }, [stagePos, scale]);

    const handleDeleteKeyPress = (e) => {
        if (e.key === "Delete" && selectedShapeId !== null) {
            const updatedShapes = shapes.filter(
                (_, index) => index !== selectedShapeId
            );
            setShapes(updatedShapes);
            addToHistory(updatedShapes);
            setSelectedShapeId(null);
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleDeleteKeyPress);

        return () => {
            document.removeEventListener("keydown", handleDeleteKeyPress);
        };
    }, [selectedShapeId, shapes]);

    const addToHistory = (shapes) => {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(shapes);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    };

    const handleMouseDown = () => {
        if (
            activeShape === "Selector" ||
            activeShape === "Move" ||
            activeShape === "Eraser"
        ) {
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
                };
                break;
            case "Rectangle":
                newShape = {
                    x: position.x,
                    y: position.y,
                    width: 0,
                    height: 0,
                };
                break;
            case "Line":
            case "Arrow":
            case "Draw":
                newShape = {
                    points: [position.x, position.y],
                };
                break;
            case "Text":
                newShape = {
                    x: position.x,
                    y: position.y,
                    text: "",
                    type: activeShape,
                };
                break;
            default:
                break;
        }

        newShape = {
            ...newShape,
            type: activeShape,
            id: uuidv4(),
            stroke: "#ffffff",
            fill: "transparent",
            strokeWidth: 2,
            fillStyle: "none",
            dash: 0,
            corner: 0,
            opacity: 1,
        };

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
        if (activeShape !== "Move") {
            setActiveShape("Selector");
            setActive(false);
            setSelectedShapeId(null);
        }
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

    const handleStageDragEnd = (e) => {
        setStagePos(e.currentTarget.position());
    };

    const handleShapeClick = (id) => {
        if (activeShape === "Eraser") {
            setShapes(shapes.filter((shape) => shape.id !== id));
        } else {
            setSelectedShapeId(id);
        }
    };
    // const handleWheel = (e) => {
    //     e.evt.preventDefault();
    //     const scaleBy = 1.1;
    //     const stage = e.currentTarget;
    //     const oldScale = stage.scaleX();
    //     const mousePointTo = {
    //         x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
    //         y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    //     };
    //     const newScale =
    //         e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    //     setScale(newScale);
    //     setStagePos({
    //         x:
    //             -(mousePointTo.x - stage.getPointerPosition().x / newScale) *
    //             newScale,
    //         y:
    //             -(mousePointTo.y - stage.getPointerPosition().y / newScale) *
    //             newScale,
    //     });
    // };

    const getCursor = () => {
        switch (activeShape) {
            case "Move":
                return "grab";
            case "Selector":
                return "default";
            default:
                return "crosshair";
        }
    };

    return (
        <Wrapper>
            <ButtonsWrapper>
                <ZoomInZoomOutButtons scale={scale} setScale={setScale} />
                <UndoRedoButtons
                    history={history}
                    historyIndex={historyIndex}
                    setShapes={setShapes}
                    setHistoryIndex={setHistoryIndex}
                    setSelectedShapeId={setSelectedShapeId}
                />
            </ButtonsWrapper>

            {selectedShapeId && (
                <ShapeEditorWrapper>
                    <ShapeEditor
                        selectedShapeId={selectedShapeId}
                        setSelectedShapeId={setSelectedShapeId}
                        shapes={shapes}
                        setShapes={setShapes}
                    />
                </ShapeEditorWrapper>
            )}

            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                ref={stageRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                draggable={activeShape === "Move"}
                onMouseUp={handleMouseUp}
                style={{
                    cursor: getCursor(),
                }}
                scaleX={scale}
                scaleY={scale}
                onDragEnd={handleStageDragEnd}
                // onWheel={handleWheel}
            >
                <Grid
                    baseCellSize={80}
                    scale={scale}
                    strokeColor="#222222"
                    isBottom
                />
                <Grid baseCellSize={20} scale={scale} strokeColor="#3131317a" />

                <Layer className="grid-layer" ref={layerRef}>
                    {shapes.map((shape) => {
                        if (shape.type === "Rectangle") {
                            return (
                                <RectangleShape
                                    key={shape.id}
                                    shape={shape}
                                    handleDragEnd={handleDragEnd}
                                    selectedShapeId={selectedShapeId}
                                    handleShapeClick={handleShapeClick}
                                    isSelected={selectedShapeId === shape.id}
                                    layerRef={layerRef}
                                    setShapes={setShapes}
                                    shapes={shapes}
                                />
                            );
                        } else if (shape.type === "Circle") {
                            return (
                                <CircleShape
                                    key={shape.id}
                                    shape={shape}
                                    handleDragEnd={handleDragEnd}
                                    selectedShapeId={selectedShapeId}
                                    handleShapeClick={handleShapeClick}
                                    isSelected={selectedShapeId === shape.id}
                                    layerRef={layerRef}
                                    setShapes={setShapes}
                                    shapes={shapes}
                                />
                            );
                        } else if (shape.type === "Line") {
                            return (
                                <LineShape
                                    key={shape.id}
                                    shape={shape}
                                    handleDragEnd={handleDragEnd}
                                    selectedShapeId={selectedShapeId}
                                    handleShapeClick={handleShapeClick}
                                    isSelected={selectedShapeId === shape.id}
                                    layerRef={layerRef}
                                    setShapes={setShapes}
                                    shapes={shapes}
                                />
                            );
                        } else if (shape.type === "Draw") {
                            return (
                                <LineShape
                                    key={shape.id}
                                    shape={shape}
                                    handleDragEnd={handleDragEnd}
                                    selectedShapeId={selectedShapeId}
                                    handleShapeClick={handleShapeClick}
                                    isSelected={selectedShapeId === shape.id}
                                    layerRef={layerRef}
                                    setShapes={setShapes}
                                    shapes={shapes}
                                />
                            );
                        } else if (shape.type === "Arrow") {
                            return (
                                <ArrowShape
                                    key={shape.id}
                                    shape={shape}
                                    handleDragEnd={handleDragEnd}
                                    selectedShapeId={selectedShapeId}
                                    handleShapeClick={handleShapeClick}
                                    isSelected={selectedShapeId === shape.id}
                                    layerRef={layerRef}
                                    setShapes={setShapes}
                                    shapes={shapes}
                                />
                            );
                        } else if (shape.type === "Text") {
                            return (
                                <TextShape
                                    shape={shape}
                                    handleDragEnd={handleDragEnd}
                                    setSelectedShapeId={setSelectedShapeId}
                                    selectedShapeId={selectedShapeId}
                                    handleShapeClick={handleShapeClick}
                                    isSelected={selectedShapeId === shape.id}
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
