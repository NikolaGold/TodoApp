import React from "react";

export const displayLoading = (isLoading) => {
    return (isLoading ?
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-secondary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            :
            <div className="d-flex justify-content-center">0 tasks</div>
    )
};
