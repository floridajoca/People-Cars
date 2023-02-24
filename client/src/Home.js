import AddCar from "./components/forms/AddCar";
import AddPerson from "./components/forms/AddPerson";
import People from "./components/list/People";
import Title from "./components/Title";

const Home = () => {
  return (
      <div className="home">
          <Title/>
          <AddPerson/>
          <AddCar/>
          <h3> <span>Records</span></h3>
          <People/>
      </div>
  )
}

export default Home
