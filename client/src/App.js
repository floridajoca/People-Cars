import {ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client";
import {Layout} from "antd";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import 'antd/dist/reset.css'
import DetailsPage from "./DetailsPage";
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
                        <Route path="person/:personId" element={<DetailsPage />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </ApolloProvider>
  );
}

export default App;
