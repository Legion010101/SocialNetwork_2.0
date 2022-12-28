import React, {useEffect, useState} from 'react'

const StatusWithHook = ({idUserAuth, statusProps, userId, updateStatus}) => {
  let [editMode, setEditMode] = useState(false)
  let [status, setStatus] = useState(statusProps)
  useEffect(() => {
    setStatus(statusProps)
  }, [statusProps])

  let toggleStatusRedactorOn = () => {
    if (idUserAuth === userId) {
      setEditMode(true)
    }
  }
  let toggleStatusRedactorOff = () => {
    setEditMode(false)
    updateStatus(status)
  }
  let changeStatus = (e) => {
    let statusText = e.target.value

    setStatus(statusText)
  }

  return (
    <div className="text">
      {!editMode && (
        <span onDoubleClick={toggleStatusRedactorOn}>
          {statusProps ? statusProps : 'no status'}
        </span>
      )}
      {editMode && (
        <input
          onChange={changeStatus}
          onBlur={toggleStatusRedactorOff}
          autoFocus={true}
          type="text"
          value={status}
        />
      )}
    </div>
  )
}

export {StatusWithHook}
