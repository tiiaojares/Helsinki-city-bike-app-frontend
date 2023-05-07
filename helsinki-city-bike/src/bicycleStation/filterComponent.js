

const FilterComponent = ({ filterInput, setFilterInput }) => {
    
    const filterWith = (event) => {
        setFilterInput(event.target.value);
    }

    return (
        <div className="container filterComponent"> 
            <div className="row">
                <div className="col-sm-4">
                    <img src="https://cdn.pixabay.com/photo/2017/08/17/17/44/the-little-yellow-car-2652215_960_720.jpg" />
                </div>

                <div className="col-sm-8">
                    <div className="filterRow">
                    <h2>Etsi kaupunkipyöräasema: </h2>
                        <span> ID: </span>
                        <input />        
                    </div>
                    <div className="filterRow"> 
                        <span> Nimi: </span>   
                        <input 
                            className="filterInput" 
                            type="text" 
                            value={filterInput} 
                            onChange={filterInput} 
                        />
                    </div>
                    <div className="filterRow">
                        <span> Osoite: </span>
                        <input
                        />
                    </div>
                    <div className="filterRow">
                        <span> Kapasiteetti: </span>
                        <input
                        />
                    </div>
                    <div className="filterRow">
                        <span> Hakutuloksilla löytyy xx asemaa </span>
                    </div>
                </div>
                

            </div>



           
           
            </div>
    )
}

export { FilterComponent }