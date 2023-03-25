import React from 'react';

const Navbar = ({marca}) => {
    return (
        <nav className='navbar navbar-dark bg-success'>
            <div className='container'>
                <a href='#!' className='navbar-brand'>
                    {marca}
                </a>
            </div>
        </nav>
    )
}

export default Navbar;