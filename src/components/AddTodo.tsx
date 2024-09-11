import { useEffect, useState } from "react";
import "./AppTodo.css";

const AddTodo = () => {

const [todos ,setTodos]= useState<any>([{
    id:1,
    title:"aa",
    status:"未着手",
    deadline:"2024/12/31",
    detail:"aaaaaaa"
}])

const [todoTitle ,setTodoTitle] =useState<any>("");
const [todoId ,setTodoId] =useState(todos.length+1);
// const [todoStatus,setTodoStatus] = useState("未着手")
const [todoDeadline,setTodoDeadline] = useState("")
const [todoDetail,setTodoDetail] = useState("")
const [editId, setEditId] = useState("");
const [newTitle, setNewTitle] = useState("")
const [newStatus,setNewStatus] = useState("")
const [newDeadline,setNewDeadline] = useState("")
const [newDetail,setNewDetail] = useState("")
const [filter, setFilter] = useState("未着手")
const [filteredTodos, setFilteredTodos] = useState([])



// 入力した内容をsetTodo〇〇に入れる
const handleAddFormChanges = (e:React.ChangeEvent<HTMLInputElement>)  =>
    setTodoTitle(e.target.value)
// const handleAddStatusChanges = (e:any)  =>
//     setTodoStatus(e.target.value)
const handleAddDeadlineChanges = (e:any)  =>
    setTodoDeadline(e.target.value)
const handleAddDetailChanges = (e:any)  =>
    setTodoDetail(e.target.value)

// 入力した内容を追加して、一覧に表示する
const handleAddTodo = () =>{
    setTodos([...todos,{id:todoId, title:todoTitle, status:"未着手", deadline:todoDeadline, detail:todoDetail}])
    setTodoId(todoId +1)
    setTodoTitle("");
    // setTodoStatus("")
    setTodoDeadline("")
    setTodoDetail("")
}

// 削除ボタン
const handleDeleteTodo = (targetTodo:string) => {
    setTodos(todos.filter((todo:string) => todo !== targetTodo))
}

// 編集画面切り替え
const [isEditable, setIsEditable] = useState(false)
const handleOpenEditForm =(todo:any) =>{
    setIsEditable(true)
    setEditId(todo.id)
    setNewTitle(todo.title)
    setNewStatus(todo.status)
    setNewDeadline(todo.deadline)
    setNewDetail(todo.detail)
};
// 編集画面での入力内容を反映
const handleEditFormChange = (e:any) => {
    setNewTitle(e.target.value)
};
const handleStatusChange = (e:any) => {
    setNewStatus(e.target.value)
};
const handleDeadlineChange = (e:any) => {
    setNewDeadline(e.target.value)
};
const handleDetailChange = (e:any) => {
    setNewDetail(e.target.value)
};

// 編集を保存ボタン　上記内容を一覧に反映
const handleEditTodo = () => {
    const newArray = todos.map((todo:any) =>
    todo.id === editId ? {...todo, title:newTitle,status:newStatus,deadline:newDeadline,detail:newDetail} :todo
)
    setTodos(newArray)

    setEditId("")
    setNewTitle("")
    setNewStatus("")
    setNewDeadline("")
    setNewDetail("")
    handleCloseEditForm()
}
// キャンセルボタン・編集画面切り替え
const handleCloseEditForm =() => {
    setIsEditable(false)
    setEditId("")
};

useEffect(() => {
    const filteringTodos = () => {
        switch (filter) {
            case 'notStarted':
                setFilteredTodos(todos.filter((todo:any) => todo.status === 'notStarted'))
            break
            case 'inProgress':
                setFilteredTodos(todos.filter((todo:any) => todo.status === 'inProgress'))
            break
            case 'done':
                setFilteredTodos(todos.filter((todo:any) => todo.status === 'done'))
            break
            default:
                setFilteredTodos(todos)
        }
    }
            filteringTodos()
},[filter,todos]);
  return (
    <>
    
    <div className="todoinput">
        
    {/* 編集画面 */}
    {isEditable ?(
    <div>
        <h2>タイトル</h2>
        <input 
        type="text"
        value={newTitle}
        onChange={handleEditFormChange}
        />
        <h3>ステータス</h3>
        <select
        value={newStatus}
        onChange={handleStatusChange}
        >
            <option value="notStarted">未着手</option>
            <option value="inProgress">進行中</option>
            <option value="done">完了</option>
        </select>
        <h3>期限</h3>
        <input
        type="date"
        value={newDeadline}
        onChange={handleDeadlineChange}
        />
        <h3>詳細</h3>
        <textarea 
        rows={3}
        cols={20}
        wrap="soft"
        className="detail"
        value={newDetail}
        onChange={handleDetailChange}
        />
        <div>
        <button className="ui inverted orange button" onClick={handleEditTodo}>編集を保存</button>
        <button className="ui button" onClick={handleCloseEditForm}>キャンセル</button>
        </div>

    </div>
    
    ):(
    <div>
        
        <h3>タイトル</h3>
        <input 
        type="text"
        value={todoTitle}  
        onChange = {handleAddFormChanges}      
        />
        {/* <h3>ステータス</h3>
        <select 
        value={filter}
        onChange = {(e) => setFilter(e.target.value)}
        
        >
            <option>未着手</option>
            <option>進行中</option>
            <option>完了</option>
        </select> */}
        <h3>期限</h3>
        <input
        type="date"
        value={todoDeadline}
        onChange={handleAddDeadlineChanges}
        
        
        />
        <h3>詳細</h3>
        <textarea 
        rows={3}
        cols={20}
        wrap="soft"
        className="detail"
        value={todoDetail}
        onChange={handleAddDetailChanges}
        />
        <div className="addbutton">
        <button className="ui inverted orange button" onClick={handleAddTodo}>追加</button>
        </div>


    </div> 
  

)}
  </div>
    {/* todolist */}
    <div className="todolist">
        <h2>TODO-LIST</h2>
        
        <table>
            <tr>
                <th>タイトル</th>
                <th>状況
                <select 
                value={filter}
                onChange = {(e) => setFilter(e.target.value)}
                >
            <option value="notStarted">未着手</option>
            <option value="inProgress">進行中</option>
            <option value="done">完了</option>
                </select>
                </th>
                <th>期限</th>
                <th></th>
            </tr>
            {filteredTodos.map((todo:any) => (
            <tr key={todo.id}>
                <td>{todo.title}</td>
                <td>{todo.status}</td>
                <td>{todo.deadline}</td>
                <td>
                <button className="ui inverted orange button" onClick={(() => handleOpenEditForm(todo))}>詳細・編集</button>
                <button className="ui button" onClick={(() => handleDeleteTodo(todo))}>削除</button>
                </td>
            </tr>
            ))}
        </table>
    </div>
    </>
  )
}

export default AddTodo