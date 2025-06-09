import { useEffect } from 'react';

const Scrollable = () => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);
}

export default Scrollable