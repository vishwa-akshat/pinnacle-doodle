import styled from "styled-components";

const DashSelectWrapper = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
`;
const DashBlockWrapper = styled.div`
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

const DashBlock = styled.div`
    width: 15px;
    height: 15px;
    background: #fff;
`;

const DashImg = styled.img`
    width: 22px;
    height: 22px;
`;

export default function DashSelect({
    dashStyleList,
    setDashStyle,
    currentDashStyle,
}) {
    return (
        <DashSelectWrapper>
            {dashStyleList.map((dashStyle) => (
                <DashBlockWrapper
                    onClick={() => setDashStyle(dashStyle.dash)}
                    key={dashStyle.id}
                    isSelected={currentDashStyle === dashStyle.dash}
                >
                    {dashStyle.icon ? (
                        <DashImg src={dashStyle.icon} alt={dashStyle.dash} />
                    ) : (
                        <DashBlock />
                    )}
                </DashBlockWrapper>
            ))}
        </DashSelectWrapper>
    );
}
