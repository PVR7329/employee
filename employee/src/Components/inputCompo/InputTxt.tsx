import { inputField } from '../../TypeOf/inputState'

const InputTxt = (props: inputField) => {
    const {onBlur,onKeyUp,onChange,label,name,type,errors,inputref,values,touched,placeholder} = props
    return (
      <>
      <div className="frm_control">
      {type !== 'hidden' ?<label htmlFor={name}>{label}*</label>:null} : 
          <input className='fild' type={type} name={name} ref={inputref} placeholder={placeholder} value={values} onKeyUp={onKeyUp} onBlur={onBlur} onChange={onChange}/>
          <br />
             {errors && touched ? (<small>{errors}</small>):null}
      </div>
      </>
    )
}
export default InputTxt