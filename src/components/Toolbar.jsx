import styled from "styled-components";

import useCanvasStore from "../store/canvasStore";

import SquareIcon from "../assets/square.svg";
import CircleIcon from "../assets/circle.svg";
import ArrowIcon from "../assets/arrow.svg";
import DrawIcon from "../assets/draw.svg";
import EraserIcon from "../assets/eraser.svg";
import ImageIcon from "../assets/image.svg";
import LineIcon from "../assets/line.svg";
import TextIcon from "../assets/text.svg";
import HandIcon from "../assets/hand.svg";
import SelectorIcon from "../assets/selector.svg";

const ToolbarWrapper = styled.div`
    display: flex;
    background: #092635;
    border-radius: 12px;
    padding: 5px 10px;
    gap: 10px;
`;

const Tool = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    cursor: pointer;
    transition: all 0.2s ease;
    border-radius: 8px;
    background-color: ${({ isActive }) => (isActive ? "#5C8374" : "")};

    &:hover {
        background-color: ${({ isActive }) => (isActive ? "" : "#9ec8b947")};
    }
`;

const ToolImage = styled.img`
    width: 25px;
    height: 25px;
`;

const toolsCollection = [
    {
        id: 1,
        name: "Move",
        icon: HandIcon,
    },
    {
        id: 2,
        name: "Selector",
        icon: SelectorIcon,
    },
    {
        id: 3,
        name: "Rectangle",
        icon: SquareIcon,
    },
    {
        id: 4,
        name: "Circle",
        icon: CircleIcon,
    },
    {
        id: 5,
        name: "Arrow",
        icon: ArrowIcon,
    },
    {
        id: 6,
        name: "Line",
        icon: LineIcon,
    },
    {
        id: 7,
        name: "Draw",
        icon: DrawIcon,
    },
    {
        id: 8,
        name: "Text",
        icon: TextIcon,
    },
    {
        id: 9,
        name: "Image",
        icon: ImageIcon,
    },
    {
        id: 10,
        name: "Eraser",
        icon: EraserIcon,
    },
];

export default function Toolbar() {
    const { activeShape, setActiveShape } = useCanvasStore();

    return (
        <ToolbarWrapper>
            {toolsCollection.map((tool) => (
                <Tool
                    key={tool.id}
                    isActive={tool.name === activeShape}
                    onClick={() => setActiveShape(tool.name)}
                >
                    <ToolImage src={tool.icon} alt={tool.name} />
                </Tool>
            ))}
        </ToolbarWrapper>
    );
}
