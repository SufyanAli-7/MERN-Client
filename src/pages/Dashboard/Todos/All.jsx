import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons"
import { Typography, Button, Space, Table, Dropdown } from "antd"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
const { Title,Text } = Typography


const All = () => {
  const Navigate = useNavigate()
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos")) || []
    setTodos(todos.map(todo => ({ ...todo, key: todo.id })))
  },[])

  console.log("todos", todos)

  const handelDelete = (record) => {
    console.log("record", record)
    const filteredTodos = todos.filter(todo => todo.id !== record.id)
    setTodos(filteredTodos)
    localStorage.setItem("todos", JSON.stringify(filteredTodos))
     window.toastify("Todo deleted successfully", "success")
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render: createdAt => <Text>{dayjs(createdAt).format("ddd DD-MMM-YYYY , hh:mm:ss A")}</Text>
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      render: dueDate => <Text>{dayjs(dueDate).format("ddd DD-MMM-YYYY")}</Text>
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      render: priority => {
        let color = "green"
        if (priority === "high") {
          color = "red"
        } else if (priority === "medium") {
          color = "orange"
        }
        return <span className="text-capitalize" style={{ color }}>{priority}</span>
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Dropdown menu={{
          items:[
            {
              label:"Edit",
              key:"edit",
              icon:<EditOutlined style={{color:"blue"}} onClick={() => { Navigate(`/dashboard/todos/edit/${record.id}`) }} />
            },
            {
              label:"Delete",
              key:"delete",
              icon:<DeleteOutlined style={{color:"red"}} onClick={() => {handelDelete(record)}} />
            }
          ]
        }} trigger={'click'}>
          <Button className="border-0" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <main className="container py-5">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <Title level={2} className="mb-0">Todos</Title>
        <Button type="primary" size="small" onClick={() => { Navigate("/dashboard/todos/add") }}>Add Todo</Button>
      </div>
      <Table rowKey="id" columns={columns} dataSource={todos} />
    </main>
  )
}

export default All