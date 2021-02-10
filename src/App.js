import React, { Component } from 'react';
import './App.css';
import axios from "axios";

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      title: 'Write something',
      act: 0,
      index: '',
      datas: []
    }
  } 

  componentDidMount(){
    this.refs.name.focus();
  }

  fSubmit = (e) =>{
    e.preventDefault();
    console.log('try');

    let datas = this.state.datas;
    let name = this.refs.name.value;
    

    if(this.state.act === 0){   //new
      let data = {
        name
      }
      datas.push(data);
    }else{                      //update
      let index = this.state.index;
      datas[index].name = name;
      
    }    

    this.setState({
      datas: datas,
      act: 0
    });

    this.refs.myForm.reset();
    this.refs.name.focus();
  }
  handleSubmit = item => {
        this.toggle();
        if (item.id) {
          axios
            .put(`http://localhost:8000/api/apps/${item.id}/`, item)
            .then(res => this.refreshList());
          return;
        }
        axios
          .post("http://localhost:8000/api/app/", item)
          .then(res => this.refreshList());
      };

   

  render() {
    let datas = this.state.datas;
    return (
      <div className="App">
        <h2>{this.state.title}</h2>
        <form ref="myForm" className="myForm">
          <input type="text" ref="name" placeholder="write something" className="formField" />
          <button onClick={(e)=>this.fSubmit(e)} className="myButton">submit </button>
        </form>
        <pre>
          {datas.map((data, i) =>
            <li key={i} className="myList">
              {i+1}. {data.name}
              
            </li>
          )}
        </pre>
      </div>
    );
  }
}

export default App;