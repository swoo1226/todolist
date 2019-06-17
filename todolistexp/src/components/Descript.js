import React, {Component} from 'react';  
import Details from './Details'

class Descript extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        if(this.props.currTitle === "") {   //선택된 title로 인하여, app의 this.state.currTitle이 바뀌고,
            //바뀐 값을 통하여 Descript 부분이 render 되도록 하자
            return <span></span>
            
        } else {
            //App의 todos state의 currTitle과 같은 element에서 descripts만 빼내어 map으로 render해주어야 한다.
            let descriptArr = [];
            const descripts = this.props.todos.map((element) => {
                if(element.title === this.props.currTitle) {
                    for(let i = 0; i < element.descripts.length; i++) {
                        descriptArr.push(<Details
                            className='details' 
                            key={element.title + Math.random()}
                            contents={element.descripts[i]}/>)
                    }
                } 
            })
        return (    //여기의 textbox에 입력한 애가, currTitle의 descripts에도 추가되고, update 된 정보가 server로도 넘어가야 한다.
            <div className="descript">
                <form className='form'>
                    <input type='text' onKeyDown={this.props.addDescript} placeholder='Add your todos!' className='inputbox'/>
                    <input type='submit' style={{display: 'none'}} />
                </form>
                <span>
                    <ul className="titles"> {descriptArr} </ul>
                </span>
            </div>
            )
        }
    }
}

export default Descript;

// onSubmit={props.handleSubmit}