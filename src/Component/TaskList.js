import React from 'react'

const TaskList = (props) => {
    const {title, contentText, onClick} = props;
    return (
        <div className="task-list">
            <p className="task">{title}</p>
            <button onClick={onClick} className="task-des">{contentText}</button>
        </div>
    )
}

export default TaskList;
