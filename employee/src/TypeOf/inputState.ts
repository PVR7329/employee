export interface inputField {
    type?:string,
    name?:string,
    label?:string,
    inputref?:React.LegacyRef<HTMLInputElement> | undefined,
    values?:string,
    errors?:string,
    touched?:string|any,
    placeholder?:string,
    onBlur?:React.FocusEventHandler<HTMLInputElement> | undefined,
    onKeyUp?:React.KeyboardEventHandler<HTMLInputElement> | undefined,
    onChange?:React.ChangeEventHandler<HTMLInputElement> | undefined,
}
export interface textariaField {
    name?:string,
    label?:string,
    values?:string,
    errors?:string,
    touched?:string|any,
    placeholder?:string,
    onBlur?:React.FocusEventHandler<HTMLTextAreaElement> | undefined,
    onKeyUp?:React.KeyboardEventHandler<HTMLTextAreaElement> | undefined,
    onChange?:React.ChangeEventHandler<HTMLTextAreaElement> | undefined,
}
export interface selectField {
    name?:string,
    label?:string,
    values?:string,
    errors?:string,
    touched?:string|any,
    placeholder?:string,
    onBlur?:React.FocusEventHandler<HTMLSelectElement> | undefined,
    onChange?:React.ChangeEventHandler<HTMLSelectElement> | undefined,
}