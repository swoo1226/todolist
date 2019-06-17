import React, {Component} from 'react';
import './App.css';
import TodoList from './components/TodoList';
import Descript from './components/Descript';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todoItem: "",   
      todos: [{title: "", descripts: []}],
      currTitle: ""   
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCurrTitle = this.handleCurrTitle.bind(this);
    this.addDescript = this.addDescript.bind(this);
  }
  componentDidMount() {
    let handler = (responseBody) => {   //여기에서 서버로부터 받은 response 데이터를 state에 심어주고 있다.
      console.log(responseBody)
      let items = JSON.parse(responseBody)
      this.setState( {todos: this.state.todos.concat(items)} )
      console.log('didmount 후 fetch해서 정보 가져오는 곳', this.state.todos)
    }
    fetch('http://localhost:4000/allTodos')
    .then(function(header) {
      return header.text()            //http res body를 return 하라는 의미이다
    }).then(handler)
    // .then(function(responseBody) {  //JSON.stringify를 실행한 data가 보내질 것이다. server.js에서 app.get 부분에 코드로 인하여.
    //   let items = JSON.parse(responseBody)
    //   this.setState({ todos: items} )      //하지만 이렇게 하면 this binding이 안되므로 다른 방법으로 한다. fetch 전에 함수를 선언하여 사용.
    // })
  }

  //componentDidUpdate를 사용하면, descripts를 추가하고, setState => render => componentDidUpdate 시에, 추가한 내용의 todos state를 서버에 보낼 수 있을까?
  
  handleSubmit(e) {
    e.preventDefault()  //이것은 무엇인가
    let todo = this.state.todoItem
    let stringifiedItem = JSON.stringify({title: todo, descripts: []})
    this.setState({todos: this.state.todos.concat({title: todo, descripts: []})})
    fetch('http://localhost:4000/todo', {
      method: "POST", 
      body: stringifiedItem})
    console.log('submit 후 state', this.state)
  }
  handleChange(e) {
    console.log('핸들체인지')
    if(e.key === 'Enter') {
      this.setState({todoItem: e.target.value})
      e.target.value = '';
    }
    else if(e.keyCode === 27) {
      e.target.value = '';
    }    
  }
  handleCurrTitle(e) {
    this.setState({ currTitle: e.target.innerText });
  }
  addDescript(e) {
    if(e.key === 'Enter') {
    // let copiedState = this.state;  
    this.state.todos.forEach(function(el, i){
      // this를 app으로 인식하지 못함
      if(el.title === this.state.currTitle) {
        this.setState({todos: el.descripts.concat(e.target.value)})
        e.target.value = '';
      }
    })
    }
    else if(e.keyCode === 27) {
      e.target.value = '';
    } 
  }

  render() {
    console.log('render 후 state', this.state)
    // let state = this.state;  state 객체를 아예 통째로 복사해놓고 사용하면 편하다
    return (
      <div className="App">
        <div>Todo List</div>
        <div>
          <span>
            <form className='form' onSubmit={this.handleSubmit}>
              <input type='text' onKeyDown={this.handleChange} placeholder='Please Input Titles' className='inputbox'/>
              <input type='submit' style={{display: 'none'}} />
            </form>
          </span>
          <div>
            <TodoList className='titlelist' title={this.state.todos} handleCurrTitle={this.handleCurrTitle}/>
            <Descript 
            todos={this.state.todos} 
            currTitle={this.state.currTitle} 
            handleSubmit={this.handleSubmit} 
            handleChange={this.handleChange} 
            addDescript={this.addDescript}/>
          </div>
        </div>
      </div>
    );
  }
  
}

export default App;
