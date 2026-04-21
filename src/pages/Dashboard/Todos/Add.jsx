import { Col, Form, Row, Typography, Input, Button, DatePicker, Select } from "antd"
import { useState } from "react"
import { useAuth } from "../../../context/Auth"
import { useNavigate } from "react-router-dom"
import axios from "axios"
const { Title } = Typography
const { Option } = Select

const initialState = {
  title: "",
  description: "",
  dueDate: null,
  priority: ""
}

const Add = () => {
  const { user } = useAuth()
  const Navigate = useNavigate()
  const [state, setState] = useState(initialState)
  const [isAppLoading, setIsAppLoading] = useState(false)
  const [image, setImage] = useState(null)

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleAdd = () => {
    let { title, description, dueDate, priority } = state
    title = title.trim()
    description = description.trim()
    if (!title || !description || !dueDate || !priority) { return window.toastify("Please fill all the fields", "error") }

    const todo = { title, description, dueDate, priority }

    const formData = new FormData()
    for(const key in todo) {formData.append(key, todo[key])}
    if (image) {formData.append("image", image)}

    setIsAppLoading(true)
    const token = localStorage.getItem("token")
    axios.post('http://localhost:8000/todos/create', formData, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
         const { status, data } = res
          if (status === 201) {
            Navigate("/dashboard/todos")
           return window.toastify(data.message, "success")
          }
      })
      .catch((error) => {
        console.error(error)
        window.toastify("Failed to add todo", "error")
      })
      .finally(() => {
        setIsAppLoading(false)
      })
  }


  return (
    <main className="auth">
      <div className="container">
        <div className="card p-3">

          <div className="d-flex align-items-center justify-content-between mb-4">
            <Title level={2} className="mb-0">Add Todo</Title>
            <Button type="primary" size="small" onClick={() =>{ Navigate ("/dashboard/todos")}}>Todos</Button>
          </div>
          <Form layout='vertical'>
            <Row>
              <Col span={24}>
                <Form.Item label="Title" required>
                  <Input size='large' type="text" placeholder="Enter Title" name='title' onChange={handleChange} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Due Date" required>
                  <DatePicker size="large" className="w-100" placeholder="Select Due Date" onChange={(obj, date) => setState(s => ({ ...s, dueDate: date }))} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Description" required>
                  <Input.TextArea size="large" placeholder="Enter Description" name='description' style={{ height: 100, resize: "none" }} onChange={handleChange} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Priority" required>
                  <Select size="large" placeholder="Select Priority" onChange={(value) => setState(s => ({ ...s, priority: value }))}>
                    <Option value="low">Low</Option>
                    <Option value="medium">Medium</Option>
                    <Option value="high">High</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
              <Form.Item label="Image">
                     <input type="file" accept="image/*" multiple={false} className="form-control" onChange={(e) => setImage(e.target.files[0])}/>
              </Form.Item>
              </Col>
              <Col span={24} >
                <Button type="primary" size='large' block htmlType='submit' loading={isAppLoading} onClick={handleAdd}>
                  Add Todo
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </main>
  )
}

export default Add