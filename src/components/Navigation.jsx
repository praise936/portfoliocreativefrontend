// src/components/Navigation.jsx
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Sparkles, Code2, User, Mail } from 'lucide-react';
import '../styles/Navigation.css';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { path: '/', label: 'Home', icon: <Sparkles size={20} /> },
        { path: '/projects', label: 'Projects', icon: <Code2 size={20} /> },
        { path: '/about', label: 'About', icon: <User size={20} /> },
        { path: '/contact', label: 'Contact', icon: <Mail size={20} /> },
    ];

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-logo">
                    <div className="logo-icon pulse-glow">
                        <div className="logo-dot dot-1"></div>
                        <div className="logo-dot dot-2"></div>
                        <div className="logo-dot dot-3"></div>
                    </div>
                    <span className="logo-text">PORTFOLIO<span className="logo-accent">?</span></span>
                </div>

                <div className="nav-links">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `nav-item ${isActive ? 'active' : ''}`
                            }
                        >
                            {item.icon}
                            <span>{item.label}</span>
                            <div className="nav-item-glow"></div>
                        </NavLink>
                    ))}
                </div>

                <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `mobile-nav-item ${isActive ? 'active' : ''}`
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navigation;