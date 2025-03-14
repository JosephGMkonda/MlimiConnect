import React from 'react';
import { Link } from 'react-router-dom'; 
import { sideBarLinks } from '../../assets/index'; 

function Menu() {
    return (
        <div className="flex flex-col gap-2">
            {sideBarLinks.map((link, index) => (
                <Link
                    to={link.path} 
                    key={index} 
                    className="flex items-center text-white gap-2 p-2 rounded text-bold" 
                >
                    {link.icon}
                    <span>{link.label}</span> 
                </Link>
            ))}
        </div>
    );
}

export default Menu;