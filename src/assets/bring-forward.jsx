import React from "react";

export default function BringForwardIcon({ style }) {
    return (
        <svg
            aria-hidden="true"
            focusable="false"
            role="img"
            viewBox="0 0 20 20"
            class=""
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            style={style}
        >
            <g
                clip-path="url(#a)"
                stroke="#fff"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path
                    d="M13.889 4.167H8.333c-.767 0-1.389.622-1.389 1.389v5.555c0 .767.622 1.389 1.39 1.389h5.555c.767 0 1.389-.622 1.389-1.389V5.556c0-.767-.622-1.39-1.39-1.39Z"
                    fill="#fff"
                ></path>
                <path d="M12.5 12.5v1.389a1.389 1.389 0 0 1-1.389 1.389H5.556a1.389 1.389 0 0 1-1.39-1.39V8.334a1.389 1.389 0 0 1 1.39-1.389h1.388"></path>
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="#fff" d="M0 0h20v20H0z"></path>
                </clipPath>
            </defs>
        </svg>
    );
}
