import style from '../../components/Main/Users/User.module.css'
import preloader from '../../accept/img/SVGFetch.svg'

let Preloader = ({toggle}: {toggle: boolean}) => {
  return (
    <img className={!toggle ? style.preloader : ''} src={preloader} alt="" />
  )
}
export {Preloader}
