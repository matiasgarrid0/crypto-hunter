import React from 'react'
import { Banner } from './Banner'
import { Table } from './Table'
import Information from './Information'

export const HomePage = () => {
  
  return (
    <div>
        <Banner/>
        <Table className='container-table'/>
        <Information/>
    </div>
  )
}
