import React, { useEffect } from 'react';
import WaycoolSidebarLogo from '../assets/img/sidebar/WaycoolSidebarLogo.png'
import user from '../assets/img/users/100_3.jpg'
import MenuItem from './MenuItem';
import {adminMenuItem,userMenuItem} from './sidebarMenuItem';

const _user = localStorage.getItem("User");
const userDetails = JSON.parse(_user);
const type = userDetails?.userType;


const sidebarItems = type === "Admin" ? adminMenuItem : userMenuItem;



//const sidebarItems = 
const Sidebar = (props)=>{
    const [inactive, setInactive] = React.useState(false);
    useEffect(()=>{
        if(inactive){
            document.querySelectorAll('.sub-menu').forEach((el)=>{
                el.classList.remove('active');
            })
        }
        props.onCollapse(inactive);
    },[inactive])
    return(
        <div className={`sidebar ${inactive?'inactive':''}`}>
           {/* Top section of sidebar  */}
            <div className="top-section  d-flex align-items-center" style={{height:"64px"}}>
                {/* company logo */}
                <div className="logo ">
                    <img src={WaycoolSidebarLogo} alt="waycool"/>
                    {/* <span className="text-white">Waycool</span> */}
                </div>
                <span className="text-white company-name ">Waycool</span> 
                {/* Toggle button for sidebar expand and collapse */}
                <div onClick={()=>setInactive(!inactive)} className="toggle-btn">
                {
                    inactive? (
                        <i class="bi bi-arrow-right-square-fill text-success "></i>
                    ):(
                        <i class="bi bi-arrow-left-square-fill text-white "></i>
                    )
                }
                </div>
            </div>
            
            {/* Divider */}
            <div className="divider mb-3"></div>
            {/* Main Menu having sidebar liks */}
            <div className="main-menu  " >
                <ul className="p-0  ">
                    {
                        sidebarItems && sidebarItems.map((menuItem, index)=>(
                            <MenuItem
                            key="index"
                            name={menuItem.name}
                            exact = {menuItem.exact}
                            to={menuItem.to}
                            subMenus = {menuItem.subMenus || []}
                            // nestedsubmenus={menuItem.subMenus.nestedSubMenus ||[]}
                            iconClassName = {menuItem.iconClassName}
                            onClick={()=>{
                                if(inactive){
                                    setInactive(false);
                                }
                            }}
                            />
                        ))
                    }
                    {/* <li >
                        <a className="menu-item ">
                            <div className="menu-item-icon">
                            <i class="bi bi-speedometer2"></i>
                            </div>
                            <span>Dashbaord</span>
                        </a>
                    </li>
                    <MenuItem
                    name={"Content"}
                    subMenu = {subMenuItem}
                    />
                    <li >
                        <a className="menu-item ">
                            <div className="menu-item-icon">
                            <i class="bi bi-speedometer2"></i>
                            </div>
                            <span>Design</span>
                        </a>
                    </li> */}
                </ul>
                
            </div>

        </div>
    )
}

export default Sidebar;
