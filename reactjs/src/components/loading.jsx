/* eslint-disable */
import React, { useEffect, useState } from "react";

/**
 *  Css
 */
import "../assets/css/loading.scss";

const Loading = ({ IsLoading, Error, Type }) => {
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
    if (Error) {
        return (
            <React.Fragment>
                {Error && (<span className="text-red-500 text-center mt-4">{Error}</span>)}
            </React.Fragment>
        )
    }
    return null;
}
export default Loading