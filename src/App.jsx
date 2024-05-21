import styled from "styled-components";

import Canvas from "./components/Canvas";
import Toolbar from "./components/Toolbar";

const Container = styled.main`
    position: relative;
`;

const ToolbarContainer = styled.div`
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function Home() {
    return (
        <Container>
            <ToolbarContainer>
                <Toolbar />
            </ToolbarContainer>
            <Canvas />
        </Container>
    );
}
