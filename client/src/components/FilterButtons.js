import React, { Component } from 'react'

class FilterButtons extends Component {
    render() {
        return (
            <div className='filtersbtn'>
                <button onClick={this.props.toggleFilters}>Filter By +</button>
            </div>
        )
    }
}

export default FilterButtons;