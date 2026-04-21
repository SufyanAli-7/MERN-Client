import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons"
import { Typography, Button, Space, Table, Dropdown, Image } from "antd"
import axios from "axios"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
const { Title,Text } = Typography


const All = () => {
  const Navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [todos, setTodos] = useState([])

  useEffect(() => {
    setIsLoading(true)
        const token = localStorage.getItem("token")
        axios.get('http://localhost:8000/todos/all', { headers: { Authorization: `Bearer ${token}` } })
          .then((res) => {
             const { status, data } = res
              if (status === 200) {
                const { todos } = data
                setTodos(todos.map(todo => ({ ...todo, key: todo.id })))
              }
          })
          .catch((error) => {
            console.error(error)
            window.toastify("Failed to fetch todos", "error")
          })
          .finally(() => {
            setIsLoading(false)
          })     
  },[])

  const handelDelete = (todo) => {
    const { id } = todo
    const token = localStorage.getItem("token")
    axios.delete(`http://localhost:8000/todos/single/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
         const { status } = res
         if (status === 200) {
           window.toastify("Todo deleted successfully", "success")
           const filteredTodos = todos.filter(t => t.id !== id)
           setTodos(filteredTodos)
         }
      })
      .catch((error) => {
        console.error(error)
        window.toastify("Failed to delete todo", "error")
      })
  }

  const columns = [
    {
      title: 'Image',
      dataIndex: 'imageURL',
      render: imageURL => imageURL ? <Image src={imageURL} className="rounded-circle " width={64} height={64} /> : <Text type="secondary">No Image</Text>
    },
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
      <Table rowKey="id" columns={columns} dataSource={todos} loading={isLoading} />
    </main>
  )
}

export default All