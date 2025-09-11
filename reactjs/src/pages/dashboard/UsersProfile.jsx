/* eslint-disable */
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/**
 *  Component
 */
import HeadersLayout from "../../components/dashboard/Header.jsx";

const UserPage = () => {
    const [preview, setPreview] = useState(null);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const user = {
        name: 'Nguyen Duc',
        email: 'nguyenduc@example.com',
        role: 'Quản trị viên',
        createdAt: '05/04/2025',
        avatar: 'https://i.pravatar.cc/200?img=1'
    };
    return (
        <React.Fragment>
            <HeadersLayout></HeadersLayout>
        </React.Fragment>
    )
}

export default UserPage;