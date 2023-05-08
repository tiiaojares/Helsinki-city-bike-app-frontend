import { CardComponent } from '../cards/card';


const MainPage = () => {


    return (
        <div className="row">
        <CardComponent 
          pictureUrl={"https://cdn.pixabay.com/photo/2017/08/17/17/44/the-little-yellow-car-2652215_960_720.jpg"} 
          text={"Kaupunkipyöräasemat"} 
          navigateTo={"/stations"} />        
        <CardComponent 
          pictureUrl={"https://cdn.pixabay.com/photo/2014/12/02/03/16/winding-road-553481__340.jpg"} 
          text={"Matkat"} 
          navigateTo={"/journeys"} />
      </div>
    )
}

export { MainPage }