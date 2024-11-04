import React from 'react'
import { useState,useEffect } from 'react';
import { Layout,Typography,Input,DatePicker,List,Button,Space,Card,Checkbox,notification } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
const {Header,Content} =Layout;
const {Title,Text}=Typography;
const App = () => {
  const [task,setTask] =useState('');
  const [Todo,setTodo]=useState([]);
  const[dueDate,setDueDate]=useState('');

  const addTodo=()=>{
    if(!task){
      notification.warning({message:"Empty task",  description:"Please Enter the task"});
       return;
    }
    const newtask={id:Date.now(),task,dueDate,completed:false};
    setTodo([newtask,...Todo]);
    setDueDate('');
    setTask('');
    notification.success({message:"task added successfully !"});
  };
  const removeTodo=(id)=>{
     setTodo(Todo.filter(todo => todo.id!==id));
     notification.destroy({message:"task removed successfully"});
  }

    const updateTodo=(id)=>{
      setTodo(Todo.map((todo)=>todo.id===id?{...todo ,completed:!todo.completed}:todo));
    }
  return (
    <div>
      <Layout style={{minHeight:'100vh'}}>
      <Header style={{backgroundColor: 'blue', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <Title level={1} style={{color: 'white', textAlign:'center'}}>
          TodoList
        </Title>
      </Header>
      <Content style={{padding:'20px',margin:'0 auto', minWidth:'50%'}}>
      <Space direction='vertical' style={{width:'100%'}}>
      <Card>
        <Space direction='vertical' style={{width:'100%'}}>
       <Input value={task} placeholder='Enter a task' onChange={(e)=>setTask(e.target.value)}>
       </Input>
       <DatePicker placeholder='Due date'   value={dueDate ? dayjs(dueDate) : null} onChange={(date)=>setDueDate(date?date.toDate():null)} style={{width:'100%'}}/>
       <Button type='primary' icon={<PlusOutlined/>} onClick={addTodo} block>Add Task</Button>
        </Space>
      </Card>
      <List bordered dataSource={Todo} renderItem={(todo)=>(
        <List.Item>
          <Space direction='vertical' style={{width:'100%'}}>
           <Checkbox checked={todo.completed} onChange={()=>updateTodo(todo.id)}>
            <Text delete={todo.completed}>{todo.task}</Text>
           </Checkbox>
           <Text>Due: {todo.dueDate ? dayjs(todo.dueDate).format('YYYY-MM-DD') : 'No due date'}</Text>
           <Button type='text' icon={<DeleteOutlined/>} onClick={()=>removeTodo(todo.id)} danger>Delete</Button>
          </Space>
        </List.Item>
  )}/>
      </Space>
      </Content>
      </Layout>
    </div>
  )
}

export default App
