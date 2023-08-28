// import { Assessment } from '@material-ui/icons';
import AssessmentIcon from '@mui/icons-material/Assessment';
export const adminMenuItem = 
[
  {
    name: "Dashboard",
    exact: true,
    to: "/dashboard",
    iconClassName: "bi bi-speedometer2",
  },
  {
    name: "BM Management",
    exact: true,
    to: "/bm-management",
    iconClassName: "bi bi-people-fill",
  },
 
  {
    name: "Locations",
    exact: true,
    to: "/locations",
    iconClassName: "bi bi-geo-alt-fill",
  },
  {
    name: "Item Master",
    exact: true,
    to: "/fnv-item-master",
    iconClassName: "bi bi-basket",
    // subMenus: [
    //   {
    //     name: "Fnv",
    //     to: "/fnv-item-master",
    //     id: 1,
    //   },
    //   {
    //     name: "NFnv",
    //     to: "/nfnv-item-master",
    //     id: 2,
    //   },
    //   {
    //     name: "Imported",
    //     to: "/import-item-master",
    //     id: 3,
    //   },
    // ],
  },
  {
    name: "Market",
    exact: true,
    to: "/market",
    iconClassName: "bi bi-shop",
  },
  {
    name: "My Reports",
    to: "/reports",
    iconClassName: "bi bi-bar-chart-line-fill",
    subMenus: [
      {
        name: "Benchmarking reports",
        to: "/reports"

      },
      {
        name: "Procurement  BM reports",
        to:  "/plantWiseBMReport",
        // iconClassName:"bi bi-file-earmark-fill",
        nestedSubMenus: [
          {
            name: 'Plant wise procurement BM report',
            to: "/plantWiseBMReport"
          },
          {
            name: "CC procurement price report",
            to: "/CC-competitor-price"
          },
          {
            name: "Competitor procurement price report",
            to: "/competitor-price"
          },
          {
            name: "Agmark report",
            to: "/agmark-report"
          },
          {
            name: "Procurement  forecasting report",
            to: "/forecasting_report"
          },
          // {
          //   name: "Procurement  forecasting report",
          //   to: "/"
          // }
        ]
      },
      {
        name: "Sales BM report",
        to: "/e",
        nestedSubMenus: [
          {
            name: "Market wise sales BM report",
            to: "/market-report"
          },
          {
            name: "Plant wise sales BM report",
            to: "/rep"
          },
          {
            name: "Competitor sales Price report",
            to:  "/competitor-price"
          },
          {
            name: "Sales price forecasting report",
            to: "/SalesPriceReport"
          },
        ]
      },
      {
        name: "Price Arbitrage",
        to:"/priceArbitrage",
        nestedSubMenus:[
          {
            name:"Arbitrage report",
            to:"/priceArbitrage"
          },

          {
            name:"Arbitrage tracker report",
            to:"/price-arbitrage-tracker"
          }
        ]
      },
      {
        name: "Bench marker performance report",
        to:"/bm-report"
      }
    ]
  },
 
 
  // {
  //   name: "Sales BM Reports",
  //   to: "/location-report",
  //   iconClassName: "bi bi-bar-chart-line-fill",
  //   subMenus: [

  //     // {
  //     //   name: "Benchmarker Reports",
  //     //   to: "/reports",
  //     // },
  //     // {
  //     //   name: "Agmark Report",
  //     //   to: "/agmark-report",
  //     // },

  //     // {
  //     //   name: "Benchmarker Performance Report",
  //     //   to: "/bm-report",
  //     // },
  //     {
  //       name: "Location wise Report",
  //       to: "/location-report",
  //     },
  //     // {
  //     //   name: "Market wise Report",
  //     //   to: "/market-report",
  //     // },
  //     {
  //       name: "Price Trends",
  //       to: "/price-trends",
  //     },
  //     // {
  //     //   name: "Price Arbitrage",
  //     //   to: "/price-arbitrage",
  //     // },
  //     // {
  //     //   name: "Price Arbitrage Tracker",
  //     //   to: "/price-arbitrage-tracker",
  //     // },
  //   ],
  // },
  {
    name: "Procuremennt BM Reports",
    exact: true,
    to: "/cc-availability",
    iconClassName: "bi bi-currency-exchange",
    subMenus: [
      // {
      //   name: "Procurement BM report",
      //   to: "/procurement-price",
      //   id: 1,
      // },
      {
        name: "CC Availability",
        to: "/cc-availability",
        id: 2,
      },
      {
        name: "Procurement Competior price",
        to: "/competitor-price",
        id: 3,
      },
    ],
  },

  {
    name: "Price Arbitrage",
    exact: true,
    to: "/price-arbitrage",
    iconClassName: "bi bi-currency-exchange",
    subMenus: [
      {
        name: "Price Arbitrage report",
        to: "/price-arbitrage",
        id: 1,
      },
      {
        name: "Price Arbitrage Tracker",
        to: "/price-arbitrage-tracker",
        id: 2,
      },

    ],
  },

  {
    name: "Role Management",
    to: "/admin-role-management",
    // id: 1,
    iconClassName: "bi bi-bootstrap-reboot",

  },






  // {
  //   name: "CompetitorPrice",
  //   exact: true,
  //   to: "/competitor-price",
  //   iconClassName: "bi bi-currency-exchange",
  // },

  //   {
  //   name: "Price Arbitrage",
  //   exact: true,
  //   to: "/price-arbitrage",
  //   iconClassName: "bi bi-graph-up-arrow",
  // },
  // {
  //   name: "Item Master",
  //   exact: true,
  //   to:"/fnv-item-master",
  //   iconClassName:  "bi bi-basket",
  // },
 
  {
    name: "Control Panel",
    exact: true,
    to: "/time-slot-management",
    iconClassName: "bi bi-gear-wide-connected",
    subMenus: [
      // {
      //   name: "Role Management",
      //   to: "/admin-role-management",
      //   id: 1,
      // },
      {
        name: "Time Slot Management",
        to: "/time-slot-management",
        id: 2,
      },
      // {
      //   name: "Geo Fencing",
      //   to: "/geo-fencing",
      //   id: 3,
      // },
      // {
      //     name: "Approve New SKU",
      //     to: "/approve-new-sku",
      //     id:4,
      // },
      // {
      //     name: "FNV Item Master",
      //     to: "/fnv-item-master",
      //     id:5,
      // },
      // {
      //     name: "NFNV Item Master",
      //     to: "/nfnv-item-master",
      //     id:6,
      // },
      // {
      //     name: "Imported Item Master",
      //     to: "/import-item-master",
      //     id:6,
      // },
      {
        name: "Price volatility factor",
        to: "/price-volatility-factor",
        id: 7,
      },
      {
        name: "Market Wise Conversion Masters",
        to: "/conversion-master",
        id: 8,
      },
      // {
      //     name: "Conversion Master",
      //     to: "/conversion-master",
      //     id:8,
      // },
      {
        name: "Location Matrix",
        to: "/location-matrix",
        id: 9,
      },
      {
        name: "Market Commision",
        to: "/market-commision",
        id: 11,
      },
      {
        name: "Transportation Cost",
        to: "/transportation-cost",
        id: 12,
      },
    ],
  },
];



export const userMenuItem = [
  {
    name: "Dashboard",
    exact: true,
    to: "/dashboard",
    iconClassName: "bi bi-speedometer2"
  },
  {
    name: "My Reports",
    to: "/reports",
    iconClassName: "bi bi-bar-chart-line-fill",
    subMenus: [
      {
        name: "Benchmarker Reports",
        to: "/reports"
      },
      {
        name: "Price Trends",
        to: "/price-trends"
      },
      {
        name: "Price Arbitrage",
        to: "/price-arbitrage"
      },
      // {
      //     name: "Benchmarker Performance Report",
      //     to: "/bm-report"
      // },
      {
        name: "Location wise Report",
        to: "/location-report"
      },
      {
        name: "Market wise Report",
        to: "/market-report"
      },

    ]

  },
 

]

