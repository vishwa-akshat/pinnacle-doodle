import React from "react";
import styled from "styled-components";

const ColorSelectWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ColorBlock = styled.div`
    width: 25px;
    height: 25px;
    cursor: pointer;
    border-radius: 5px;
`;

export default function ColorSelect({ setColor, colorsArr }) {
    return (
        <ColorSelectWrapper>
            {colorsArr.map((color, idx) => (
                <ColorBlock
                    key={idx}
                    style={{ background: color }}
                    onClick={() => setColor(color)}
                />
            ))}
        </ColorSelectWrapper>
    );
}
