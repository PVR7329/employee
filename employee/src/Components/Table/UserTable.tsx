import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../Redux/store'
import { inisiData } from '../../Redux/userDataSlice'
import { UserList } from '../../TypeOf/userlist'
import { RegFrom } from '../Form/RegFrom'
import { DeletePopup } from '../DeletPop/DeletePopup'
import { useLocation, useNavigate } from 'react-router-dom'
import Loadar from '../Loing Api/Loadar'
import { userDataTable } from '../../Api_services/ApiService'
import './UserTable.css'


const colsth = [
    { heading: "Id", sortfiled: 'id' },
    { heading: "Name", sortfiled: 'uname' },
]

export const UserTable = () => {
    const initialValues = {
        id: '',
        uname: '',
    }

    const usersall = useSelector((state: RootState) => state.userdata.users);
    const setperpage = useSelector((state: RootState) => state.userdata.setPerPage);
    const loading = useSelector((state: RootState) => state.userdata.loading);
    const message = useSelector((state: RootState) => state.userdata.message);


    const [frmValues, setfrmValues] = useState<UserList>(initialValues)
    const [isChecked, setIsChecked] = useState<UserList | any>({})
    const [delBtn, setDelBtn] = useState(false)
    const [editBtn, setEditBtn] = useState(false)
    const [delPopup, setdelPopup] = useState(false)
    const [countNm, setcountNm] = useState('')
    const [frmModalShow, setfrmModalShow] = useState(false)
    const [IsUpdate, setIsUpdate] = useState(false)
    const [frmNameShow, setFrmNameShow] = useState('Registration')
    const [frmBtnName, setFrmBtnName] = useState('Sing up')

    const dispatch = useDispatch()
    
    const handleCheck = (e: any) => {
        const { id, checked } = e.target
        if (id === 'allselect') {
            let checkval = usersall.data.map((user: any) => ({ ...user, isSelected: checked }))
            if (checked) {
                setDelBtn(true)
            } else {
                setDelBtn(false)
                setEditBtn(false)
            }
            setIsChecked(checkval)
            dispatch(inisiData({ data: checkval, total: usersall.total }))
        } else {
            let checkval = usersall.data.map((user: any) => {
                if (user.id == id) {
                    user = { ...user, isSelected: checked }
                }
                return user
            })
            let checkvals = checkval.filter((x: any) => x.isSelected === true)
            if (checkvals.length > 0) {
                setDelBtn(true)
            } else {
                setDelBtn(false)
                setEditBtn(false)
            }
            if (checkvals.length === 1) {
                setEditBtn(true)
            } else {
                setEditBtn(false)
            }
            setIsChecked(checkval)
            dispatch(inisiData({ data: checkval, total: usersall.total }))
        }
    }
    const location = useLocation()
    const navigete = useNavigate()
    const handlefromshow = () => {
        setfrmModalShow(true)
    }


    const handleupdate = () => {
        let updated: any = usersall.data.filter((x: any) => x.isSelected === true)
        const [{ id, uname, uaddress, umobile, uemail, ugender, ucheck, ucity }] = updated
        let updateval: any = { id, uname, uaddress, umobile, uemail, ugender, ucheck, ucity }
        setIsChecked(updateval)
        setfrmValues(updateval)
        setIsUpdate(true)
    }


    const handledelpopup = () => {
        setdelPopup(true)
        navigete(`/delete`)
        let check = isChecked.filter((x: any) => x.isSelected === true)
        let count = check.length
        check = check.map((user: any) => user.uname)
        if (count > 1) {
            setcountNm(count)
        } else {
            setcountNm(check)
        }
    }

    useEffect(() => {
        if (location.pathname === '/create' || location.pathname === '/edit') {
            setfrmModalShow(true)
        } else {
            setfrmModalShow(false)
        }
        dispatch(userDataTable({ setperpage }))
    }, [ setperpage])

    if (message) {
        return (<h3>Something went to wrong. Please try again later.</h3>)
    }
    return (
        <>
            <div className="main_wrap">
                <div className="tbl_wrap">
                    <div className='tblheading_top'>
                        <h1>Employee Table</h1>
                    </div>


                    <div className="tblhading">
                        <div className="action">
                            {delBtn === true ? <button onClick={handledelpopup}>Delete</button> : false}
                            {editBtn === true ?  <button onClick={() => { handlefromshow(); handleupdate(); setFrmBtnName('Save'); setFrmNameShow("Updated"); navigete(`/edit`) }}>Edit</button> : false}
                        </div>
                     
                        <div className="adduser">
                            <button onClick={() => { handlefromshow(); setIsUpdate(false); setFrmBtnName('Sing up'); setFrmNameShow("Registration"); navigete(`/create`) }}>Add</button>
                        </div>
                    </div>



                    <div className="tbl_scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th><input type="checkbox" id='allselect' checked={!(usersall.data === undefined || usersall.data.some((check: any) => check?.isSelected !== true))} onChange={handleCheck} /></th>
                                    {colsth.map((items, index) =>
                                        <th key={index} className='tblth' ><span>{(items.heading)} </span></th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (usersall.data === undefined || usersall.data <= 0) ? <tr><td colSpan={8}>{(`Not data found`)}</td></tr> :
                                        usersall.data.map((item: any) =>
                                            <tr key={item.id}>
                                                <td> <input type="checkbox" id={item.id} checked={item?.isSelected || false} onChange={handleCheck} /></td>
                                                <td>{item.id}</td>
                                                <td>{item.uname}</td>
                                            </tr>
                                        )
                                }
                            </tbody>
                        </table>
                    </div>
                    {loading !== true || <Loadar />}
                    {frmModalShow === true ? <RegFrom frmBtnName={frmBtnName} setEditBtn={setEditBtn} frmNameShow={frmNameShow} setDelBtn={setDelBtn} initialValues={initialValues} setfrmValues={setfrmValues}   IsUpdate={IsUpdate} isChecked={isChecked} frmValues={frmValues} setfrmModalShow={setfrmModalShow} /> : false}
                    {delPopup === true ? <DeletePopup countNm={countNm} setdelPopup={setdelPopup} /> : false}
                </div>
            </div>
        </>
    )
}