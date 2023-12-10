import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import Footer from '../../../components/AdminComponents/Footer/Footer'
import SingleView from '../../../components/AdminComponents/Materials/SingleView'
function MaterialSingleView() {
  return (
    <div>
        <Header headers="MATERIALS FOR THIS PROJECT"/>
        <SingleView/>
        <Footer/>
    </div>
  )
}

export default MaterialSingleView