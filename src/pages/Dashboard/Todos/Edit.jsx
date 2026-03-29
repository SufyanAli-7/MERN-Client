import { Col, Form, Row, Typography, Input, Button, DatePicker, Select } from "antd"
import { useEffect, useState } from "react"
import { useAuth } from "../../../context/Auth"
import { useNavigate, useParams } from "react-router-dom"
import dayjs from "dayjs"
const { Title } = Typography
const { Option } = Select

const initialState = {
  title: "",
  description: "",
  dueDate: null,
  priority: ""
}

const Edit = () => {
  const { user } = useAuth()
  const Navigate = useNavigate()
  const params = useParams()

  const [state, setState] = useState(initialState)
  const [isAppLoading, setIsAppLoading] = useState(false)
  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  useEffect(() => {
    const { id } = params
    const todos = JSON.parse(localStorage.getItem("todos")) || []
    const todo = todos.find(t => t.id === id)
    setState(todo)
  }, [params])

  const handleUpdate = () => {
    let { id, title, description, dueDate, priority,status,isCompleted } = state
    title = title.trim()
    description = description.trim()
    if (!title || !description || !dueDate || !priority) { return window.toastify("Please fill all the fields", "error") }
    const todo = { id, title, description, dueDate, priority,status,isCompleted }
    todo.updatedAt = new Date().getTime()

    console.log("state", state)
    console.log("todo", todo)

    setIsAppLoading(true)

    const todos = JSON.parse(localStorage.getItem("todos")) || []
    const updatedTodos = todos.map(Item => {
        if (Item.id === id) 
            return {...Item, ...todo}
        return Item
    }) 

    localStorage.setItem("todos", JSON.stringify(updatedTodos))

    setTimeout(() => {
      setIsAppLoading(false)
      window.toastify("Todo updated successfully", "success")
        Navigate("/dashboard/todos")
    }, 1000);
  }


  return (
    <main className="auth">
      <div className="container">
        <div className="card p-3">

          <div className="d-flex align-items-center justify-content-between mb-4">
            <Title level={2} className="mb-0">Update Todo</Title>
            <Button type="primary" size="small" onClick={() =>{ Navigate ("/dashboard/todos")}}>Todos</Button>
          </div>
          <Form layout='vertical'>
            <Row>
              <Col span={24}>
                <Form.Item label="Title" required>
                  <Input size='large' type="text" placeholder="Enter Title" name='title' value={state.title} onChange={handleChange} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Due Date" required>
                  <DatePicker size="large" className="w-100" placeholder="Select Due Date" value={state.dueDate ? dayjs(state.dueDate) : null} onChange={(obj, date) => setState(s => ({ ...s, dueDate: date }))} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Description" required>
                  <Input.TextArea size="large" placeholder="Enter Description" name='description' value={state.description} style={{ height: 100, resize: "none" }} onChange={handleChange} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Priority" required>
                  <Select size="large" placeholder="Select Priority" value={state.priority} onChange={(value) => setState(s => ({ ...s, priority: value }))}>
                    <Option value="low">Low</Option>
                    <Option value="medium">Medium</Option>
                    <Option value="high">High</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24} >
                <Button type="primary" size='large' block htmlType='submit' loading={isAppLoading} onClick={handleUpdate}>
                  Update Todo
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </main>
  )
}

export default Edit