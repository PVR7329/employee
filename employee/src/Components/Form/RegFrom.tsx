import React, { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import { Validationscheme } from '../../ValidationSchema/validationschema'
import { useSelector, useDispatch } from 'react-redux'
import InputTxt from '../inputCompo/InputTxt'
import { UserList } from '../../TypeOf/userlist'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../Redux/store'
import { addData, updatedUser, userDataTable } from '../../Api_services/ApiService'
import { inisiData } from '../../Redux/userDataSlice'
import "./RegFrom.css"

interface IRegFrom {
    frmValues: UserList,
    isChecked: UserList | any,
    IsUpdate: boolean,
    frmBtnName: string,
    frmNameShow: string,
    initialValues: UserList,
    setfrmModalShow: React.Dispatch<React.SetStateAction<boolean>>,
    setfrmValues: React.Dispatch<React.SetStateAction<UserList>>,
    setDelBtn: React.Dispatch<React.SetStateAction<boolean>>,
    setEditBtn: React.Dispatch<React.SetStateAction<boolean>>,
}
export const RegFrom = (props: IRegFrom) => {
    const { setfrmModalShow, setDelBtn, setEditBtn, frmNameShow, frmBtnName, setfrmValues, initialValues, IsUpdate, frmValues, isChecked } = props
    const usersall = useSelector((state: RootState) => state.userdata.users);
    const loading = useSelector((state: RootState) => state.userdata.loading);
    const setperpage = useSelector((state: RootState) => state.userdata.setPerPage);
    const dispatch = useDispatch()
    const modalRef = useRef(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const handalAddData = (values: any, resetForm: any) => {
        if (IsUpdate) {
            const { id } = isChecked
            let user = ({ ...values, id: id })
            dispatch(updatedUser({ id, user }))
            setTimeout(() => {
                dispatch(userDataTable({ setperpage }))
                setfrmModalShow(false)
            }, 2000)

            uncheckbox()
        } else {
            let uid = uniqueId()
            let formData = ({ ...values, id: uid })
            dispatch(addData({ formData }))
            setTimeout(() => {
                dispatch(userDataTable({ setperpage }))
                setfrmModalShow(false)
            }, 2000)

            usenavigete('')
            localStorage.removeItem('modalInputValue');
            resetForm()
        }
    }

    const uniqueId = (length = 2) => {
        return parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(length).toString().replace(".", ""))
    }

    const { values, touched, errors, handleBlur, handleSubmit, handleChange } = useFormik({
        initialValues: frmValues,
        onSubmit: (values, { resetForm }) => {
            handalAddData(values, resetForm)
        },
        onReset: (values) => handalReset(values),
        validationSchema: Validationscheme,
        enableReinitialize: true
    });
    const usenavigete = useNavigate()



    const handlefrmclose = (e: any) => {
        if (e.target === modalRef.current) {
            uncheckbox()
            setfrmModalShow(false)
        }
        if (e.key === 'Escape') {
            uncheckbox()
            setfrmModalShow(false)
        }
    }

    const uncheckbox = () => {
        let unchecked = usersall.data.map((x: any) => {
            if (x.isSelected === true) {
                x = { ...x, isSelected: false }
            }
            return x
        })
        dispatch(inisiData({ data: unchecked, total: usersall.total }))
        setfrmValues({ ...initialValues })
        setDelBtn(false)
        setEditBtn(false)
        usenavigete('')
    }

    const handalReset = (values: any) => {
        setfrmValues(values)
    }

    useEffect(() => {
        inputRef.current?.focus()
        document.addEventListener('keyup', handlefrmclose)
        document.removeEventListener('keyup', handlefrmclose)
        localStorage.setItem('modalInputValue', JSON.stringify(frmValues))
    }, [frmValues])

    return (
        <>
            <div className="frm_modal" ref={modalRef} onClick={handlefrmclose}>
                <div className="frm_wrap">
                    <div className='hadDiv'>

                        <h1>{frmNameShow}</h1>
                        <button onClick={() =>  setfrmModalShow(false)}>Close</button>
                    </div>
                    <br />
                    <form action="" onReset={handalReset} onSubmit={handleSubmit}>

                        <InputTxt
                            name='id'
                            type='hidden'
                            values={values.id}
                        />

                        <InputTxt
                            label='Name'
                            name='uname'
                            inputref={inputRef}
                            type='text'
                            placeholder='Name'
                            values={values.uname}
                            onBlur={handleBlur}
                            onKeyUp={handleBlur}
                            onChange={handleChange}
                            errors={errors.uname}
                            touched={touched.uname}
                        />
                        <br />
                        <div className="btn_wrap">
                            <button className='btn' type='submit'>{frmBtnName} {loading !== true || "loding..."}</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
