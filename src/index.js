import React, {Component} from 'react'
import {render} from 'react-dom'
import App from './container/App'
import SnowDay from './components/SnowDay'
import FireAnimate from './components/FireAnimate'

const winHeight = window.innerHeight;
const winWidth = window.innerWidth;

class ChatWrap extends Component {
	constructor(props) {
		super(props)
		this.state = {
			
		}
	}

	componentDidMount(){
		let width = winWidth;
	    let height = winHeight;
	    let canvas = this.canvasNode;
	    SnowDay(canvas, width, height);
	    FireAnimate(canvas, width, height);
	}


	render(){
		return (<div className="chat-wrap" style={{width:winHeight, height:winHeight}}>
					<canvas className="canvas-content" ref={node => this.canvasNode = node} />
					<App/>
             </div>)
	}
}



render(<ChatWrap />,document.getElementById('app'))