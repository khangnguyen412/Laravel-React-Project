/* eslint-disable */
import React, { useEffect, useState } from "react";

/**
 * Style
 */
import "../assets/css/loading.scss";

export const Loading = ({ IsLoading, FlexLoading  }) => {
    if (IsLoading) {
        return (
            <React.Fragment>
                {IsLoading && (
                    <div className={FlexLoading ? "flex-loading flex-col flex-col-fixed" : "flex-loading flex-col"}>
                        <div className="wrap-loader--background">
                            <div className="loader">
                                <div className="inner one"></div>
                                <div className="inner two"></div>
                                <div className="inner three"></div>
                            </div>
                        </div>
                    </div>
                )}
            </React.Fragment>
        )
    }
    return null;
}