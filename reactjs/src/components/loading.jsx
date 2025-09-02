/* eslint-disable */
import React, { useEffect, useState } from "react";

/**
 *  Css
 */
import "../assets/css/loading.scss";

export const Loading = ({ IsLoading }) => {
    if (IsLoading) {
        return (
            <React.Fragment>
                {IsLoading && (
                    <div className="flex flex-col">
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