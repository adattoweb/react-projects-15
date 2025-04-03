import { useState, useEffect } from 'react'
import deleteImage from '../assets/delete.png'
import editImage from '../assets/edit.png'

export default function Todo(){
    const [isInput, setIsInput] = useState(false)
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [todos, setTodos] = useState([])
    const [change, setChange] = useState(false)
    if(localStorage.getItem('index') === null) localStorage.setItem('index', '0')
    const index = localStorage.getItem('index')

    const addItem = () => {
        let updatedDesc = desc;
        let updatedName = name;

        if (desc.length < 2) updatedDesc = 'Без опису';
        if (name.length < 2) updatedName = 'Без назви';

        localStorage.setItem(`todo-${index}`, `${updatedName}!${updatedDesc}!false`);
        localStorage.setItem('index', +index +1)

        setDesc(updatedDesc);
        setName(updatedName);

        setChange(!change)
    }

    const TodoItem = (props) => {
        console.log('TodoItem render')
        const {name, desc, id, active = false} = props;
        const [isActive, setIsActive] = useState(active)
        const [isEdit, setIsEdit] = useState(false)
        const [newName, setNewName] = useState(name)
        const [newDesc, setNewDesc] = useState(desc)

        const deleteItem = () => {
            localStorage.removeItem(`todo-${id}`)
            setChange(!change)
        }

        const saveChanges = (updatedActive = isActive) => {
            if (newName && newDesc) {
                console.log(updatedActive, active)
                localStorage.setItem(`todo-${id}`, `${newName}!${newDesc}!${updatedActive}`);
                setIsEdit(false);
                setChange(!change);
            }
        };
        return (
            <div className="todoitem">
                <div className={isActive ? "todoitem__circle active" : "todoitem__circle"} onClick={() => {
                    setIsActive((prevActive) => {
                        const updatedActive = !prevActive;
                        saveChanges(updatedActive);
                        return updatedActive; 
                    });
                }}></div>
                <div className="todoitem__text">
                    {isEdit ?
                    <div className='todoitem__inputs'>
                        <input type="text" placeholder='Назва' value={newName} onChange={(e) => setNewName(e.target.value)}/>
                        <input type="text" placeholder='Опис' value={newDesc} onChange={(e) => setNewDesc(e.target.value)}/>
                        <div className="todomenu__button" onClick={() => saveChanges()}>Зберегти</div>
                    </div>
                        : 
                    <>
                        <h3>{newName}</h3>
                        <p>{newDesc}</p>
                    </>
                    }
                </div>
                <div className="todoitem__menu">
                    <img src={deleteImage} alt="delete" onClick={() => deleteItem()}/>
                    <img src={editImage} alt="edit" onClick={() => setIsEdit(!isEdit)}/>
                </div>
            </div>
        )
    }
    useEffect(() => {
        const loadedTodos = []
        for(let el in localStorage){
            if(el.includes('todo')){
                let id = el.split('-')[1]
                if(localStorage.getItem(el)){
                    const [name, desc, active] = localStorage.getItem(el).split('!')
                    let modActive = active.includes('true')
                    loadedTodos.push({name, desc, modActive, id})
                }
            }
        }
        setTodos(loadedTodos)
    }, [change])
    todos.sort((a,b) => a.id - b.id).reverse()
    return (
        <div className="todo__parent block">
            <div className="todo__list">
            {todos.map((todo, index) => (
                <TodoItem name={todo.name} desc={todo.desc} id={todo.id} key={todo.index} active={todo.modActive} />
            ))}
            </div>
            <div className="todomenu">
                <p onClick={() => setIsInput(!isInput)}>+</p>
                {isInput &&
                <div className="todomenu__inputs">
                    <input type="text" placeholder='Назва' onChange={(e) => setName(e.target.value)} value={name} />
                    <input type="text" placeholder="Опис" onChange={(e) => setDesc(e.target.value)} value={desc}/>
                    <div className="todomenu__button" onClick={() => addItem()}>Створити</div>
                </div>}
            </div>
        </div>
    )
}