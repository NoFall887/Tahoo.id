export default function AuthContainer(props){
  return(
    <div id="authContainer"  className="d-flex align-items-center">
      {props.children}
    </div>
  )
}