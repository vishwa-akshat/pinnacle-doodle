import { useState } from "react";
import styled from "styled-components";

const StyledSlider = styled.div``;
const RangeInputStyles = styled.input`
    width: 100%; /* Adjust width as needed */
`;

export default function Slider({
    min = 20,
    max = 100,
    currentOpacity,
    setOpacity,
}) {
    const [opacityVal, setOpacityVal] = useState(currentOpacity * 100);
    const handleChange = (event) => {
        const newValue = parseFloat(event.target.value);
        if (newValue >= min && newValue <= max) {
            setOpacityVal(newValue);
            setOpacity(newValue / 100);
        }
    };

    return (
        <StyledSlider>
            <RangeInputStyles
                type="range"
                min={min}
                max={max}
                value={opacityVal}
                onChange={handleChange}
            />
        </StyledSlider>
    );
}
