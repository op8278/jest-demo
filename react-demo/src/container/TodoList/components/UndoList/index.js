import React, { Component } from 'react'

class UndoList extends Component {
  render() {
    const {
      list = [],
      deleteItem = () => {},
      changeStatus = () => {},
      handleBlur = () => {},
      valueChange = () => {},
    } = this.props
    return (
      <div className="undo-list">
        <div className="undo-list-title">
          正在进行
          <div data-test="count" className="undo-list-count">
            {list.length}
          </div>
        </div>
        <ul className="undo-list-content">
          {list.map((item, index) => {
            return (
              <li
                data-test="list-item"
                key={index}
                className="undo-list-item"
                onClick={() => changeStatus(index)}
              >
                {item.status === 'div' ? (
                  item.value
                ) : (
                  <input
                    autoFocus
                    data-test="input"
                    value={item.value}
                    onBlur={() => handleBlur(index)}
                    onChange={(e) => valueChange(index, e.target.value)}
                  />
                )}
                <div
                  className="undo-list-delete"
                  data-test="delete-item"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteItem(index)
                  }}
                >
                  -
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default UndoList
