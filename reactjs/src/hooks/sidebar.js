import { useEffect } from 'react';
import $ from 'jquery';

const side_bar = () => {
    useEffect(() => {
        const menuButton2 = $('.mobile-menu-button')
        const backdrop = $('.backdrop')
        const sidebar = $('.sidebar')
    
        $(document).on('click', '.mobile-menu-button', () => {
            sidebar.hasClass('-translate-x-full') ? sidebar.removeClass('-translate-x-full') : sidebar.addClass('-translate-x-full')
        })
        $(document).on('click', '.backdrop', () => {
            backdrop.hasClass('hidden') ? backdrop.removeClass('hidden') : backdrop.addClass('hidden')
        })
    
        $(window).on('resize', function () {
            if (window.innerWidth >= 768) {
                sidebar.removeClass('-translate-x-full')
                backdrop.classList.add('hidden')
            }
        });
    })
}

export default side_bar