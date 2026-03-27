import { Typography, Button, Space, Table } from "antd"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
const { Title,Text } = Typography


const All = () => {
  const Navigate = useNavigate()
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos")) || []
    setTodos(todos)
  }, [])

  console.log("todos", todos)
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
        <Space size="medium">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
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