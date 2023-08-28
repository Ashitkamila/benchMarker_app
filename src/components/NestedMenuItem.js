import React from 'react'
import { NavLink } from 'react-router-dom';

function NestedMenuItem(props) {
    const { name, nestedsubMenus, iconClassName, onClick, to, exact } = props;
    const [expand, setExpand] = React.useState(false);


  return (
    <div>
           <li onClick={onClick} className="mt-2">
        <NavLink
          exact
          to={to}
          onClick={() => setExpand(!expand)}
          className="menu-item "
          style={{fontSize:"0.8rem",lineHight:"30px"}}
        >
         
            <i style={{padding:"0px 10px 0px 0px"}} className={iconClassName}></i>
          
          <span>
            <span> {name}</span>
            {name === "Procurement  BM reports" ||
            name === "Sales BM report" ||
            // name === "Control Panel" ||
            // name === "BM Reports" ||
            name === "Price Arbitrage"  ? (
              <span>
                {expand ? (
                  <i
                    class="bi bi-chevron-up "
                    style={{ marginLeft: "0.7rem" }}
                  ></i>
                ) : (
                  <i
                    class="bi bi-chevron-down "
                    style={{ marginLeft: "0.7rem" }}
                  ></i>
                )}
              </span>
            ) : (
              ""
            )}
          </span>
        </NavLink>
        {nestedsubMenus && nestedsubMenus.length > 0 ? (
          <ul style={{marginLeft:"5px",listStyle:"none"}} className={`sub-menu ${expand ? "active" : ""}`}>
            {nestedsubMenus.map((menu) => (
              <li  key={menu.id}>
                <NavLink style={{fontSize:"0.8rem"}} className="nav-link" to={menu.to}>
                  {menu.name}{" "}
                </NavLink>
              </li>
            ))}
          </ul>
        ) : null}
      </li>
    </div>
  )
}

export default NestedMenuItem