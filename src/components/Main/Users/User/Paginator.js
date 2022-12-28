import React, {useState} from 'react'
import style from '../User.module.css'

let Paginator = (props) => {
  const [openPage, setOpenPage] = useState(10)
  let showMoreUsers = () => {
    setOpenPage((prevState) => prevState + props.pagesLimit)
  }
  let backPageUsers = () => {
    setOpenPage((prevState) => prevState - props.pagesLimit)
  }
  let choosePage = (num) => {
    props.choosePage(num)
  }
  let boldStyle = (num) => {
    return num === props.pageNumber ? style.bold : style.pageNumber
  }

  let pages = []
  for (let i = 1; i < props.totalPage; i++) {
    pages.push(i)
  }
  return (
    <div className={style.numberPage}>
      {openPage > 10 && (
        <button className={style.pageNumber} onClick={backPageUsers}>
          Back
        </button>
      )}
      {pages.map((num) => {
        return (
          num <= openPage &&
          num >= openPage - 10 && (
            <div
              key={num}
              onClick={() => choosePage(num)}
              className={boldStyle(num)}>
              {num}
            </div>
          )
        )
      })}
      {openPage < props.totalPage && (
        <button className={style.pageNumber} onClick={showMoreUsers}>
          Next
        </button>
      )}
    </div>
  )
}

export {Paginator}
