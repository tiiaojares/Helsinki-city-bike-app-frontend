

const FilterComponent = ({ filterInput, setFilterInput }) => {
    
    const filterWith = (event) => {
        setFilterInput(event.target.value);
    }

    return (
        <div> 
            <p>Find station: </p>
            <input 
                className="filterInput" 
                type="text" 
                value={filterInput} 
                onChange={filterWith} 
            />
            </div>
    )
}

export { FilterComponent }