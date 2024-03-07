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
    justify-content: center;
    align-items: center;
`;

const Button = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    cursor: pointer;
    transition: all 0.2s ease;
    border-radius: 8px;
    background-color: ${({ isActive }) => (isActive ? "#5C8374" : "")};

    &:hover {
        background-color: ${({ isActive }) => (isActive ? "" : "#9ec8b947")};
    }
`;

const ButtonImage = styled.img`
    width: 20px;
    height: 20px;
`;

export default function UndoRedoButtons({
    history,
    historyIndex,
    setShapes,
    setHistoryIndex,
    setSelectedShapeIndex,
}) {
    const handleUndo = () => {
        if (historyIndex > 0) {
            setHistoryIndex((prevIndex) => prevIndex - 1);
            setShapes(history[historyIndex - 1]);
            setSelectedShapeIndex(null);
        }
    };

    const handleRedo = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex((prevIndex) => prevIndex + 1);
            setShapes(history[historyIndex + 1]);
            setSelectedShapeIndex(null);
        }
    };

    return (
        <ButtonsWrapper>
            <Button onClick={handleUndo} disabled={historyIndex <= 0}>
                <ButtonImage src={UndoImage} alt="undo" />
            </Button>
            <Button
                onClick={handleRedo}
                disabled={historyIndex >= history.length - 1}
            >
                <ButtonImage src={RedoImage} alt="rndo" />
            </Button>
        </ButtonsWrapper>
    );
}
