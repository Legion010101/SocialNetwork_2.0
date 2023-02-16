import React, {FC, useState} from 'react'
import style from '../User.module.css'
import classnames from 'classnames'

type Props = {
  pagesLimit: number
  pageNumber: number
  totalPage: number
  choosePage: (num: number) => void
}

let Paginator: FC<Props> = ({
  pagesLimit,
  pageNumber,
  totalPage,
  choosePage,
}) => {
  const [openPage, setOpenPage] = useState(10)
  let showMoreUsers = () => {
    setOpenPage((prevState) => prevState + pagesLimit)
  }
  let backPageUsers = () => {
    setOpenPage((prevState) => prevState - pagesLimit)
  }
  let chooseNumberPage = (num: number) => {
    if (num !== pageNumber) choosePage && choosePage(num)
  }
  let boldStyle = (num: number) => {
    return num === pageNumber ? style.bold : style.pageNumber
  }

  let pages: Array<number> = []
  for (let i = 1; i < totalPage; i++) {
    pages.push(i)
  }
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {openPage > 10 && (
          <li className="page-item" onClick={backPageUsers}>
            <span className="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </span>
          </li>
        )}
        {pages.map((num) => {
          return (
            num <= openPage &&
            num > openPage - 10 && (
              <li
                className={classnames('page-item', boldStyle(num))}
                key={num}
                onClick={() => chooseNumberPage(num)}>
                <span className="page-link">
                  {num < 10 ? <>&nbsp; {num}</> : num}
                </span>
              </li>
            )
          )
        })}
        {openPage < totalPage && (
          <li className="page-item" onClick={showMoreUsers}>
            <span className="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </span>
          </li>
        )}
      </ul>
    </nav>
  )
}

export {Paginator}
