import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import React from 'react'
import { Button, FormControl, InputGroup } from 'react-bootstrap';

export default function FieldJumlahBarang({jumlah, setJumlah, onEdit}) {

  
  function handleChange(value) {
    if (parseInt(value) < 1 || value === "") {
      setJumlah(1)
      return
    }
    setJumlah(parseInt(value))
  }
  if(!onEdit) return <p>{jumlah} Kg</p>
  
  return (
    
    <InputGroup className='edit-order-field mt-2'>
      <Button size='sm' variant="outline-secondary" id="subtract" onClick={() => handleChange(jumlah-1)}>
      <RemoveCircleOutlineRoundedIcon/>
      </Button>
      <FormControl
        type='number'
        value={jumlah}
        onChange={e => handleChange(e.target.value)}
        name='jumlah'
        size='sm'
      />
      <Button size='sm' variant="outline-secondary" id="add" onClick={() => handleChange(jumlah+1)}>
        <AddCircleOutlineRoundedIcon/>
      </Button>
    </InputGroup>
  )
}
