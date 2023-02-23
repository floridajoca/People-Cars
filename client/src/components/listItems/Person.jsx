import { Card } from 'antd'
import { useState } from 'react'

const getStyles = () => ({
    card: {
        width: '500px'
    }
})

const Person = props => {
    const [id] = useState(props.id)
    const [firstName, setFirstName] = useState(props.firstName)
    const [lastName, setLastName] = useState(props.lastName)
    const [editMode, setEditMode] = useState(false)

    const styles = getStyles()

    return (
        <div>
            <Card
                style={styles.card}
            >
                {firstName} {lastName}
            </Card>
        </div>
    )
}

export default Person;
