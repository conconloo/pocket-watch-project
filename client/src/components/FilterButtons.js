import React, { Component } from 'react'

class FilterButtons extends Component {
    render() {
        return (
            <div className="filters">
                <button onClick={this.props.toggleFilters}>Filter by:</button>
            </div>
        )
    }
}

export default FilterButtons;