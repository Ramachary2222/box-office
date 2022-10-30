/* eslint-disable no-restricted-globals */
import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { LinkStyled, NavList } from './Navs.styled';

const LINKS = [

    { to: "/", text: "Home" },
    { to: "/starred", text: "starred" }

];
function Nav() {
    const location = useLocation()
    return (
        <div>
            <NavList>
                {LINKS.map(item => (
                    <li key={item.to}>
                        <LinkStyled to={item.to} className={item.to === location.pathname ? 'active' : ''}>
                            {item.text}
                        </LinkStyled>
                    </li>
                ))}
            </NavList>





        </div>
    )
}

export default Nav