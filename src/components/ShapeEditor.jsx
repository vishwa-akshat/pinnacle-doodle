// import { useState } from "react";
import styled from "styled-components";

import ColorSelect from "./ColorSelect";
import StrokeWidthSelect from "./StrokeWidthSelect";

import lineThinIcon from "../assets/stroke-thin.svg";
import lineMediumIcon from "../assets/stroke-medium.svg";
import lineHeavyIcon from "../assets/stroke-heavy.svg";

const EditorWrapper = styled.div`
    background: #092635;
    color: #fff;
    padding: 5px 10px;
    border-radius: 10px;
    width: 170px;
    height: 50vh;
    overflow-y: scroll;
`;
const EditBlockWrapper = styled.div`
    margin-bottom: 10px;
`;
const Title = styled.p`
    font-size: 12px;
`;

export default function ShapeEditor({ selectedShapeId, shapes, setShapes }) {
    const currentShape = shapes.find((shape) => shape.id === selectedShapeId);

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
    const setBackgroundColor = (color) => {
        const newShapes = shapes.map((shape) =>
            shape.id === selectedShapeId ? { ...shape, fill: color } : shape
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
            <EditBlockWrapper>
                <Title>Fill Style</Title>
                <ColorSelect
                    colorsArr={bgcolors}
                    setColor={setBackgroundColor}
                />
            </EditBlockWrapper>

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
                <ColorSelect
                    colorsArr={bgcolors}
                    setColor={setBackgroundColor}
                />
            </EditBlockWrapper>
            <EditBlockWrapper>
                <Title>Edges</Title>
                <ColorSelect
                    colorsArr={bgcolors}
                    setColor={setBackgroundColor}
                />
            </EditBlockWrapper>
            <EditBlockWrapper>
                <Title>Opacity</Title>
                <ColorSelect
                    colorsArr={bgcolors}
                    setColor={setBackgroundColor}
                />
            </EditBlockWrapper>
            <EditBlockWrapper>
                <Title>Layers</Title>
                <ColorSelect
                    colorsArr={bgcolors}
                    setColor={setBackgroundColor}
                />
            </EditBlockWrapper>
            <EditBlockWrapper>
                <Title>Actions</Title>
                <ColorSelect
                    colorsArr={bgcolors}
                    setColor={setBackgroundColor}
                />
            </EditBlockWrapper>
        </EditorWrapper>
    );
}
