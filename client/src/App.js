import {ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client";
import {Layout} from "antd";
import {Header} from "antd/es/layout/layout";
import AddCar from "./components/forms/AddCar";
import AddPerson from "./components/forms/AddPerson";
import Cars from "./components/list/Cars";
import People from "./components/list/People";
import Title from "./components/Title";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import 'antd/dist/reset.css'
import Home from "./Home";

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
})

const App = () => {
    return (
        <ApolloProvider client={client}>


            <BrowserRouter>
                <Layout className="App">

                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        {/*<Route path="person/:personId" element={<SinglePage />} />*/}
                    </Routes>
                </Layout>
            </BrowserRouter>
        </ApolloProvider>
  );
}

export default App;
