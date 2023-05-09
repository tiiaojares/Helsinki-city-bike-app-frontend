

const FilterComponent = ({idFilterInput,
    setIdFilterInput,
    nameFilterInput,
    setNameFilterInput,
    addressFilterInput,
    setAddressFilterInput,
    kapasiteetFilterInput,
    setKapasiteetFilterInput,
    stationsFindNumber}) => {
    
    const filterWithID = (event) => {
        setIdFilterInput(event.target.value);
    }

    const filterWithName = (event) => {
        setNameFilterInput(event.target.value);
    }
    const filterWithAdress = (event) => {
        setAddressFilterInput(event.target.value);
    }
    const filterWithKapasiteet = (event) => {
        setKapasiteetFilterInput(event.target.value);
    }



    return (
        <div className="container filterComponent"> 
            <div className="row">
                <div className="col-sm-4">
                    <img src="https://cdn.pixabay.com/photo/2017/08/17/17/44/the-little-yellow-car-2652215_960_720.jpg" />
                </div>

                <div className="col-sm-8">
                    <h2>Etsi kaupunkipyöräasema: </h2>

                    <div className="filterRow">
                        <span> ID: </span>
                        <input 
                        className="filterInput" 
                        type="text" 
                        value={idFilterInput} 
                        onChange={filterWithID} />        
                    </div>

                    <div className="filterRow"> 
                        <span> Nimi: </span>   
                        <input 
                            className="filterInput" 
                            type="text" 
                            value={nameFilterInput} 
                            onChange={filterWithName} 
                        />
                    </div>

                    <div className="filterRow">
                        <span> Osoite: </span>
                        <input
                        className="filterInput" 
                        type="text" 
                        value={addressFilterInput} 
                        onChange={filterWithAdress} 
                        />
                    </div>

                    <div className="filterRow lastRow">
                        <span> Kapasiteetti: </span>
                        <input
                        className="filterInput" 
                        type="text" 
                        value={kapasiteetFilterInput} 
                        onChange={filterWithKapasiteet} 
                        />
                    </div>

                    <div className="filterRow filterInfo">
                        <span> Hakutuloksilla löytyy {stationsFindNumber} asemaa </span>
                    </div>

                </div>
            </div>   
        </div>
    )
}

export { FilterComponent }