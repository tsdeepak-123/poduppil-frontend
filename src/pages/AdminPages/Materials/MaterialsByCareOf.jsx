import React from 'react'
import Header from "../../../components/AdminComponents/Header/Header";
import MaterialListTable from '../../../components/AdminComponents/Materials/MaterialListTable';

function MaterialsByCareOf() {
  return (
    <div>
<Header headers={"TOTAL MATERIAL PURCHASE BY CREDIT"}/>
<MaterialListTable/>
    </div>
  )
}

export default MaterialsByCareOf