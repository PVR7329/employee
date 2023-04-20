import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../Redux/store'
import { deleteUser, userDataTable } from '../../Api_services/ApiService'
import './DeletePopup.css'

interface IDeletePopup {
    countNm: string,
    setdelPopup: React.Dispatch<React.SetStateAction<boolean>>
}

export const DeletePopup = (props: IDeletePopup) => {
    const { countNm,setdelPopup } = props
    const loading = useSelector((state: RootState) => state.userdata.loading);
    const userAll = useSelector((state: RootState) => state.userdata.users)
    const setperpage = useSelector((state: RootState) => state.userdata.setPerPage);
    const dispatch = useDispatch()
    
    const handledelete = () => {
        let deletedata = userAll.data.filter((user: any) => user.isSelected === true)
        for (let i = 0; i < deletedata.length; i++) {
            dispatch(deleteUser(deletedata[i].id))
        }
        setTimeout(() => {
            dispatch(userDataTable({setperpage}))
        }, 4000)
        setdelPopup(false)
    }

    return (
        <>
            <div className="delmodal">
                <div className="content">
                    <div className="close">
                    </div>
                    <h3>Are you sure ?</h3>
                    <br />
                    <p>You want to delete name of employee {countNm} ?</p>
                    <br />
                    <div className="btn_wrap">
                        <button className='btn' onClick={handledelete}>Delete {loading !== true || "loding..."}</button>
                        <button className='btn' onClick={() => setdelPopup(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}
