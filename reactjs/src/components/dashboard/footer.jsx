/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";

/**
 * Ant Design
 */
import { Layout} from 'antd';

const { Content, Footer } = Layout;

const UserList = () => {
    return (
        <React.Fragment>
            <Footer style={{ textAlign: 'center' }}>
                Created by Khang.MNQ ©{new Date().getFullYear()}
            </Footer>
        </React.Fragment>
    )
}
export default UserList