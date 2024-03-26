// import { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import ColorSelect from "./ColorSelect";
import StrokeWidthSelect from "./StrokeWidthSelect";
import FillSelect from "./FillSelect";
import DashSelect from "./DashSelect";
import EdgeSelect from "./EdgeSelect";
import Slider from "./Slider";
import LayerEdit from "./LayerEdit";
import ShapeActions from "./ShapeActions.jsx";

import lineThinIcon from "../assets/stroke-thin.svg";
import lineMediumIcon from "../assets/stroke-medium.svg";
import lineHeavyIcon from "../assets/stroke-heavy.svg";
import fillMeshIcon from "../assets/fill-mesh.png";
import fillDiagonalIcon from "../assets/fill-diagonal.png";
import LineDashMid from "../assets/line-dash-mid.png";
import LineDashHigh from "../assets/line-dash-high.png";
import EdgeSharp from "../assets/edge-sharp.png";
import EdgeRounded from "../assets/edge-rounded.png";
import SendToBackIcon from "../assets/send-to-back.jsx";
import SendBackwardsIcon from "../assets/send-backwards.jsx";
import BringToFrontIcon from "../assets/bring-to-front.jsx";
import BringForwardIcon from "../assets/bring-forward.jsx";
import DuplicateIcon from "../assets/duplicate-icon.jsx";
import DeleteIcon from "../assets/delete-icon.jsx";

const EditorWrapper = styled.div`
    background: #092635;
    color: #fff;
    padding: 5px 10px;
    border-radius: 10px;
    height: 55vh;
    overflow-y: scroll;
`;
const EditBlockWrapper = styled.div`
    margin-bottom: 10px;
`;
const Title = styled.p`
    font-size: 12px;
`;

