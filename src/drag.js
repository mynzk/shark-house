import React, {Component} from 'react'
import {render} from 'react-dom'
import DragWrap from './container/DragWrap'

class ChatWrap extends Component {
	constructor(props) {
		super(props)
		this.state = {
			
		}
	}

	componentDidMount(){
	
	}


	render(){
		return (<div>
					<DragWrap/>
                </div>)
	}
}



render(<ChatWrap />,document.getElementById('app'))