import styled from "styled-components";

const LayerSelectWrapper = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
`;
const LayerBlockWrapper = styled.div`
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

export default function LayerEdit({ layerEditList }) {
    return (
        <LayerSelectWrapper>
            {layerEditList.map((layerOption) => {
                const LayerImg = layerOption.icon;
                return (
                    <LayerBlockWrapper
                        onClick={layerOption.onClick}
                        key={layerOption.id}
                    >
                        <LayerImg style={{ width: "22px", height: "22px" }} />
                    </LayerBlockWrapper>
                );
            })}
        </LayerSelectWrapper>
    );
}
