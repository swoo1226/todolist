import React, {Component} from 'react';
import TodoListEntry from './TodoListEntry';
// import './TodoList.css';

class TodoList extends Component {
    //App으로부터 받은 props에 일정에 대한 정보가 있을 시에, 해당 정보를 사용하여 Entry render 실시
   constructor(props) {
       super(props)
    }
    
    render() {
        console.log('app state에서 정보 내려받는 곳', this.props.title)
        if(this.props.title.length > 0) {
        const title = this.props.title.map((element) => 
            <TodoListEntry
            className='titlelist' 
            key={element.title + Math.random()}
            title={element.title} 
            handleCurrTitle={this.props.handleCurrTitle}
            />)
            // console.log('title은?', title)
        return (<span><ul className="titles"> {title} </ul></span>)
        } else {
            return <ul></ul>
        }
    }
}
export default TodoList;