import React from "react";
import './Card.css';
import axios from "axios";
import UserCard from "./Card";
import preloader from './load.gif';
class GetInfoButton extends React.Component{
    constructor(props){
        super(props);
        this.state={loaded:false,user:{},user_repos:{},loading:false,page:1,user_fnd:false};
        this.Click=this.Click.bind(this);
    }

    async Click(){
        let name=document.getElementById("name_field");
        this.setState({loading:true});
        axios.get("https://api.github.com/users/"+name.value)
            .then(res=>{
                if(res.data.login){
                const user=res.data;
                this.setState({user});
                this.setState({user_fnd:true})
                name.value="";
                }
                else{
                    this.setState({user_fnd:false})
                }
  
                
            });
        
        this.setState({loaded:true});
        setTimeout(()=>this.setState({loading:false}),2000);
    }

    render(){
        let content;
       if(!this.state.loading&&this.state.loaded)
       {
            if(this.state.user_fnd)
            content=<UserCard user={this.state.user}/>;
            else
            content=<div></div>
       }
      
       else if(!this.state.loaded&&!this.state.loading)
       content=<div></div>;
       else
       content=<img className="preloader" src={preloader}/>

        return(
            <div>
            <header>
                
                <input id="name_field" type="text"/><br/>
                <button type="submit" className="get_btn" onClick={this.Click}><span>Получить информацию о пользователе </span></button>
                
            </header>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4">{content}</div>
                    <div className="col-lg-4"></div>
                </div>
            </div>

            </div>
        );


    }

}


export default GetInfoButton;