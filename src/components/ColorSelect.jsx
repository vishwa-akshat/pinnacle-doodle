import React from "react";
import styled from "styled-components";

import transparentImg from "../assets/transparent.png";

const ColorSelectWrapper = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
`;

const ColorBlock = styled.div`
    width: 25px;
    height: 25px;
    cursor: pointer;
    border-radius: 5px;
`;

const TransparentImg = styled.img`
    width: 25px;
    height: 25px;
    cursor: pointer;
    border-radius: 5px;
    background-color: #5c83744c;
`;

export default function ColorSelect({ setColor, colorsArr }) {
    return (
        <ColorSelectWrapper>
            {colorsArr.map((color, idx) =>
                color === "transparent" ? (
                    <TransparentImg
                        onClick={() => setColor(color)}
                        src={transparentImg}
                        alt="transparent"
                    />
                ) : (
                    <ColorBlock
                        key={idx}
                        style={{ background: color }}
                        onClick={() => setColor(color)}
                    />
                )
            )}
        </ColorSelectWrapper>
    );
}
