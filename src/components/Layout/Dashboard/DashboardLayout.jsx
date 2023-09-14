import React,{useState} from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import DashBoardHeader from './DashBoardHeader'
import DashBoardSidebar from './DashBoardSidebar'
const DashboardLayout = () => {
    const [childValue, setChildValue] = useState(true);
     const {state} = useLocation()
    return (
        <> 
            <main className={`admin-main ${childValue === false ? 'active' : ''}`}>
                <DashBoardHeader childValue={childValue} setChildValue={setChildValue}/>
                <DashBoardSidebar childValue={childValue} setChildValue={setChildValue}/>
                <div className='admin-content'>
                    {/* <h1 className='title-mobile-only'>{state ?? "Dashboard"}</h1> */}
                    <Outlet />
                </div>
            </main> 
        </>
    )
}

export default DashboardLayout
