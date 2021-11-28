export const Button = (props:any) => {
    return (
        <button onClick={props.clickFunc} >{props.title}</button>
    )
  }