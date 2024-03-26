import styled from "styled-components";

const ToolActionsWrapper = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
`;
const ToolActionBlockWrapper = styled.div`
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

export default function ShapeActions({ shapeActionsList }) {
    return (
        <ToolActionsWrapper>
            {shapeActionsList.map((toolActionOption) => {
                const ToolActionImg = toolActionOption.icon;
                return (
                    <ToolActionBlockWrapper
                        onClick={toolActionOption.onClick}
                        key={toolActionOption.id}
                    >
                        <ToolActionImg
                            style={{ width: "18px", height: "18px" }}
                        />
                    </ToolActionBlockWrapper>
                );
            })}
        </ToolActionsWrapper>
    );
}
