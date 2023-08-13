'use client';

import './sidebar.css'
import React, {useState} from "react";

interface SubmenuItem {
    title: string;
    link: string;
}

interface MenuItem {
    title: string;
    subitems: SubmenuItem[];
}

interface SidebarProps {
    menuItems: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({menuItems}) => {
    const [expandedItems, setExpandedItems] = useState<number[]>([]);

    const toggleSubmenu = (index: number) => {
        if (expandedItems.includes(index)) {
            setExpandedItems(expandedItems.filter(item => item !== index));
        } else {
            setExpandedItems([...expandedItems, index]);
        }
    };

    return (
        <div className="sidebar">
            <ul className="styles.menu">
                {menuItems.map((menuItem, index) => (
                    <li className="styles.menuItem" key={index}>
                        <a href="#" onClick={() => toggleSubmenu(index)}>
                            {menuItem.title}
                        </a>
                        <ul className={`submenu ${expandedItems.includes(index) ? 'expanded' : ''}`}>
                            {menuItem.subitems.map((subitem, subindex) => (
                                <li className="submenu-item" key={subindex}>
                                    <a href={subitem.link}>{subitem.title}</a>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))
                }
            </ul>
        </div>
    )
}

export default Sidebar;