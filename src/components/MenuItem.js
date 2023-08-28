import React from 'react';
import { NavLink } from 'react-router-dom';
import NestedMenuItem from './NestedMenuItem';

const MenuItem = (props) => {
    const { name, subMenus, iconClassName, onClick, to, exact } = props;
    const [expand, setExpand] = React.useState(false);
    const [inactive, setInactive] = React.useState(false);


    return (
      <li onClick={onClick} className="mt-2">
        <NavLink
          exact
          to={to}
          onClick={() => setExpand(!expand)}
          className="menu-item "
        >
          <div className="menu-item-icon">
            <i className={iconClassName}></i>
          </div>
          <span>
            <span> {name}</span>
            {name === "My Reports" ||
            name === "Procuremennt BM Reports" ||
            name === "Control Panel" ||
            name === "BM Reports" ||
            name === "Price Arbitrage"  ? (
              <span>
                {expand ? (
                  <i
                    class="bi bi-chevron-up "
                    style={{ marginLeft: "1rem" }}
                  ></i>
                ) : (
                  <i
                    class="bi bi-chevron-down "
                    style={{ marginLeft: "1rem" }}
                  ></i>
                )}
              </span>
            ) : (
              ""
            )}
          </span>
        </NavLink>
        {subMenus && subMenus.length > 0 ? (
          <ul className={`sub-menu ${expand ? "active" : ""}`}>
              {
                        subMenus && subMenus.map((menu, index)=>(
                            <NestedMenuItem
                            key="index"
                            name={menu.name}
                            // exact = {menu.exact}
                            to={menu.to}
                            nestedsubMenus = {menu.nestedSubMenus || []}
                           iconClassName={menu.iconClassName}
                            onClick={()=>{
                                if(inactive){
                                    setInactive(false);
                                }
                            }}
                            />
                        ))
                    }
            {/* {subMenus.map((menu) => (
              <li key={menu.id}>
                <NavLink className="nav-link" to={menu.to}>
                  {menu.name}{" "}
                </NavLink>
              </li>
            ))} */}
          </ul>
        ) : null}
      </li>
    );
}
export default MenuItem;