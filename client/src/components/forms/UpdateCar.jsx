import { useMutation } from '@apollo/client'
import { Button, Form, Input } from 'antd'
import { useEffect, useState } from 'react'
import { UPDATE_PERSON } from '../../queries'

const UpdateCar = props => {
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()
    const [id] = useState(props.id)
    const [year, setYear] = useState(props.year)
    const [make, setMake] = useState(props.make)
    const [model, setModel] = useState(props.model);
    const [price, setPrice] = useState(props.price);
    const [personId, setPersonId] = useState(props.personId);


    const [updateCar] = useMutation(UPDATE_PERSON)

    useEffect(() => {
        forceUpdate()
    }, [])

    const onFinish = values => {
        const { firstName, lastName } = values
        updateCar({
            variables: {
                id,
                firstName,
                lastName
            }
        })
        props.onButtonClick()
    }

    const updateStateVariable = (variable, value) => {
        props.updateStateVariable(variable, value)
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
        <Form
            form={form}
            name='update-car-form'
            layout='inline'
            onFinish={onFinish}
            size='large'
            initialValues={{
                year: year,
                make: make,
                model: model,
                price: price,
            }}
        >
            <Form.Item
                name='year'
                rules={[{ required: true, message: 'Please input the year of the car!' }]}
            >
                <Input
                    placeholder='Year of the car'
                    onChange={e => updateStateVariable('year', e.target.value)}
                />
            </Form.Item>
            <Form.Item
                name='make'
                rules={[{ required: true, message: 'Please input the make of the car!' }]}
            >
                <Input
                    placeholder='Make of the car'
                    onChange={e => updateStateVariable('make', e.target.value)}
                />
            </Form.Item>
            <Form.Item
                name='model'
                rules={[{ required: true, message: 'Please input the model of the car!' }]}
            >
                <Input
                    placeholder='Model of the car'
                    onChange={e => updateStateVariable('model', e.target.value)}
                />
            </Form.Item>
            <Form.Item
                name='price'
                rules={[{ required: true, message: 'Please input the price of the car!' }]}
            >
                <Input
                    placeholder='Price of the car'
                    onChange={e => updateStateVariable('price', e.target.value)}
                />
            </Form.Item>
            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button
                        type='primary'
                        htmlType='submit'
                        disabled={
                            (!form.isFieldTouched('year')
                                && !form.isFieldTouched('make')
                                && !form.isFieldTouched('model')
                                && !form.isFieldTouched('price')) ||
                            form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >
                        Update Car
                    </Button>
                )}
            </Form.Item>
            <Button onClick={props.onButtonClick}>Cancel</Button>
        </Form>
    )
}

export default UpdateCar
