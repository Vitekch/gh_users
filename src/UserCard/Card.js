import UserAvatar from "./Avatar";
import React from "react";
import Repo from "./Repos";
import './Card.css';
import axios from "axios";

class UserCard extends React.Component{
    constructor(props){
        super(props);
        this.state={repos:[],page:1,repo_list:[]};
        this.Click_n=this.Click_n.bind(this);
        this.Click_p=this.Click_p.bind(this);
    }

    componentDidMount() {
        axios.get("https://api.github.com/users/"+this.props.user.login+"/repos?page=1&per_page=4")
        .then(res=>{
            const repos=res.data;
            this.setState({repos});
        });
    }
     Click_n(){
        let page=this.state.page;
        if(page<this.props.user.public_repos/4)
        page++;
        
        
        this.setState({page})
        axios.get("https://api.github.com/users/"+this.props.user.login+"/repos?page="+page+"&per_page=4")
        .then(res=>{
            const repos=res.data;
            this.setState({repos});
        });
      
    }
     Click_p(){
        
        let page=this.state.page;
        if(page>1)
        page--;
        this.setState({page})
        axios.get("https://api.github.com/users/"+this.props.user.login+"/repos?page="+page+"&per_page=4")
        .then(res=>{
            const repos=res.data;
            this.setState({repos});
        });
      
    }
    render(){
        let pg_n=this.state.page+1;
        if((pg_n-1)*4>=this.props.user.public_repos)
        pg_n='-'
        let pg_p=this.state.page-1;
        if(this.state.page===1)
            pg_p="-";
        console.log(this.state.repos)
        let repo_list="";
        if(this.state.repos)
        repo_list= this.state.repos.map((repo,index)=>{
        return(
        <div>
            <Repo repo_name={repo.name} repo_url={repo.html_url}/>
            <h4 style={{textAlign:'center', margin:'2px'}}>---------------------------</h4>
        </div>)});

        return(
            <div className="Card">
                <div className="Card_header">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6" style={{textAlign:"center"}}>
                                <UserAvatar avatar={this.props.user.avatar_url} avatar_width="150"/>
                            </div>
                            <div className="col-lg-6" style={{color:'#e0e9f0',textAlign:"left"}}>
                            <p><h2>{this.props.user.login}</h2></p>
                            <p>{this.props.user.name}</p>
                            <p><svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" fill='#e0e9f0'>
                                <path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path>
                                </svg> {this.props.user.public_repos}</p>
                            </div>
                        </div>
                    </div>
                   
                </div>
                <h2></h2>
                <div className="container">
                <h4 style={{textAlign:'center', margin:'2px'}}>---------------------------</h4>
                  {repo_list} 
                  <div className="row" style={{textAlign:'center'}}>
                    <div className="col-lg-12">
                    <button className="pag_btn"  onClick={this.Click_p}>{pg_p}  </button>
                    <b style={{fontSize:'26pt', margin:'10px'}}>{this.state.page}</b>
                      <button className="pag_btn"  onClick={this.Click_n}> {pg_n} </button>
                    </div>
                    
                  </div>
                </div>
            </div>
        )

    }


}

export default UserCard;