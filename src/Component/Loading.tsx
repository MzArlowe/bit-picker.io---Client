import React from "react";
import LoadingGif from "../Assets/loading.gif"
// const Loading = () => {
//     return (React.createElement("div", { className: "Loading" },
//         React.createElement("header", { className: "Loading-header" },
//             React.createElement("img", { src: "../../Assets/loading.gif", className: "Loading-logo", alt: "logo" }),
//             React.createElement("div", { className: "loading" },
//                 React.createElement("h1", null, "Loading")))));
// };

const Loading = () => {
    return (
        <div className="Loading">
            <header className="Loading-header">
                <div className="loading-content" style={
                    {
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }
                }>
                <img src={LoadingGif} className="Loading-logo" alt="logo" />
                    <h1>Loading</h1>
                </div>
            </header>
        </div>
    )
}

export default Loading;