import { Button, FormControl, Input, LinearProgress, InputLabel, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material'
import { useState, useEffect, useLayoutEffect } from 'react'
import { RequestService } from "./Services/RequestService"
import { AddItem } from './AddItem'
import { DeleteItem } from './DeleteItem'
import { EditItem } from './EditItem'


function InvDashboard(props) {
  const [showAddItem, setShowAddItem] = useState(false)
  const [showDeleteItem, setShowDeleteItem] = useState(false)
  const [showEditItem, setShowEditItem] = useState(false)
  const [items, setItems] = useState({ allItems: [], table: "", isLoading: true })
  
  function getTable(users) {
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
          {users.map((row) => (
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
  async function firstCall() {
    // First API call
    await RequestService.getItems()
      .then((res) => {
        console.log(res)
        setItems({
          allItems: res,
          table: getTable(res),
          isLoading: false
        })
      })

  }

  useLayoutEffect(() => {
    firstCall()
  }, [])

  async function refresh() {
    setItems((prevState) => {
      return { ...prevState, isLoading: true }
    })

    setTimeout(() => {
      RequestService.getItems()
        .then((res) => {
          setItems({
            allItems: res,
            table: getTable(res),
            isLoading: false
          })

        })
    }, 1000)
  }

  function searchItems(location) {

    console.log(location)
    location = location.toLowerCase()
    if (location === "") {
      setItems((prevState) => {
        return {
          ...prevState,
          table: getTable(items.allItems)
        }
      })
    } else {
      let newItems = []
      for (let item of items.allItems) {
        if (item.location.toLowerCase().includes(location) || item.location.toLowerCase().includes(location)) {
          newItems.push(item)
        }
      }
      console.log(newItems)
      setItems((prevState) => {
        return {
          ...prevState,
          table: getTable(newItems)
        }
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
        <Button onClick={(e) => { toggleAddItem() }}> Add Item</Button>
        <Button onClick={(e) => { toggleEditItem() }}> Edit Item</Button>
        <Button onClick={(e) => { toggleDeleteItem() }}> Delete Item</Button>
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

export default InvDashboard;