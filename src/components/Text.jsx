import { useRef, useEffect } from "react";
import { Text, Transformer } from "react-konva";

export default function TextShape({
    shape,
    index,
    handleDragEnd,
    setSelectedShapeId,
    selectedShapeId,
    isSelected,
    handleShapeClick,
    shapes,
    setShapes,
}) {
    const textNodeRef = useRef(null);
    const trRef = useRef(null);

    useEffect(() => {
        if (isSelected) {
            trRef.current.nodes([textNodeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    const handleDblClick = () => {
        const textNode = textNodeRef.current;
        const tr = trRef.current;

        // textNode.hide();
        // tr.hide();

        const stage = textNode.getStage();
        const textPosition = textNode.absolutePosition();
        const areaPosition = {
            x: stage.container().offsetLeft + textPosition.x,
            y: stage.container().offsetTop + textPosition.y,
        };

        const textarea = document.createElement("textarea");
        document.body.appendChild(textarea);

        textarea.value = textNode.text();
        textarea.style.position = "absolute";
        textarea.style.top = areaPosition.y + "px";
        textarea.style.left = areaPosition.x + "px";
        textarea.style.width = textNode.width() - textNode.padding() * 2 + "px";
        textarea.style.height =
            textNode.height() - textNode.padding() * 2 + 5 + "px";
        textarea.style.fontSize = textNode.fontSize() + "px";
        textarea.style.border = "none";
        textarea.style.padding = "0px";
        textarea.style.color = "#fff";
        textarea.style.margin = "0px";
        textarea.style.overflow = "hidden";
        textarea.style.background = "none";
        textarea.style.outline = "none";
        textarea.style.resize = "none";
        textarea.style.lineHeight = textNode.lineHeight();
        textarea.style.fontFamily = textNode.fontFamily();
        textarea.style.textAlign = textNode.align();

        let rotation = textNode.rotation();
        let transform = "";
        if (rotation) {
            transform += "rotateZ(" + rotation + "deg)";
        }

        let px = 0;
        const isFirefox =
            navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
        if (isFirefox) {
            px += 2 + Math.round(textNode.fontSize() / 20);
        }
        transform += "translateY(-" + px + "px)";

        textarea.style.transform = transform;

        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + 3 + "px";

        textarea.focus();

        const removeTextarea = () => {
            textarea.parentNode.removeChild(textarea);
            window.removeEventListener("click", handleOutsideClick);
            textNode.show();
            tr.show();
            tr.getLayer().batchDraw();
        };

        const setTextareaWidth = (newWidth) => {
            if (!newWidth) {
                newWidth = textNode.placeholder.length * textNode.fontSize();
            }
            textarea.style.width = newWidth + "px";
        };

        textarea.addEventListener("keydown", (e) => {
            // enter key
            if (e.keyCode === 13 && !e.shiftKey) {
                textNode.text(textarea.value);
                removeTextarea();
                // prevent the default behaviour of adding a new line
                e.preventDefault();
            }
            // escape key
            if (e.keyCode === 27) {
                removeTextarea();
            }
        });

        textarea.addEventListener("keydown", (e) => {
            const scale = textNode.getAbsoluteScale().x;
            setTextareaWidth(textNode.width() * scale);
            textarea.style.height = "auto";
            textarea.style.height =
                textarea.scrollHeight + textNode.fontSize() + "px";
        });

        const handleOutsideClick = (e) => {
            if (e.target !== textarea) {
                textNode.text(textarea.value);
                removeTextarea();
            }
        };
        setTimeout(() => {
            window.addEventListener("click", handleOutsideClick);
        });
    };

    return (
        <>
            <Text
                ref={textNodeRef}
                text={shape.text}
                fill="#fff"
                x={shape.x}
                y={shape.y}
                fontSize={21}
                width={500}
                draggable={selectedShapeId === shape.id}
                onDragEnd={(e) => handleDragEnd(e, shape.id)}
                onClick={() => {
                    handleShapeClick(shape.id);
                    handleDblClick();
                }}
            />
            {isSelected && <Transformer ref={trRef} />}
        </>
    );
}
