// import { useState } from "react";
import styled from "styled-components";

import ColorSelect from "./ColorSelect";

const EditorWrapper = styled.div`
    background: #092635;
    color: #fff;
    padding: 5px 10px;
    border-radius: 10px;
    width: 170px;
`;
const EditBlockWrapper = styled.div`
    margin-bottom: 10px;
`;
const Title = styled.p`
    font-size: 12px;
`;

export default function ShapeEditor({ selectedShapeId, shapes, setShapes }) {
    // const currentShape = shapes.find((shape) => shape.id === selectedShapeId);

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
                <ColorSelect
                    colorsArr={bgcolors}
                    setColor={setBackgroundColor}
                />
            </EditBlockWrapper>
            <EditBlockWrapper>
                <Title>Stroke Style</Title>
                <ColorSelect
                    colorsArr={bgcolors}
                    setColor={setBackgroundColor}
                />
            </EditBlockWrapper>
        </EditorWrapper>
    );
}
