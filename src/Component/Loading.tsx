import React from "react";
import LoadingGif from "../Assets/loading.gif"

const Loading = () => {
    return (
        <div className="Loading">
            <header className="Loading-header">
                <div className="loading-content" style={
                    {
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "white"
                    }
                }>
                <img src={LoadingGif} className="Loading-logo" alt="logo" />
                    <div className="text-header" style={{
                        fontSize: "1.5rem",
                        color: "darkblue",
                    }}>
                    <h1>Loading</h1>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Loading;