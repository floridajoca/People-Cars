import {useQuery} from "@apollo/client";
import { List } from 'antd'
import {GET_CARS} from "../../queries";


const getStyles = () => ({
    list: {
        display: 'flex',
        justifyContent: 'center'
    }
})

const Cars = () => {
    const styles = getStyles()

    const { loading, error, data } = useQuery(GET_CARS)

    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    return (
        <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
            {data?.cars?.map(({ id, year, model, make, price, personId }) => (
                <List.Item key={id}>
                    {year}, {model}, {make}, {price}, {personId}
                </List.Item>
            ))}
        </List>
    )
}

export default Cars;
