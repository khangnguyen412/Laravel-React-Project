import { useEffect } from 'react';

const SideBar = () => {
    useEffect(() => {
        // Lấy các phần tử bằng document.querySelector hoặc querySelectorAll
        const MenuButton = document.querySelector('.mobile-menu-button');
        const DropDown = document.querySelector('.backdrop');
        const SideBar = document.querySelector('.sidebar');

        // Xử lý click vào .mobile-menu-button
        const HandleMenuClick = () => {
            SideBar.classList.toggle('-translate-x-full');
        };
        if (MenuButton) {
            MenuButton.addEventListener('click', HandleMenuClick);
        }

        // Xử lý click vào .backdrop
        const HandleMenuDropDownClick = (e) => {
            if (e.target.classList.contains('backdrop')) {
                DropDown.classList.toggle('hidden');
            }
        };
        if (DropDown) {
            DropDown.addEventListener('click', HandleMenuDropDownClick);
        }

        // Xử lý resize window
        const HandleWindowResize = () => {
            if (window.innerWidth >= 768) {
                SideBar.classList.remove('-translate-x-full');
            }
        }
        window.addEventListener('resize', HandleWindowResize);

        return () => {
            if (MenuButton) {
                MenuButton.removeEventListener('click', HandleMenuClick);
            }
            if (DropDown) {
                DropDown.removeEventListener('click', HandleMenuDropDownClick);
            }
            window.removeEventListener('resize', HandleWindowResize) 
        };
    }, []);
}

export default SideBar