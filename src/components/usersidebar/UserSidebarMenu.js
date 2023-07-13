import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { FaAngleDown } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

function UserSidebarMenu({ route, isOpen }) {
    const [isMenuOpen, setIsMenuOpen ] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    return (
        <>


            <div className='menu' onClick={toggleMenu}>
                <div className="menu_item">
                    <div className='icon'>{route.icon}</div>
                    {isOpen && <motion.div className='link_text'>{route.name}</motion.div>}
                </div>
                { isOpen &&(
                    <motion.div animate={isMenuOpen?{rotate:-180}:{rotate:0}}>
                        <FaAngleDown />
                    </motion.div>
                )}

            </div>
            {
                isMenuOpen && (
                    <div className='menu_container'>
                {route.subRoutes.map((subRoutes, i) => {
                    return (
                        <NavLink to={subRoutes.path} key={subRoutes.name} className='user_sidebar_link'>
                            <div className='icon'>{subRoutes.icon}</div>
                            {isOpen && <motion.div className='link_text'>{subRoutes.name}</motion.div>}
                        </NavLink>
                    )
                })}
            </div>
                )
            }
        </>
    )
}

export default UserSidebarMenu