import { useState, useEffect } from 'react'
import deleteImage from '../assets/delete.png'
import editImage from '../assets/edit.png'

type TodoItemProps = {
    name: string;
    desc: string;
    index: number;
    modActive: boolean;
}

export default function Todo(): JSX.Element{
    const [isInput, setIsInput] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [desc, setDesc] = useState<string>('')
    const [todos, setTodos] = useState<TodoItemProps[]>([])
    const [change, setChange] = useState<boolean>(false)
    const localIndex = localStorage.getItem('index')
    if(!localIndex) localStorage.setItem('index', '0')
    const index: number = !localIndex ? 0 : +localIndex

    const addItem = (): void => {
        let updatedDesc = desc;
        let updatedName = name;

        if (desc.length < 1) updatedDesc = 'Без опису';
        if (name.length < 1) updatedName = 'Без назви';

        localStorage.setItem(`todo-${index}`, `${updatedName}!${updatedDesc}!false`);
        localStorage.setItem('index', (index+1)+"")

        setDesc(updatedDesc);
        setName(updatedName);

        setChange(!change)
    }

    const TodoItem = ({ name, desc, index, modActive }:TodoItemProps): JSX.Element => {
        if(modActive === undefined) modActive = true
        console.log('TodoItem render')
        const [isActive, setIsActive] = useState<boolean>(modActive)
        const [isEdit, setIsEdit] = useState<boolean>(false)
        const [newName, setNewName] = useState<string>(name)
        const [newDesc, setNewDesc] = useState<string>(desc)

        const deleteItem = ():void => {
            localStorage.removeItem(`todo-${index}`)
            setChange(!change)
        }

        const saveChanges = (updatedActive: boolean = isActive):void => {
            if (newName && newDesc) {
                console.log(updatedActive, modActive)
                localStorage.setItem(`todo-${index}`, `${newName}!${newDesc}!${updatedActive}`);
                setIsEdit(false);
                setChange(!change);
            }
        };
        return (
            <div className="todoitem">
                <div className={isActive ? "todoitem__circle active" : "todoitem__circle"} onClick={() => {
                    setIsActive((prevActive: boolean):boolean => {
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
        const loadedTodos: TodoItemProps[] = []
        for(let el in localStorage){
            if(el.includes('todo')){
                let index = +el.split('-')[1]
                const localEl = localStorage.getItem(el)
                if(localEl){
                    const [name, desc, active] = !localEl ? ["name", "desc", "active"] : localEl.split('!')
                    let modActive = active.includes('true')
                    loadedTodos.push({name, desc, index, modActive})
                }
            }
        }
        setTodos(loadedTodos)
    }, [change])
    console.log(todos)
    todos.sort((a,b) => a.index - b.index).reverse()
    return (
        <div className="todo__parent block">
            <div className="todo__list">
            {todos.map((todo, index) => (
                <TodoItem name={todo.name} desc={todo.desc} index={todo.index} key={todo.index} modActive={todo.modActive} />
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