import {ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client";
import AddCar from "./components/forms/AddCar";
import AddPerson from "./components/forms/AddPerson";
import Cars from "./components/list/Cars";
import People from "./components/list/People";
import Title from "./components/Title";
import './App.css';

import 'antd/dist/reset.css'

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
})

const App = () => {
    return (
        <ApolloProvider client={client}>
            <div className="App">
              <Title/>
                <AddPerson/>
                <AddCar/>
                <Cars/>
                <People/>
            </div>
        </ApolloProvider>
  );
}

export default App;
