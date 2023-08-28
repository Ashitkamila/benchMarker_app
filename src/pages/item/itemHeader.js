
import { Checkbox } from '@material-ui/core';

const itemHeader = [
  { id: "srno", label: "Sr No" },
  // { id: <Checkbox />, label: <Checkbox /> },
  // { id: 'imageUrl', label: 'Image' },
  // { id: "ID", label: "ID" },
  { id: "material_no", label: "Item Code" },
  { id: "itemName", label: "Item Name" },
  { id: "category", label: "Category" },
  { id: "UoM", label: "UoM" },
  { id: "image", label: "Image" },
  // { id: 'baseQuantity', label: 'Base Quantity' },
  { id: "action", label: "Action", disableSorting: true },
  { id: "info", label: "More Info", disableSorting: false },
];
export default itemHeader;