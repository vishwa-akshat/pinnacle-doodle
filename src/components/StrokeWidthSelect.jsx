import React from "react";
import styled from "styled-components";

const StrokeWidthSelectWrapper = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`;

const StrokeWidthBlock = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
    border-radius: 5px;
    background: ${(props) => (props.isSelected ? "#5C8374" : "#5c83744c")};
`;

const StrokeIcon = styled.img`
    margin-bottom: 15px;
`;

export default function StrokeWidthSelect({
    currentWidth,
    strokeWidths,
    setStrokeWidth,
}) {
    return (
        <StrokeWidthSelectWrapper>
            {strokeWidths.map(({ id, icon, width }) => (
                <StrokeWidthBlock
                    onClick={() => setStrokeWidth(width)}
                    isSelected={currentWidth === width}
                    key={id}
                >
                    <StrokeIcon src={icon} alt={`Stroke Width ${id}`} />
                </StrokeWidthBlock>
            ))}
        </StrokeWidthSelectWrapper>
    );
}
