/* eslint-disable */
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Loading = ({ IsLoading, Error, Type }) => {
    if (IsLoading) {
        return (
            <React.Fragment>
                {IsLoading && (
                    <div className="flex flex-col">
                        <FontAwesomeIcon icon={faSpinner} className="loading-icon" />
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