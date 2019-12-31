import React from 'react'
import Wrapper from '../wrapper/Wrapper'
import Card from './Card'
import SearchCard from './SearchCard'
import axios from 'axios'
class Test extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            person:[],
            person2: [],
            isLogin:'1',
            myData: '',
            title: ''
        }
        this.getall = this.getall.bind(this);
       this.getsearch = this.getsearch.bind(this)
        //this.handleChange = this.handleChange.bind(this);
    }

    async changeSearch(title){
        await this.setState({
          title
        })
        try{ 
          await this.getsearch()
        }
        catch(error)
        {
          console.log(error);
        }
        console.log(this.state.person);
      }

      getsearch() {
        var token = localStorage.getItem('Authorization');
        axios.defaults.headers.common['Authorization'] = token;
        axios.get(`http://3.82.228.249:2000/myhire/search/?skill=${this.state.title}`)
            .then(async res => {
                const persons = await res.data.result
                await this.setState({ 
                    person: persons 
                })
            })
        }
    componentDidMount(){
        var token = localStorage.getItem('Authorization');
        axios.defaults.headers.common['Authorization'] = token;
        
        let login = localStorage.getItem('Login');
        if(login == 0){
            this.setState({
                isLogin: '0'
            });
        }
        this.getall();
        this.getMyData();
    }

    async getall() {
        try{
          axios.get('http://localhost:3000/engineer/read')
            .then(res => {
              const persons = res.data;
              this.setState({ person: persons });
            })
          }catch(error) {
            console.log(error);
          }
    }

    async getMyData(){
        try{
          var token = localStorage.getItem('Authorization');
            axios.defaults.headers.common['Authorization'] = token;
          const profile = await axios.get('http://localhost:3000/myhire/by')
          console.log(profile.data.result[0]);
          
          this.setState({ 
            myData: profile.data.result[0]
         });
         console.log(this.myData.name);
         this.setState({name: this.myData.name})
        }catch(error) {
            this.setState({name: ''})
            console.log(error);
        }
      }

    render(){
        return(
            <Wrapper name={this.state.name} changeSearch={this.changeSearch.bind(this)} title={this.state.title} home={'1'}>
                
            <div className="container">
                <div className="row bg-primary" style={{marginTop : 100}}>
                    {/* <SearchCard title={this.state.title}/> */}
                    
                    {
                        this.state.person.map((person) => {
                            return(
                                <Card
                                    id = {person.id}
                                    name={person.name}
                                    photo={(person.photo === null)?'default.png':person.photo}
                                    skill={person.skill}
                                    profesion={person.profesion}
                                    project={person.project}
                                    rate={person.rate}
                                    id={person.created_by}
                                />                                    
                                )
                            })
                        }

                </div>
            </div>
      </Wrapper>
        )
    }
}

export default Test;