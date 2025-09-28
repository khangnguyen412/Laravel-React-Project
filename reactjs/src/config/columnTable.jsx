/* eslint-disable */
import { Link } from "react-router-dom";

/**
 * Ant Design
 */
import { Tag, Space } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const color = (role) => {
    if (role.id === 1) { return 'volcano'; }
    else if (role.id === 2) { return 'blue'; }
    else if (role.id === 3) { return 'green'; }
}

export const columns = (showModal) =>  [
    {
        title: 'Display Name',
        dataIndex: 'display_name',
        key: 'display_name',
        render: (text, record) => <Link onClick={() => showModal(record.key)}>{text}</Link>,
    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        render: (text, record) => <Link onClick={() => showModal(record.key)}>{text}</Link>,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        render: text => <span>{text}</span>,
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        render: (role) => <Tag color={color(role)} key={role.id}> {role.name} </Tag>,
    },
    {
        title: 'Action',
        key: 'action',
        responsive: ['md'],
        render: (_, record) => (
            <Space size="middle">
                <Link to={``}><EditOutlined key="edit" /></Link> {/* /admin/user/${record.key}/edit */}
                <Link to={``}><DeleteOutlined key="delete" /></Link> {/* /admin/user/${record.key}/delete */}
            </Space>
        ),
    },
];