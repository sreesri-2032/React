import {useState,useRef} from 'react'
import './App.css'

export default function App(){

    let currtodo=useRef(-1);
    let swaptodo=useRef(-1);
    let currinprog=useRef(-1);
    let swapinprog=useRef(-1);
    let currdone=useRef(-1);
    let swapdone=useRef(-1);

    // todo functionalities
    let [todotasks,setTodotasks]=useState([]);
    let [newtask,setnew]=useState("");
    let [todosearch,settodosearch]=useState('');
    
    function todoswap(task){
        if(swaptodo.current===currtodo.current && swapinprog.current!==-1){
            setinprogtasks([...inprogtasks,task]);
            let v=todotasks.filter((_,i)=>i!==currtodo.current);
            setTodotasks(v);
            swapinprog.current=-1;
        }
        else if(swaptodo.current===currtodo.current && swapdone.current!==-1){
            setdonetasks([...donetasks,task]);
            let t=todotasks.filter((_,i)=>i!==currtodo.current)
            setTodotasks(t);
            swapdone.current=-1;
        }
        else{
            let v=[...todotasks];
            let tmp=v[currtodo.current];
            v[currtodo.current]=v[swaptodo.current];
            v[swaptodo.current]=tmp;
            setTodotasks(v);
        }
    }
    function inputval(event){
        setnew(event.target.value);
    }
    function addtask(){
        if(newtask.trim()!==""){
            setTodotasks([...todotasks,newtask]);
            setnew("")
        }
    }
    function deletetodotask(idx){
        let t=todotasks.filter((task,i)=>idx!==i);
        setTodotasks(t);
    }

    //inprogress functionalities
    let [inprogtasks,setinprogtasks]=useState(['study']);
    let [inprogsearch,setinprogsearch]=useState('');

    function deleteinprogtask(idx){
        let t=inprogtasks.filter((task,i)=>i!==idx);
        setinprogtasks(t);
    }
    function inprogswap(task){
        if(currinprog.current===swapinprog.current && swapdone.current!==-1){
            setdonetasks([...donetasks,task]);
            let v=inprogtasks.filter((_,i)=>i!==currinprog.current);
            setinprogtasks(v);
            swapdone.current=-1;
        }
        else if(currinprog.current===swapinprog.current && swaptodo.current!==-1){
            setTodotasks([...todotasks,task]);
            let t=inprogtasks.filter((_,i)=>i!==currinprog.current);
            setinprogtasks(t);
            swaptodo=-1;
        }
        else{
            let v=[...inprogtasks];
            let tmp=v[currinprog.current];
            v[currinprog.current]=v[swapinprog.current];
            v[swapinprog.current]=tmp;
            setinprogtasks(v);
        }
    }

    // done functionalities
    let [donetasks,setdonetasks]=useState(['wake up']);
    let [donesearch,setdonesearch]=useState('');

    function deletedonetask(idx){
        let t=donetasks.filter((task,i)=>i!==idx);
        setdonetasks(t);
    }

    return(
        <body>
            {/* todo tags */}
            <div className='sections'>
                <h1>ToDo</h1>
                <div style={{margin:"0 auto"}}>
                    <input type="text" value={newtask} onChange={inputval} placeholder='Enter'/>
                    <button className='add' onClick={addtask}>Add</button>
                </div>
                <input style={{margin:"3px auto"}} type="text" 
                    placeholder='search' onChange={(e)=>settodosearch(e.target.value)}/>
                <div >
                    {todotasks.filter((task)=>{
                        return task.includes(todosearch);
                        }).map((task,i)=>
                        <div className="tasks"
                            key={i}
                            draggable
                            onDragStart={()=>currtodo.current=i}
                            onDragEnter={()=>swaptodo.current=i}
                            onDragEnd={()=>todoswap(task)}
                            >
                            {i+1}. {task}
                            <button className='task-buttons' 
                                onClick={()=>deletetodotask(i)}>delete</button>
                        </div>
                    )}
                </div>                
            </div>

            {/* inprogress tags */}
            <div className='sections'>
                <h1>InProgress</h1>
                <input style={{margin:"0 auto"}} type="text" placeholder='search' onChange={(e)=>setinprogsearch(e.target.value)}/>
                <div >
                    {inprogtasks
                    .filter((task)=>{
                        return task.includes(inprogsearch);
                    })
                    .map((task,i)=>
                        <div className='tasks'
                            key={i}
                            draggable
                            onDragStart={()=>currinprog.current=i}
                            onDragEnter={()=>swapinprog.current=i}
                            onDragEnd={()=>inprogswap(task)}
                            >
                            {i+1}.{task}
                            <button className='task-buttons' 
                                onClick={()=>deleteinprogtask(i)}>delete</button>
                        </div>
                    )}
                </div>
            </div>

            {/* done tags */}
            <div className='sections'>
                <h1>Done</h1>
                <input style={{margin:"0 auto"}} type="text" placeholder='search' onChange={(e)=>setdonesearch(e.target.value)}/>
                <div >
                    {donetasks.filter((task)=>{
                        return task.includes(donesearch);
                    }).map((task,i)=>
                        <div className='tasks'
                            draggable
                            onDragEnter={()=>swapdone.current=i}
                            key={i} >
                            {i+1}.{task}
                            <button className='task-buttons' 
                                onClick={()=>deletedonetask(i)}>delete</button>
                        </div>
                    )}
                </div>
            </div>
        </body>
    );
}