import styled from "styled-components";

const EdgeSelectWrapper = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
`;
const EdgeBlockWrapper = styled.div`
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

const EdgeBlock = styled.div`
    width: 15px;
    height: 15px;
    background: #fff;
`;

const EdgeImg = styled.img`
    width: 22px;
    height: 22px;
`;

export default function EdgeSelect({
    edgeStyleList,
    setEdgeStyle,
    currentEdgeStyle,
}) {
    return (
        <EdgeSelectWrapper>
            {edgeStyleList.map((edgeStyle) => (
                <EdgeBlockWrapper
                    onClick={() => setEdgeStyle(edgeStyle.edge)}
                    key={edgeStyle}
                    edgeStyle={edgeStyle}
                    isSelected={currentEdgeStyle === edgeStyle.edge}
                >
                    {edgeStyle.icon ? (
                        <EdgeImg
                            src={edgeStyle.icon}
                            alt={edgeStyle.edgeType}
                        />
                    ) : (
                        <EdgeBlock />
                    )}
                </EdgeBlockWrapper>
            ))}
        </EdgeSelectWrapper>
    );
}
