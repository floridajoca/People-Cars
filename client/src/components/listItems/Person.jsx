import {EditOutlined} from "@ant-design/icons";
import { Card } from 'antd'
import { useState } from 'react'
import UpdatePerson from "../forms/UpdatePerson";

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

    const handleButtonClick = () => {
        setEditMode(!editMode)
    }

    const updateStateVariable = (variable, value) => {
        switch (variable) {
            case 'firstName':
                setFirstName(value)
                break
            case 'lastName':
                setLastName(value)
                break
            default:
                break
        }
    }

    return (
        <div>
            {editMode ? (
                <UpdatePerson
                    id={props.id}
                    firstName={props.firstName}
                    lastName={props.lastName}
                    onButtonClick={handleButtonClick}
                    updateStateVariable={updateStateVariable}
                />
            ) : (
                <Card
                    style={styles.card}
                    actions={[
                        <EditOutlined key='edit' onClick={handleButtonClick} />,
                    ]}
                >
                    {firstName} {lastName}
                </Card>
            )}
        </div>
    )
}

export default Person;