export default function ShapeEditor({
    selectedShapeId,
    setSelectedShapeId,
    shapes,
    setShapes,
}) {
    const currentShapeIndex = shapes.findIndex(
        (shape) => shape.id === selectedShapeId
    );
    const currentShape = shapes[currentShapeIndex];

    const strokecolors = [
        "#ffffff",
        "#ff8383",
        "#3a994c",
        "#56a2e8",
        "#b76100",
    ];
    const bgcolors = [
        "transparent",
        "#ff8383",
        "#3a994c",
        "#56a2e8",
        "#b76100",
    ];

    const strokeWidths = [
        { id: 1, width: 2, icon: lineThinIcon },
        { id: 2, width: 5, icon: lineMediumIcon },
        { id: 3, width: 8, icon: lineHeavyIcon },
    ];

    const fillStyleList = [
        { id: 1, fillType: "mesh", icon: fillMeshIcon },
        { id: 2, fillType: "diagonal", icon: fillDiagonalIcon },
        { id: 3, fillType: "full", icon: null },
    ];

    const dashStyleList = [
        { id: 1, dash: 0, icon: lineThinIcon },
        { id: 2, dash: 20, icon: LineDashMid },
        { id: 3, dash: 40, icon: LineDashHigh },
    ];
    const edgeStyleList = [
        { id: 1, edge: 0, icon: EdgeSharp },
        { id: 2, edge: 60, icon: EdgeRounded },
    ];

    const handleShapeDuplicate = () => {
        const duplicatedShape = {
            ...shapes[currentShapeIndex],
            x: shapes[currentShapeIndex].x + 20,
            y: shapes[currentShapeIndex].y + 20,
            id: uuidv4(),
        };
        const newShapes = [
            ...shapes.slice(0, currentShapeIndex + 1),
            duplicatedShape,
            ...shapes.slice(currentShapeIndex + 1),
        ];
        setShapes(newShapes);
    };
    const handleShapeDelete = () => {
        const newShapes = shapes.filter(
            (shape) => shape.id !== selectedShapeId
        );
        setSelectedShapeId(null);
        setShapes(newShapes);
    };

    const handleShapeSendToBack = () => {
        if (currentShapeIndex === 0) return;

        const newShapes = [
            shapes[currentShapeIndex],
            ...shapes.slice(0, currentShapeIndex),
            ...shapes.slice(currentShapeIndex + 1),
        ];

        setShapes(newShapes);
    };
    const handleShapeBringToFront = () => {
        const newShapes = [
            ...shapes.slice(0, currentShapeIndex),
            ...shapes.slice(currentShapeIndex + 1),
            shapes[currentShapeIndex],
        ];

        setShapes(newShapes);
    };

    const handleShapeSendBackwards = () => {
        if (currentShapeIndex === 0) return;

        const newShapes = [
            ...shapes.slice(0, currentShapeIndex - 1),
            shapes[currentShapeIndex],
            shapes[currentShapeIndex - 1],
            ...shapes.slice(currentShapeIndex + 1),
        ];

        setShapes(newShapes);
    };

    const handleShapeBringForward = () => {
        if (currentShapeIndex === shapes.length - 1) return;

        const newShapes = [
            ...shapes.slice(0, currentShapeIndex),
            shapes[currentShapeIndex + 1],
            shapes[currentShapeIndex],
            ...shapes.slice(currentShapeIndex + 2),
        ];

        setShapes(newShapes);
    };

    const layerEditList = [
        { id: 1, icon: SendToBackIcon, onClick: handleShapeSendToBack },
        { id: 2, icon: SendBackwardsIcon, onClick: handleShapeSendBackwards },
        { id: 3, icon: BringToFrontIcon, onClick: handleShapeBringToFront },
        { id: 4, icon: BringForwardIcon, onClick: handleShapeBringForward },
    ];

    const shapeActionsList = [
        { id: 1, icon: DuplicateIcon, onClick: handleShapeDuplicate },
        { id: 2, icon: DeleteIcon, onClick: handleShapeDelete },
    ];

    const setStrokeWidth = (width) => {
        const newShapes = shapes.map((shape) =>
            shape.id === selectedShapeId
                ? { ...shape, strokeWidth: width }
                : shape
        );

        setShapes(newShapes);
    };

    const setStrokeColor = (color) => {
        const newShapes = shapes.map((shape) =>
            shape.id === selectedShapeId ? { ...shape, stroke: color } : shape
        );

        setShapes(newShapes);
    };
    const setFillStyle = (fillStyle) => {
        const newShapes = shapes.map((shape) =>
            shape.id === selectedShapeId ? { ...shape, fillStyle } : shape
        );

        setShapes(newShapes);
    };
    const setDash = (dash) => {
        const newShapes = shapes.map((shape) =>
            shape.id === selectedShapeId ? { ...shape, dash } : shape
        );

        setShapes(newShapes);
    };
    const setEdge = (edge) => {
        const newShapes = shapes.map((shape) =>
            shape.id === selectedShapeId ? { ...shape, edge } : shape
        );

        setShapes(newShapes);
    };
    const setOpacity = (opacity) => {
        const newShapes = shapes.map((shape) =>
            shape.id === selectedShapeId ? { ...shape, opacity } : shape
        );

        setShapes(newShapes);
    };

    const getFillStyle = (color, shape) => {
        if (color === "transparent") {
            return "none";
        }
        if (shape.fillStyle === "none") {
            return "full";
        }
        return shape.fillStyle;
    };

    const setBackgroundColor = (color) => {
        const newShapes = shapes.map((shape) =>
            shape.id === selectedShapeId
                ? {
                      ...shape,
                      fill: color,
                      fillStyle: getFillStyle(color, shape),
                  }
                : shape
        );

        setShapes(newShapes);
    };

    return (
        <EditorWrapper>
            <EditBlockWrapper>
                <Title>Stroke Color</Title>
                <ColorSelect
                    colorsArr={strokecolors}
                    setColor={setStrokeColor}
                />
            </EditBlockWrapper>
            <EditBlockWrapper>
                <Title>Background Color</Title>
                <ColorSelect
                    colorsArr={bgcolors}
                    setColor={setBackgroundColor}
                />
            </EditBlockWrapper>
            {currentShape?.fill === "transparent" ? null : (
                <EditBlockWrapper>
                    <Title>Fill Style</Title>
                    <FillSelect
                        currentFillStyle={currentShape.fillStyle}
                        setFillStyle={setFillStyle}
                        fillStyleList={fillStyleList}
                    />
                </EditBlockWrapper>
            )}
            <EditBlockWrapper>
                <Title>Stroke Width</Title>
                <StrokeWidthSelect
                    currentWidth={currentShape.strokeWidth}
                    setStrokeWidth={setStrokeWidth}
                    strokeWidths={strokeWidths}
                />
            </EditBlockWrapper>
            <EditBlockWrapper>
                <Title>Stroke Style</Title>
                <DashSelect
                    currentDashStyle={currentShape.dash}
                    setDashStyle={setDash}
                    dashStyleList={dashStyleList}
                />
            </EditBlockWrapper>
            <EditBlockWrapper>
                <Title>Edges</Title>
                <EdgeSelect
                    currentEdgeStyle={currentShape.edge}
                    setEdgeStyle={setEdge}
                    edgeStyleList={edgeStyleList}
                />
            </EditBlockWrapper>
            <EditBlockWrapper>
                <Title>Opacity</Title>
                <Slider
                    currentOpacity={currentShape.opacity}
                    setOpacity={setOpacity}
                />
            </EditBlockWrapper>
            <EditBlockWrapper>
                <Title>Layers</Title>
                <LayerEdit layerEditList={layerEditList} />
            </EditBlockWrapper>
            <EditBlockWrapper>
                <Title>Actions</Title>
                <ShapeActions shapeActionsList={shapeActionsList} />
            </EditBlockWrapper>
        </EditorWrapper>
    );
}
