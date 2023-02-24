import {DownOutlined, UserOutlined} from "@ant-design/icons";
import {useMutation, useQuery} from "@apollo/client";
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import {Button, Dropdown, Form, Input, Space} from 'antd'
import {ADD_CAR, GET_CARS, GET_PEOPLE} from "../../queries";

const AddCar = () => {
    const [id] = useState(uuidv4())
    const [personId, setPersonId] = useState("");
    const [addCar] = useMutation(ADD_CAR)

    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    const { loading, error, data } = useQuery(GET_PEOPLE)

    useEffect(() => {
        forceUpdate([])
    }, [])

    const onFinish = values => {
        const { year, make, model, price} = values

        addCar({
            variables: {
                id,
                year,
                make,
                model,
                price,
                personId
            },
            update: (cache, { data: { addCar } }) => {
                const data = cache.readQuery({ query: GET_CARS })
                cache.writeQuery({
                    query: GET_CARS,
                    data: {
                        ...data,
                        cars: [...data.cars, addCar]
                    }
                })
            }
        })
    }


    const dropDownList = () => {
       return data?.peoples?.map((person) => {
            return {
                label: `${person.firstName} ${person.lastName}`,
                key: `${person.id}`,
                icon: <UserOutlined />,
            }
        })
    }


    const handleMenuClick = (e) => {
        setPersonId(e.key);
    }

    const menuProps = {
        items: dropDownList(),
        onClick: handleMenuClick,
    };

    return (
        <Form
            name='add-person-form'
            form={form}
            layout='inline'
            onFinish={onFinish}
            size='large'
            style={{ marginBottom: '40px' }}
        >
            <Form.Item
                name='year'
                label={'Year:'}
                required
                rules={[{ required: true, message: 'Please input the year of the car!' }]}
            >
                <Input
                    placeholder='Year'
                />
            </Form.Item>
            <Form.Item
                name='make'
                label={'Make:'}
                required
                rules={[{ required: true, message: 'Please input the make of the car!' }]}
            >
                <Input
                    placeholder='Make'
                />
            </Form.Item>
            <Form.Item
                name='model'
                label={'Model:'}
                required
                rules={[{ required: true, message: 'Please input the model of the car!' }]}
            >
                <Input
                    placeholder='Model'
                />
            </Form.Item>
            <Form.Item
                name='price'
                label={'Price:'}
                required
                rules={[{ required: true, message: 'Please input the price of the car!' }]}
            >
                <Input
                    placeholder='Price'
                />
            </Form.Item>
                <Dropdown menu={menuProps}>
                    <Button>
                        <Space>
                            Select a person
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button
                        type='primary'
                        htmlType='submit'
                        disabled={
                            !form.isFieldsTouched(true) ||
                            form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >
                        Add Car
                    </Button>
                )}
            </Form.Item>
        </Form>
    )
}

export default AddCar
