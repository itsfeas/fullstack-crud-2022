import { Button, FormControl, Input, LinearProgress, InputLabel, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material'
import { useState, useEffect, useLayoutEffect } from 'react'
import { RequestService } from "./Services/RequestService"
import { AddItem } from './AddItem'
import { DeleteItem } from './DeleteItem'
import { EditItem } from './EditItem'


function Dashboard(props) {
  const [locitem, setLocitem] = useState(false)
  const [showAddItem, setShowAddItem] = useState(false)
  const [showDeleteItem, setShowDeleteItem] = useState(false)
  const [showEditItem, setShowEditItem] = useState(false)
  const [items, setItems] = useState({ allItems: [], table: "", isLoading: true })
  const [locations, setLocations] = useState({ allLocations: [], table: "", isLoading: true })

  function getTable(inp) {
    if (locitem) {
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

  async function firstCall() {
    // First API call
    setLocitem(true)
    if (!locitem) {
      await RequestService.getItems()
        .then((res) => {
          console.log(res)
          setItems({
            allItems: res,
            table: getItemTable(res),
            isLoading: false
          })
        })
    }
    else {
      await RequestService.getLocations()
        .then((res) => {
          console.log(res)
          setItems({
            allItems: res,
            table: getLocTable(res),
            isLoading: false
          })
        })
    }
  }

  useLayoutEffect(() => {
    firstCall()
  }, [])

  async function refresh() {
    if (!locitem) {
      setItems((prevState) => {
        return { ...prevState, isLoading: true }
      })
      setTimeout(() => {
        RequestService.getItems()
          .then((res) => {
            setItems({
              allItems: res,
              table: getItemTable(res),
              isLoading: false
            })

          })
      }, 1000)
    }
    else {
      setLocations((prevState) => {
        return { ...prevState, isLoading: true }
      })
      setTimeout(() => {
        RequestService.getLocations()
          .then((res) => {
            setItems({
              allItems: res,
              table: getLocTable(res),
              isLoading: false
            })
          })
      }, 1000)
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
  function toggleItemLocation() {
    //Shows or hides Edit Item interface
    showDeleteLoc ? setLocitem(false) : setLocitem(true)
  }

  return (
    <Stack>
      {/* //   <Stack direction='row' justifyContent="space-evenly">
    //     <Button onClick={props.logout} >Logout</Button>
    //     <Button onClick={(e) => { selectUser(props.exec.ccid) }} >My Profile</Button>
    //   </Stack> */}

      <Stack direction="row" justifyContent="space-between" width="100%">
        {/* <FormControl>
          <InputLabel htmlFor="location">search by location</InputLabel>
          <Input autoComplete="off" id="location" value={location} onChange={(e) => { searchItems(e.target.value) }} />
        </FormControl> */}
        {!locitem && <Button onClick={(e) => { toggleAddItem(); refresh() }}> Add Item</Button>}
        {!locitem && <Button onClick={(e) => { toggleEditItem(); refresh() }}> Edit Item</Button>}
        {!locitem && <Button onClick={(e) => { toggleDeleteItem(); refresh() }}> Delete Item</Button>}
        {!locitem && <Button onClick={(e) => { toggleItemLocation(); refresh() }}> Items</Button>}
        {locitem && <Button onClick={(e) => { toggleDeleteItem(); refresh() }}> Add Location</Button>}
        {locitem && <Button onClick={(e) => { toggleDeleteLoc(); refresh() }}> Delete Location</Button>}
        {locitem && <Button onClick={(e) => { toggleItemLocation(); refresh()}}> Location</Button>}
      </Stack>
      {showDeleteItem && <DeleteItem setShowDeleteItem={setShowDeleteItem} refresh={refresh} />}
      {showAddItem && <AddItem setShowAddItem={setShowAddItem} refresh={refresh} />}
      {showEditItem && <EditItem setShowEditItem={setShowEditItem} refresh={refresh} />}
      {items.isLoading && <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
        <LinearProgress color="inherit" />
      </Stack>}
      {!items.isLoading && items.table}
    </Stack>

  );


}

export default Dashboard;