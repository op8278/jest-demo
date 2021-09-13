import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../store'

class Header extends Component {
  handleInputChange = (e) => {
    this.props.onChangeInput(e.target.value)
  }

  handleInputKeyUp = (e) => {
    const { value } = this.props

    if (e.keyCode === 13 && value) {
      this.props.addUndoItem(value)
      this.props.onChangeInput('')
    }
  }

  render() {
    const { value } = this.props
    return (
      <div className="header">
        <div className="header-content">
          TodoList
          <input
            className="header-input"
            placeholder="Todo"
            data-test="input"
            value={value}
            onChange={this.handleInputChange}
            onKeyUp={this.handleInputKeyUp}
          />
        </div>
      </div>
    )
  }
}

const mapState = (state) => ({
  value: state.todo.inputValue,
})
const mapDispatch = (dispatch) => ({
  onChangeInput(value) {
    dispatch(actions.changeInputValue(value))
  },
})
export default connect(mapState, mapDispatch)(Header)
