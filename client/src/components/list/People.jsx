import {useQuery} from "@apollo/client";
import { List } from 'antd'
import {GET_PEOPLE} from "../../queries";
import Person from "../listItems/Person";

const getStyles = () => ({
    list: {
        display: 'flex',
        width: '100%'

    }
})

const People = () => {
    const styles = getStyles()

    const { loading, error, data } = useQuery(GET_PEOPLE)

    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    return (
        <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
            {data.peoples?.map(({ id, firstName, lastName }) => (
                <List.Item key={id}>
                    <Person key={id} id={id} firstName={firstName} lastName={lastName} />
                </List.Item>
            ))}
        </List>
    )
}

export default People;
