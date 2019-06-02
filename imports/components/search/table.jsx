import React from 'react';
import { ReactiveVar } from 'meteor/reactive-var'
import { withTracker } from 'meteor/react-meteor-data';
import { Input, Icon, Grid, Table, Menu, Header, Checkbox } from 'semantic-ui-react';
import { getObjProperty } from '../../helpers';
import { Loader } from '../loader';
import { _ } from 'meteor/underscore';

var searchQuery = new ReactiveVar();
var searching   = new ReactiveVar( false );

class Component extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      //checkboxes:{},
      dataSelected: [],
      rowsSelected:{}
    }
  }
  searching = ()=>(searching.get());
  
  getSearchQuery = ()=>(searchQuery.get())

  addFields = (row)=>{
    /*{_.each(this.props.fields, (element, index, list)=>(
        <Table.Cell>
          {index}
        </Table.Cell>))}*/
      
    return this.props.fields.map((field, index)=>(
      <Table.Cell key={index}>
          {getObjProperty(row,field)}
        </Table.Cell>
    ));
  }
  onRenderRow = (row, index)=>{
    //let checkboxName = `${this.props.name}-cbox-${row._id}`;
    //this.state.checkboxes[checkboxName] = false;
    //this.setState(this.state.checkboxes);
    //checked={this.state.checkboxes[checkboxName]}
    /*<Table.Cell textAlign='center'>
            <Checkbox className={checkboxName}  {...(this.state.checkboxes[checkboxName]==true?{checked:true}:{})}  />
        </Table.Cell>*/
    let rowName = `${this.props.name}-trow-${row._id}`;    
    let rowProps = {};
    if(this.state.rowsSelected[rowName]){
      rowProps.active=true;
    }
   // if()    
    return (
      <Table.Row 
        className={rowName}  
        key={index} style={{cursor:'pointer'}}
        onClick={(e)=>{ 
             
          this.onSelect(e, row); 
        }} 
        {...rowProps}
      >
        {this.addFields(row)}
      </Table.Row>
    )
  }
  onSearch = (e, data)=>{
    let value = data.value.trim();

    searchQuery.set( value );
    searching.set( true );

    //this.props.data = this.rows();
    //console.log(this.rows());
  }

  onSelect = (e, row)=>{
    //console.log(e.target.parent);
   // console.log(e.target.parentElement.className);
    /*let tempCheckboxes = this.state.checkboxes;
    tempCheckboxes[`${this.props.name}-cbox-${row._id}`]=true;
    this.setState({
      dataSelected:row,
      checkboxes:tempCheckboxes
    });
    console.log(tempCheckboxes);*/
    let rowName = `${this.props.name}-trow-${row._id}`;
    //let classname = e.target.parentElement.className;
    //if(classname.indexOf(rowName) == -1) return;

    let rowsSelected = this.state.rowsSelected;
      //console.log(this.props.name);
     // console.log(rowsSelected);
      
    

    if(!!rowsSelected[rowName]){
      delete rowsSelected[rowName];
      row=null;
    }else{
      if(!this.props.multiple){
        rowsSelected = {};
      }
      rowsSelected[rowName]=true;
    }
    this.setState({rowsSelected});
    if(!!this.props.onSelect) this.props.onSelect(row);
  }

  showResults = ()=>{
    if(this.props.loading){
      return (
        <Table.Row >
          <Table.Cell colSpan={this.props.columns}><Loader /></Table.Cell>
        </Table.Row>
      );
    }
    if(this.props.rows.length == 0){
      return (
        <Table.Row >
          <Table.Cell colSpan={this.props.columns}>no results</Table.Cell>
        </Table.Row>
      );
    }
    /*<Table.Row style={{cursor:'pointer'}} key={index} onClick={this.onSelect}>
        <Table.Cell textAlign='center'>
          <Checkbox className={`${this.props.name}-${row._id}`}/>
        </Table.Cell>
        <Table.Cell>
          <Icon name='address card outline' /> {row.accountNumber}
        </Table.Cell>
        <Table.Cell><Icon name='user' /> {row.user.username}</Table.Cell>
      </Table.Row>*/
      //console.log(this.props);
      this.state.checkboxes = {};
      //this.setState({checkboxes:{}});
    return this.props.rows.map((row, index)=> (this.props.onRenderRow && this.props.onRenderRow(row,index))||this.onRenderRow(row,index));
  }

  render(){
    
    const {
      name= 'search-table',
      title = '',
      placeholder='Search...',
      icon='search'
    } = this.props;
    //console.log(this.props);
    return (
      <div id={name}>
        <Grid >
          <Grid.Row>
            <Grid.Column>
              <Table celled striped>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell colSpan='3'>
                      <Menu secondary>
                        <Menu.Item fitted >
                          <b>{title}</b></Menu.Item>
                          <Menu.Menu position='right' >
                            <Menu.Item fitted>
                              <Input icon={icon} placeholder={placeholder} onChange={this.onSearch}  />
                            </Menu.Item>
                          </Menu.Menu>
                      </Menu>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.showResults()}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>  
      </div>
    )
  }
}

const SearchWithTable = withTracker((props)=>{
  //publicador de busqueda
  //colección
  //name (usado para identificarse internamente)
  //neurolink.subscriptions.search
  
  if(!props.publisher) throw new Meteor.Error('publisher-not-defined', "Must set the publisher that will be used to search");
  if(!props.collection) throw new Meteor.Error('collection-not-defined', "Must set the collection that will be used to search");

  
  //console.log(props);
  var handle = Meteor.subscribe( props.publisher , searchQuery.get(), () => {
    setTimeout( () => {
      searching.set( false );
    }, 300 );
  });

  return {
    loading: !handle.ready(),
    rows: props.collection.find({}).fetch()
  };
})(Component);

export default SearchWithTable;