import styled from "styled-components";

const FillSelectWrapper = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
`;
const FillBlockWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    box-sizing: border-box;
    cursor: pointer;
    border-radius: 5px;
    background: ${(props) => (props.isSelected ? "#5C8374" : "#5c83744c")};
`;

const FillBlock = styled.div`
    width: 15px;
    height: 15px;
    background: #fff;
`;

const FillImg = styled.img`
    width: 22px;
    height: 22px;
`;

export default function FillSelect({
    fillStyleList,
    setFillStyle,
    currentFillStyle,
}) {
    return (
        <FillSelectWrapper>
            {fillStyleList.map((fillStyle, idx) => (
                <FillBlockWrapper
                    onClick={() => setFillStyle(fillStyle.fillType)}
                    key={`fill-${idx}`}
                    fillStyle={fillStyle}
                    isSelected={currentFillStyle === fillStyle.fillType}
                >
                    {fillStyle.icon ? (
                        <FillImg
                            src={fillStyle.icon}
                            alt={fillStyle.fillType}
                        />
                    ) : (
                        <FillBlock />
                    )}
                </FillBlockWrapper>
            ))}
        </FillSelectWrapper>
    );
}
