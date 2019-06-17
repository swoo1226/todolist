import React, {Component} from 'react';
// import './TodoListEntry.css';

class TodoListEntry extends Component {
    constructor(props) {
        super(props)
        this.state= {
            done: false,
            hover: false
        }
    }

    onListItemOver() {
        this.setState({
            hover: !this.state.hover
        });
    }
    onListItemOut() {
        this.setState({
            hover: !this.state.hover
        });        
    }
   
    render() {
        
        const style = {
            fontWeight: this.state.hover ? 'bolder' : 'normal',
            textDecoration: this.state.done ? 'line-through' : 'none',
            cursor: 'pointer'
        }
        if(this.props.title) {
            return (<li style={style} onMouseOver={this.onListItemOver.bind(this)} onMouseOut={this.onListItemOut.bind(this)} onClick={this.props.handleCurrTitle}> {this.props.title} </li>) 
        } else {
            return <li style={{display: 'none'}}></li>
        }
    }
    
}
export default TodoListEntry;