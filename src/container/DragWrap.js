import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import EasyDragSort from '../components/EasyDragSort.js';

import './dragbox.less';

export default class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        list: [{url: 'http://ww2.sinaimg.cn/large/7a8aed7bjw1exfffnlf2gj20hq0qoju9.jpg', key: 1},
               {url: 'http://ww1.sinaimg.cn/large/7a8aed7bgw1esahpyv86sj20hs0qomzo.jpg', key: 2},
               {url: 'http://ww1.sinaimg.cn/large/7a8aed7bgw1esxxi1vbq0j20qo0hstcu.jpg', key: 3},
               {url: 'http://ww1.sinaimg.cn/large/7a8aed7bgw1esxxiw20rej20qo0hstcp.jpg', key: 4},
               {url: 'http://ww1.sinaimg.cn/large/7a8aed7bgw1et80fw2p80j20qo0hsdj1.jpg', key: 5}
           ],
        curMoveItem: null
      }

      this.handleDragMove = this.handleDragMove.bind(this);
      this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  handleDragMove(data, from, to){
    this.setState({
      curMoveItem: to,
      list: data
    })
  }

  handleDragEnd(){
    this.setState({
      curMoveItem: null
    })
  }

  render() {


      return (
          <div className="box-wrap">
              <div className="text-wrap">
                 this is a log text this is a log text this is a log text this is a log text this is a log text
              </div>
             
              <EasyDragSort onDragEnd={this.handleDragEnd} onChange={this.handleDragMove} data={this.state.list} >
                
                  {this.state.list.map( (item, index) =>{
                    return <div className={this.state.curMoveItem === index? 'item active' : 'item'}
                      key={item.key}
                      onClick={()=> {
                        if(index===0){ return; }
                        let newItems = this.state.list.slice();
                        let item = newItems.splice(index, 1)[0];
                        newItems.splice(0, 0, item);
                        this.setState({list: newItems});
                      }}
                    ><img src={item.url} alt="" /></div>
                  })}
              </EasyDragSort>

          </div>
      )
  }
}

const render = () => ReactDOM.render(
  <App/>, document.getElementById('app')
);

render();

// hot-reload
if (module.hot) {
  module.hot.accept();
}