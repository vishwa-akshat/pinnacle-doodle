import React from "react";
import styled from "styled-components";

import UndoImage from "../assets/undo.svg";
import RedoImage from "../assets/redo.svg";

const ButtonsWrapper = styled.div`
    display: flex;
    background: #092635;
    border-radius: 12px;
    padding: 5px 10px;
    gap: 5px;
`;

const Button = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
    cursor: pointer;
    transition: all 0.2s ease;
    border-radius: 8px;
    background-color: ${({ isActive }) => (isActive ? "#5C8374" : "")};

    &:hover {
        background-color: ${({ isActive }) => (isActive ? "" : "#9ec8b947")};
    }
`;

const ScaleText = styled.p`
    color: #fff;
`;

export default function ZoomInZoomOutButtons({ setScale, scale }) {
    const handleZoomIn = () => {
        setScale(scale + 0.1);
    };

    const handleZoomOut = () => {
        setScale(Math.max(scale - 0.1, 0.1));
    };

    const currentScaleLevel = Math.round(scale.toFixed(2) * 100);

    return (
        <ButtonsWrapper>
            <Button onClick={handleZoomOut}>-</Button>
            <ScaleText>{currentScaleLevel}%</ScaleText>
            <Button onClick={handleZoomIn}>+</Button>
        </ButtonsWrapper>
    );
}
