import React from 'react';

function Filter(props) {
    let filterVariants = props.values.map((v, index) => (<button key={index} onClick={() => props.filter(v)} type="button" className={`filter__variant ${props.activeValues.includes(v) ? "filter__variant_active" : ""}`}>{v}</button>))
    return (
        <div className="filter">
            <div className="filter__name">Show only</div>
            <div className="filter__variants">
                {filterVariants}
            </div>
        </div>
    );
}

export default Filter;