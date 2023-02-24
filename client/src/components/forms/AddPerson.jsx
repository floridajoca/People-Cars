import {useMutation} from "@apollo/client";
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Button, Form, Input } from 'antd'
import {ADD_PERSON, GET_PEOPLE} from "../../queries";


const AddContact = () => {
    const [id] = useState(uuidv4())
    const [addPerson] = useMutation(ADD_PERSON)
    const styles = getStyles()

    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    useEffect(() => {
        forceUpdate([])
    }, [])

    const onFinish = values => {
        const { firstName, lastName } = values

        addPerson({
            variables: {
                id,
                firstName,
                lastName
            },
            update: (cache, { data: { addPerson } }) => {
                const data = cache.readQuery({ query: GET_PEOPLE })
                cache.writeQuery({
                    query: GET_PEOPLE,
                    data: {
                        ...data,
                        peoples: [...data.peoples, addPerson]
                    }
                })
            }
        })
    }

    return (
        <>
            <h3 style={styles.title}> Add Person </h3>
                <Form
                    name='add-person-form'
                    form={form}
                    layout='inline'
                    onFinish={onFinish}
                    size='large'
                    style={{ marginBottom: '40px' }}
                >
                    <Form.Item
                        name='firstName'
                        label={'First Name'}
                        required
                        rules={[{ required: true, message: 'Please input your first name!' }]}
                    >
                        <Input placeholder='First Name' />
                    </Form.Item>
                    <Form.Item
                        label={'Last Name'}
                        required
                        name='lastName'
                        rules={[{ required: true, message: 'Please input your last name!' }]}
                    >
                        <Input placeholder='First Name' />
                    </Form.Item>
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
                                Add Person
                            </Button>
                        )}
                    </Form.Item>
                </Form>
        </>
    )
}

const getStyles = () => ({
    title: {
        borderWidth: 0.5,
        borderColor:'black',
        margin:10,
    }
});

export default AddContact
