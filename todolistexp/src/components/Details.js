import React, {Component} from 'react';

class Details extends Component {
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
        console.log('detail props', this.props)        
        const style = {
            fontWeight: this.state.hover ? 'bolder' : 'normal',
            textDecoration: this.state.done ? 'line-through' : 'none',
            cursor: 'pointer'
        }
        if(this.props.contents) {
            return (<li style={style}> {this.props.contents} </li>) 
        } else {
            return <li></li>
        }
    }
}
export default Details