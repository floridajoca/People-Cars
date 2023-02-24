import {useQuery} from "@apollo/client";
import {Button, Card} from "antd";
import {useState} from "react";
import {useParams} from "react-router";
import {Link} from "react-router-dom";
import {PERSON_OWNS_CARS} from "./queries";

const getStyles = () => ({
    card: {
        width: "800px",
        margin: "1rem",
    },
});
const DetailsPage = () => {
    const { id } = useParams();

    const styles = getStyles();
    const { loading, error, data } = useQuery(PERSON_OWNS_CARS, {
        variables: {
            id,
        },
    });
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
    const cars = data?.personAndCars.cars;
    return (
        <>
            <Link to={"/"}>
                <Button >Go Back</Button>
            </Link>
            <Card style={styles.card}>
                {data?.personAndCars?.firstName} {data?.personAndCars.lastName}
                <>
                    {cars?.map(({ id, year, make, model, price, personId }) => {
                        const priceFormatted = Number(price).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    });
                        return (
                            <Card key={id}>
                                {year} {make} {model} -{">"} {priceFormatted}
                            </Card>
                        )

                    })}
                </>
            </Card>
        </>
    );
};

export default DetailsPage;
