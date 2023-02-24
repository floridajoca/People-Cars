import {EditOutlined} from "@ant-design/icons";
import { Card } from 'antd'
import { useState } from 'react'
import RemoveCar from "../buttons/RemoveCar";
import UpdateCar from "../forms/UpdateCar";

const getStyles = () => ({
    card: {
        width: '100%',
        backgroundColor: "#e5e3e3"
    }
})

const Car = props => {
    const [id] = useState(props.id)
    const [editMode, setEditMode] = useState(false)

    const [year, setYear] = useState(props.year)
    const [make, setMake] = useState(props.make)
    const [model, setModel] = useState(props.model);
    const [price, setPrice] = useState(props.price);
    const [personId, setPersonId] = useState(props.personId);

    const styles = getStyles()

    const handleButtonClick = () => {
        setEditMode(!editMode)
    }

    const priceFormatted = Number(price).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const updateStateVariable = (variable, value) => {
        switch (variable) {
            case 'year':
                setYear(value)
                break
            case 'make':
                setMake(value)
                break
            case 'model':
                setModel(value)
                break
            case 'price':
                setPrice(value)
                break
            default:
                break
        }
    }

    return (
        <div>
            {editMode ? (
                <UpdateCar
                    id={props.id}
                    year={props.year}
                    make={props.make}
                    model={props.model}
                    price={props.price}
                    onButtonClick={handleButtonClick}
                    updateStateVariable={updateStateVariable}
                />
            ) : (
                <Card
                    style={styles.card}
                    actions={[
                        <EditOutlined key='edit' onClick={handleButtonClick} />,
                        <RemoveCar id={id} />
                    ]}
                >
                    {year} {make} {model} -> {priceFormatted}
                </Card>
            )}
        </div>
    )
}

export default Car;
