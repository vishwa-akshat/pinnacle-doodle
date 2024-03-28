import React from "react";

export default function BringToFront({ style }) {
    return (
        <svg
            aria-hidden="true"
            focusable="false"
            role="img"
            viewBox="0 0 20 20"
            class=""
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={style}
        >
            <g clip-path="url(#a)" stroke="#fff" stroke-width="1.25">
                <path
                    d="M8.775 6.458h2.45a2.316 2.316 0 0 1 2.317 2.316v2.452a2.316 2.316 0 0 1-2.316 2.316H8.774a2.316 2.316 0 0 1-2.317-2.316V8.774a2.316 2.316 0 0 1 2.317-2.316Z"
                    fill="#fff"
                ></path>
                <path d="M5.441 9.792h2.451a2.316 2.316 0 0 1 2.316 2.316v2.45a2.316 2.316 0 0 1-2.316 2.317h-2.45a2.316 2.316 0 0 1-2.317-2.316v-2.451a2.316 2.316 0 0 1 2.316-2.316ZM12.108 3.125h2.45a2.316 2.316 0 0 1 2.317 2.316v2.451a2.316 2.316 0 0 1-2.316 2.316h-2.451a2.316 2.316 0 0 1-2.316-2.316v-2.45a2.316 2.316 0 0 1 2.316-2.317Z"></path>
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="#fff" d="M0 0h20v20H0z"></path>
                </clipPath>
            </defs>
        </svg>
    );
}
