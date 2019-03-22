import React, { Component } from 'react';
import './App.css';
import {TextField, Tabs, Tab, Button} from '@material-ui/core';
import {Table} from 'reactstrap';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';



class App extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleMnameClick = this.handleMnameClick.bind(this);
    this.onGridReady = this.onGridReady.bind(this);
    this.state={
      queryresults: [],
      results: [],
      query: '',
      name: '',
      age: '',
      salary: '', 
      value: 0,
      deletequery: '',
      mname: '',
      emplist: [],
      manager_id: ''
      
      
    };

    this.state={
      columnDefs: [

        {
          headerName: "Manager Details",
          marryChildren: true,
          children: [
            {
              headerName: "ManagerId", field: "manager_id", minWidth: 10    
            },
            {
              headerName: "Manager Name", field: "manager_name",cellRenderer: 'agGroupCellRenderer', minWidth: 140,
              cellRendererParams: {
                suppressCount: true
               }
            }
          ]
        },
        {
          headerName: "Employee Details",
          marryChildren: true,
          children: [
            {
              headerName: "Employee Id", field:"id", filter: "agNumberColumnFilter", minWidth: 10
            },
            {
              headerName: "Name", field: "name", minWidth: 10, filter: "agTextColumnFilter", cellRenderer: "agGroupCellRenderer"
              , suppressSizeToFit : true
            },
            {
              headerName: "Age", field: "age",  sortable: "true", minWidth: 40
            },
            {
              headerName: "Salary", field: "salary", sortable: "true",
              filter: "agNumberColumnFilter",
    
              cellStyle: function(params){
                if(params.value>22000){
                  return {color: 'red'}
                }else{
                  return null;
                }
    
                
              }
            },
            {
              headerName: "Office Number", field: "office_no"
            },
            {
              headerName: "Mobile Number", field: "mbl_no"
            }
          
          ]
        }
        

       
      ],

      defaultColDef: {
        resizeable: true,
        sortable: true
      },
      /*
      rowData: [
        {
          manager_name: "amey", employees: [
            {manager_id: 1, manager_name: "keshav"}, {manager_id:2, manager_name:"nitin"}
          ]
        },
        {
          manager_name: "vishal", employees: [
             {manager_id: 3, manager_name: "ketan"}, {manager_id:2, manager_name:"swaraj"}
          ]
        }
      ],

      
      gridOptions: 
      {
        api: {
          setRowData: ''
        },
        rowData: ''
      },*/
      

      getNodeChildDetails: function getNodeChildDetails(rowItem) {
        //console.log(rowItem);     // this returns data from the fetch mgr details
        if (rowItem.employees) {
          //console.log(rowItem.employees);
          return {
            group: true,
            expanded: true,
            children: rowItem.employees,
           // key: rowItem.manager_id,
            
          };
          
        } 
       else if(rowItem.contacts){
        console.log(rowItem.contacts);
        //console.log(rowItem.manager);
          return{
            group: true,
            expanded: false, 
            children: rowItem.contacts,
            key: rowItem.contacts.contact_id,

          };
  
       }
       else{
         return null;
       }
      }
    }

  }



  onGridReady(params){
    this.gridApi = params.api;
    this.gridColumnApi = params.api;

    this.gridApi.sizeColumnsToFit();

    const httpRequest = new XMLHttpRequest();
    const updateData = data => {
      this.setState({ rowData: data });
    };

    httpRequest.open(
      "GET",
      "http://localhost:8080/employees/mgrs/"
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        updateData(JSON.parse(httpRequest.responseText));
      }
    };
    

  }

   handleMnameClick(event){
  const mgr = event.target.name
   this.setState({
     mname: mgr
   });
   fetch(`http://localhost:8080/employees/emps/${mgr}`)
   .then(res=> res.json())
   .then(data=>{
     this.setState({
       emplist: [
        <Table>
          <thead>
            <tr>
              <td>Employee Id</td>
              <td>Name</td>
              <td>Salary</td>
              <td>Age</td>
            </tr>
          </thead>
          <tbody>
            {data.map(d=>(
              <tr>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.salary}</td>
                <td>{d.age}</td>
              </tr>
            ))}    
          </tbody>
        </Table>
       ]
     })
   })
  

  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleClick(){
    const query = this.state.query;
      await fetch(`http://localhost:8080/employees/emp/${query}`)
      .then(res => res.json())
      .then(data => {
            console.log(data);
            if(data.message){
              this.setState({
              queryresults: [<h5>{data.message}</h5>]
            });
            }else{
              this.setState({
                queryresults: [ 
  
                  <Table striped hover>
                  <thead variant="thead-dark">
                  <tr>
                  <td><strong>Id</strong></td>
                  <td><strong>Name</strong></td>
                  <td><strong>Age</strong></td>
                  <td><strong>Salary</strong></td>
                  <td><strong>ManagerId</strong></td>
                  <td><strong>Manager Name</strong></td>
                  
                  </tr>
                  </thead>
                  <tbody>
                   
                      <tr>
                        <td>{data.id}</td>
                        <td>{data.name}</td>
                        <td>{data.age}</td>
                        <td>{data.salary}</td>
                        <td>{data.manager.manager_id}</td>
                        <td>{data.manager.manager_name}</td>

                      </tr>
                    
                  </tbody>
                </Table>
                
                ]
              }
              );
            }
          }
         
            )
          .catch(function(data){
            console.log(data.message);
            this.setState({
              queryresults: [<h5>{data.message}</h5>]
            });
          })

            /*.catch(res => {
              if(res.status===404){
                alert("Employee record not found");
              }
            }) 
          */
   
    
            
  }



  componentDidMount(){
    /*fetch("http://localhost:8080/employees/mgrs/")
    .then(res => res.json())
    .then(rowData => this.setState({rowData}))
    
    /*
    .then(data => {
      console.log(data);
      //console.log(data.map(d => d.name)
      for(let e=0;e<=data.length-1;e++){
        for(let j=0;j<=data[e].length-1;j++){
          console.log(data[e][j]);
        }
      }

      this.setState({
        results: [
        
          <Table>
          <thead>
            <tr>
              <td>Manager Id</td>
              <td>Manager Name</td>
            </tr>
          </thead>
          
          <tbody>
           {data.map(d=>(
             <tr>
               <td>{d.manager_id}</td>
               <td><a href="#"  onClick={this.handleMnameClick} name={d.manager_name}>{d.manager_name}</a></td>
             </tr>
           ))}
          </tbody>
        </Table>
        
         
        ]
      });
    });*/

  }


  handleCreateClick(event){

    fetch("http://localhost:8080/employees/addemp", {method: "POST", body: JSON.stringify(
      {
        name: this.state.name,
        age: this.state.age,
        salary: this.state.salary,
        manager: {
          manager_id: this.state.manager_id
       }
       
      

      }
    ), headers: {
      "content-type": "application/json ; charset = UTF-8"
    }})
    .then(res => {
      if(res.status===200){
        alert("Employee record added successfully");
      }
      res.json();
    })
    .then(data => {
      console.log(data);
      this.setState({
        queryresults: [{data}]
      })
    })
      
  }

  handleDeleteClick(event){
    const deletequery = this.state.deletequery;
    fetch(`http://localhost:8080/employees/delemp/${deletequery}`, {method: "DELETE"})
    .then(res => {
      if(res.status===200){
        alert(`Employee with id ${deletequery} deleted `);
      }
    })
  }


  handleTabChange=(event, value) => {
    this.setState({value});
    this.setState({
      queryresults: []
    });
  }

  


  render(){
    const queryresults = this.state.queryresults;
    const results = this.state.results;
    const query = this.state.query; 
    const name = this.state.name;
    const age = this.state.age;
    const salary = this.state.salary;
    const value = this.state.value;
    const deletequery = this.state.deletequery;
    const mname = this.state.mname;
    const emplist = this.state.emplist;
    const manager = this.state.manager_id;

    
    return (


        <div className="App">

        
        <Tabs value = {value} onChange={this.handleTabChange}>
          <Tab label = "Employee Details"/>
          <Tab label = "Create" />
          <Tab label = "Delete" />
        </Tabs>

        <div style={{ width: "100%", height: "100%" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ overflow: "hidden", flexGrow: "1" }}>
        
        <div
          style={{
            boxSizing: "border-box",
            height: "115",
            width: "90%",
            borderStyle: "solid",
            borderWidth: "thin"

          }}
          className="ag-theme-balham"
          >
          <AgGridReact
            rowData = {this.state.rowData} columnDefs = {this.state.columnDefs} 
            getNodeChildDetails = {this.state.getNodeChildDetails}
            onGridReady = {this.onGridReady}
            pagination = {true}>
         </AgGridReact>
        
          </div>
        </div>
        </div>
        </div>
        

        {value === 0 && <div>


          <h5>Enter an employee id</h5> 
          <TextField label = "Employee Id" name="query" value={query} onChange = {this.handleChange}/><br></br><br></br>
          <Button variant="outlined" color = "primary" onClick = {this.handleClick}>Search</Button><br></br><br></br>
          {queryresults.length > 0 && <div><h5>Your query returned <br></br></h5>{queryresults}</div>}
          
        </div>} 
        
        
        
        
        {value === 1 && <div>
          <h5>Add a new Employee</h5>
          <h5>Name</h5><TextField label = "Name" name="name" value={name} onChange = {this.handleChange} />
          <h5>Age</h5><TextField label = "Age" name="age" value={age} onChange = {this.handleChange} />
          <h5>Salary</h5><TextField label = "Salary" name="salary" value={salary} onChange = {this.handleChange} />
          <h5>Manager Id</h5><TextField label = "ManagerId" name="manager_id" value={manager} onChange = {this.handleChange} />

          <br></br><br></br>
          <Button variant = "outlined" color = "primary" onClick = {this.handleCreateClick}>Create</Button><br></br><br></br>
         
        </div>}

        {value === 2 && <div>
          <h5>Delete an employee</h5>
          <TextField label = "Employee Id" name="deletequery" value={deletequery} onChange = {this.handleChange}/><br></br><br></br>
          <Button variant="outlined" color = "primary" onClick = {this.handleDeleteClick}>Delete</Button><br></br><br></br>


        </div>}
       

        </div>
        
      );
      
   

    
    
  }
  
}


export default App;
