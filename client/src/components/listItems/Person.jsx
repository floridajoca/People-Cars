import {EditOutlined} from "@ant-design/icons";
import {Button, Card} from 'antd'
import { useState } from 'react'
import {useNavigate} from "react-router";
import RemovePerson from "../buttons/RemovePerson";
import UpdatePerson from "../forms/UpdatePerson";
import Cars from "../list/Cars";

const getStyles = () => ({
    card: {
        width: '100%'
    }
})

const Person = props => {
    const [id] = useState(props.id)
    const [firstName, setFirstName] = useState(props.firstName)
    const [lastName, setLastName] = useState(props.lastName)
    const [editMode, setEditMode] = useState(false)
    const navigate = useNavigate();

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

    const onLearnMore = () => {
        navigate(`/person/${props.id}`)
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
                        <RemovePerson id={id} />
                    ]}
                >
                    {firstName} {lastName}
                    <Cars personId={id}/>
                    <Button onClick={onLearnMore}>Learn More</Button>
                </Card>
            )}
        </div>
    )
}

export default Person;
