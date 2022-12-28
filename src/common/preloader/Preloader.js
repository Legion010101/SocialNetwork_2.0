import style from '../../components/Main/Users/User.module.css'
import preloader from '../../accept/img/SVGFetch.svg'

let Preloader = (props) => {
  return (
    <img
      className={!props.toggle ? style.preloader : ''}
      src={preloader}
      alt=""
    />
  )
}
export {Preloader}
