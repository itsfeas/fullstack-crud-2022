import { Button, FormControl, Input, LinearProgress, InputLabel, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material'
import { useState, useEffect, useLayoutEffect } from 'react'
import { RequestService } from "./Services/RequestService"
import { AddItem } from './AddItem'
import { DeleteItem } from './DeleteItem'
import { EditItem } from './EditItem'
import { DeleteLoc } from './DeleteLoc'
import { AddLoc } from './AddLoc'


function Dashboard(props) {
  const [locitem, setLocitem] = useState(false)
  const [showAddItem, setShowAddItem] = useState(false)
  const [showDeleteItem, setShowDeleteItem] = useState(false)
  const [showEditItem, setShowEditItem] = useState(false)
  const [showDeleteLoc, setShowDeleteLoc] = useState(false)
  const [showAddLoc, setShowAddLoc] = useState(false)
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState({ allItems: [], table: "" })
  const [locations, setLocations] = useState({ allLocations: [], table: ""})

  function getTable(inp) {
    if (!locitem) {
      return (getItemTable(inp))
    }
    else {
      return (getLocTable(inp))
    }
  }

  function getItemTable(items) {
    return (<TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Item ID</TableCell>
            <TableCell align="right">To</TableCell>
            <TableCell align="right">From</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Weight</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row) => (
            <TableRow
              key={row.item_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                {row.item_id}
              </TableCell>
              <TableCell align="right">{row.ship_to}</TableCell>
              <TableCell align="right">{row.ship_from}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.location}</TableCell>
              <TableCell align="right">{row.weight}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>)
  }

  function getLocTable(items) {
    return (<TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Location</TableCell>
            <TableCell align="right">Number of Items</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row) => (
            <TableRow
              key={row.location}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                {row.location}
              </TableCell>
              <TableCell align="right">{row.num_items}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>)
  }

  useEffect(() => {
    RequestService.getItems()
      .then((res) => {
        setItems({
          allItems: res,
          table: getItemTable(res),
        })
      })
    RequestService.getLocations()
      .then((res) => {
        setLocations({
          allLocations: res,
          table: getLocTable(res),
        })
      })
    setTimeout(() => {
      refresh()
    }, 1000);
  }, [])

  async function slow_refresh() {
    setLoading((prevState) => {
      return { ...prevState, loading: true }
    })
    setTimeout(() => {
      refresh()
    }, 1000);
  }

  async function refresh() {
    console.log("item", !locitem)
    if (!locitem) {
      RequestService.getItems()
        .then((res) => {
          setItems({
            allItems: res,
            table: getTable(res),
          })
          setLoading(false)
        })
    }
    else {
      RequestService.getLocations()
        .then((res) => {
          setLocations({
            allLocations: res,
            table: getTable(res),
          })
          setLoading(false)
        })
    }
  }



  function toggleAddItem() {
    //Shows or hides add Item interface
    showAddItem ? setShowAddItem(false) : setShowAddItem(true)
  }
  function toggleDeleteItem() {
    //Shows or hides delete Item interface
    showDeleteItem ? setShowDeleteItem(false) : setShowDeleteItem(true)
  }
  function toggleEditItem() {
    //Shows or hides Edit Item interface
    showEditItem ? setShowEditItem(false) : setShowEditItem(true)
  }
  function toggleItemLocation() {
    //Shows or hides Edit Item interface
    locitem ? setLocitem(false) : setLocitem(true)
  }
  function toggleDeleteLoc() {
    //Shows or hides Edit Item interface
    showDeleteLoc ? setShowDeleteLoc(false) : setShowDeleteLoc(true)
  }
  function toggleAddLoc() {
    //Shows or hides Edit Item interface
    showAddLoc ? setShowAddLoc(false) : setShowAddLoc(true)
  }

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between" width="100%">
        {!locitem && <Button onClick={(e) => { toggleAddItem(); refresh() }}> Add Item</Button>}
        {!locitem && <Button onClick={(e) => { toggleEditItem(); refresh() }}> Edit Item</Button>}
        {!locitem && <Button onClick={(e) => { toggleDeleteItem(); refresh() }}> Delete Item</Button>}
        {locitem && <Button onClick={(e) => { toggleAddLoc(); refresh() }}> Add Location</Button>}
        {locitem && <Button onClick={(e) => { toggleDeleteLoc(); refresh() }}> Delete Location</Button>}
        {locitem && <Button onClick={(e) => { toggleItemLocation(); slow_refresh() }}> Switch to Items</Button>}
        {!locitem && <Button onClick={(e) => { toggleItemLocation(); slow_refresh() }}> Switch to Locations</Button>}
      </Stack>
      {showDeleteItem && <DeleteItem setShowDeleteItem={setShowDeleteItem} refresh={refresh} />}
      {showAddItem && <AddItem setShowAddItem={setShowAddItem} refresh={refresh} />}
      {showEditItem && <EditItem setShowEditItem={setShowEditItem} refresh={refresh} />}
      {showDeleteLoc && <DeleteLoc setShowDeleteLoc={setShowDeleteLoc} refresh={refresh} />}
      {showAddLoc && <AddLoc setShowAddLoc={setShowAddLoc} refresh={refresh} />}
      {loading && <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
        <LinearProgress color="inherit" />
      </Stack>}
      {!loading && locitem && locations.table}
      {!loading && !locitem && items.table}
    </Stack>

  );


}

export default Dashboard;