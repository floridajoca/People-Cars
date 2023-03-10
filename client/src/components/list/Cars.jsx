import {useQuery} from "@apollo/client";
import { List } from 'antd'
import {GET_CARS} from "../../queries";
import Car from "../listItems/Car";


const getStyles = () => ({
    list: {
        display: 'flex',
        width: '100%'
    }
})

const Cars = ({personId}) => {
    const styles = getStyles()

    const { loading, error, data } = useQuery(GET_CARS)

    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    return (
        <List grid={{ gutter: 20, column: 1 }} style={styles.list}>

            {
                data?.cars?.filter((car) => car.personId === personId).map(({ id, year, model, make, price, personId }) => (
                    <List.Item key={id}>
                        <Car key={id} id={id} year={year} model={model} make={make} price={price} personId={personId}/>
                    </List.Item>
                ))
            }
        </List>
    )
}

export default Cars;
