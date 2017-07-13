'use strict'
import React from 'react'
import {render} from 'react-dom'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Form, FormGroup, Button, Panel } from 'react-bootstrap'

let cols1 = [
  { key: 'person', label: 'Person' },
  { key: 'language', label: 'Language' }
]

let cols2 = [
  { key: 'person', label: 'Person' },
  { key: 'company', label: 'Company' }
]

let cols3 = [
  { key: 'person', label: 'Person' },
  { key: 'languages', label: 'Languages' },
  { key: 'company', label: 'Company' }
]

let data1 = [
  { id: 1, person: 'Simon', language: 'Haskell' },
  { id: 2, person: 'Simon', language: 'C--' },
  { id: 3, person: 'James', language: 'Java' },
  { id: 4, person: 'Anders', language: 'C#' },
  { id: 5, person: 'Anders', language: 'Delphi' },
  { id: 6, person: 'Matz', language: 'Ruby' },
  { id: 6, person: 'Rich', language: 'Clojure' },
  { id: 7, person: 'Guido', language: 'Python' },
  { id: 8, person: 'Philip', language: 'Links' },
  { id: 9, person: 'Guy', language: 'Scheme' },
  { id: 10, person: 'Alan', language: 'Smalltak' },
  { id: 11, person: 'Joe', language: 'Erlang' },
  { id: 12, person: 'Brendan', language: 'JavaScript' },
  { id: 13, person: '_why', language: 'Ruby' },
  { id: 14, person: 'Brendan', language: 'Rust' },
  { id: 15, person: 'Philip', language: 'Haskell' },
  { id: 16, person: '_why', language: 'Potion' },
  { id: 17, person: 'Guy', language: 'Fortress' }
]

let data2 = [
  { id: 1, person: 'Simon', company: 'Microsoft' },
  { id: 2, person: 'James', company: '' },
  { id: 3, person: 'Anders', company: 'Microsoft' },
  { id: 4, person: 'Matz', company: 'NACL' },
  { id: 5, person: 'Rich', company: '' },
  { id: 6, person: 'Guido', company: 'Google' },
  { id: 7, person: 'Guy', company: 'Oracle' },
  { id: 8, person: 'Alan', company: 'VRI' },
  { id: 9, person: 'Joe', company: 'Ericsson' },
  { id: 10, person: 'Brendan', company: 'Mozilla' },
  { id: 11, person: 'Philip', company: 'University of Edinburgh' },
  { id: 12, person: '_why', company: '' }
]

let data3 = join(data1, data2)

function join(data1, data2) {
  let newObj = {}
  let sortedArr = []
  for (let i = 0; i < data1.length; i++) {
    if (!newObj[data1[i].person]) {
      newObj[data1[i].person] = {}
      newObj[data1[i].person].person = data1[i].person
      newObj[data1[i].person].language = data1[i].language
    } else {
      newObj[data1[i].person].language = newObj[data1[i].person].language + ', ' + data1[i].language
    }
  }
  for (let i = 0; i < data2.length; i++) {
    newObj[data2[i].person].company = data2[i].company
  }
  let sortedKeysArray = Object.keys(newObj).sort()
  for (let x = 0; x < sortedKeysArray.length; x++) {
    sortedArr.push({
      id: x + 1,
      person: sortedKeysArray[x],
      languages: newObj[sortedKeysArray[x]].language,
      company: newObj[sortedKeysArray[x]].company
    })
  }

  return sortedArr
}

let Table = React.createClass({
  render: function() {
    var headerComponents = this.generateHeaders(),
      rowComponents = this.generateRows()

    return (
      <table>
        <thead> {headerComponents} </thead>
        <tbody> {rowComponents} </tbody>
      </table>
    )
  },

  generateHeaders: function() {
    var cols = this.props.cols  // [{key, label}]

    // generate our header (th) cell components
    return cols.map(function(colData) {
      return <th key={colData.key}> {colData.label} </th>
    })
  },

  generateRows: function() {
    var cols = this.props.cols,  // [{key, label}]
      data = this.props.data

    return data.map(function(item) {
      // handle the column data within each row
      var cells = cols.map(function(colData) {
        // colData.key might be "firstName"
        return <td> {item[colData.key]} </td>
      })
      return <tr key={item.id}> {cells} </tr>
    })
  },

  handleClick: function() {
    this.props.showJoinTable = true
  }
})

let ButtonLogic = React.createClass({
  getInitialState: function() {
    return {
      showJoinTable: false,
      buttonText: 'Join Table'
    }
  },
  onClick: function() {
    if (this.state.showJoinTable === false) {
      this.setState({
        showJoinTable: true,
        buttonText: 'Hide Joined Table'
      })
    } else {
      this.setState({
        showJoinTable: false,
        buttonText: 'Join Tables'
      })
    }
  },
  render: function() {
    return (
      <div>
        <Button bsStyle="primary" onClick={this.onClick} className='text-center'> {this.state.buttonText} </Button>
        <br />
        {this.state.showJoinTable ? <Panel header={'A table of people with the languages they know and where they work. This table is alphabetized by the first name, every column is sortable, and each column can be filtered.'}> <BootstrapTable data={data3} striped={true} hover={true}>
      <TableHeaderColumn dataField="id" isKey={true} hidden={true} dataAlign="center" dataSort={true}>ID ID</TableHeaderColumn>
      <TableHeaderColumn dataField="person" dataSort={true} filter={ { type: 'TextFilter', delay: 100 } } >Person</TableHeaderColumn>
      <TableHeaderColumn dataField="languages" dataSort={true} filter={ { type: 'TextFilter', delay: 100 } }>Languages</TableHeaderColumn>
      <TableHeaderColumn dataField="company" dataSort={true} filter={ { type: 'TextFilter', delay: 100 } }>Company</TableHeaderColumn>
  </BootstrapTable> </Panel>: null}
      </div>
    )
  }
})

render(
  <div>
    <Panel header={'A table of people and the languages they know. Columns are sortable.'}>
      <BootstrapTable data={data1} striped={true} hover={true}>
        <TableHeaderColumn dataField="id" hidden={true} isKey={true} dataAlign="center" dataSort={true}>ID</TableHeaderColumn>
        <TableHeaderColumn dataField="person" dataSort={true}>Person</TableHeaderColumn>
        <TableHeaderColumn dataField="language" dataSort={true}>Language</TableHeaderColumn>
      </BootstrapTable>
    </Panel>
    <br />
    <Panel header={'A table of the same people and where they work. Columns are sortable'}>
    <BootstrapTable data={data2} striped={true} hover={true}>
      <TableHeaderColumn dataField="id" hidden={true} isKey={true} dataAlign="center" dataSort={true}>ID</TableHeaderColumn>
      <TableHeaderColumn dataField="person" dataSort={true}>Person</TableHeaderColumn>
      <TableHeaderColumn dataField="company" dataSort={true}>Company</TableHeaderColumn>
    </BootstrapTable>
    </Panel>
    <br />
    <ButtonLogic />
  </div>
  , document.getElementById('main')
  )
