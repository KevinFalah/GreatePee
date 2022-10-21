import React, {useState} from 'react'
import { Modal, Button, Alert } from 'react-bootstrap'
import { useMutation } from 'react-query'
import {API} from '../config/api'

export default function ModalEditProduct({showEdit, handleCloseEdit, setFetchStatus, idData}) {

  const [form, setForm] = useState({
    image: '',
    name: "",
    hargabeli: 0,
    hargajual: 0,
    qty: 0,
  })

  const [message, setMessage] = useState(null)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name] : e.target.type == 'file' ? e.target.files : e.target.value
    })
  }

  const handleSubmit = useMutation(async (e) => {
    try{
      e.preventDefault();

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization : `Bearer ${localStorage.token}`,
        },
      };

      const formData = new FormData();
      formData.set('image', form?.image[0], form?.image[0].name)
      formData.set('name', form?.name)
      formData.set('hargabeli', form?.hargabeli)
      formData.set('hargajual', form?.hargajual)
      formData.set('qty', form?.qty)

      const response = await API.patch(`/product/${idData}`, formData, config)

      setFetchStatus(true)
      handleCloseEdit();
    }catch(err) {
      const alert = (
        <Alert variant='danger' className='py-1'>Failed</Alert>
      )
      setMessage(alert)
    }
  })

  return (
    <div>
       <Modal show={showEdit} onHide={handleCloseEdit}>
            <Modal.Header >
                <Modal.Title>Edit Barang</Modal.Title>
            </Modal.Header>
            <form onSubmit={(e) => handleSubmit.mutate(e)}>

            <Modal.Body>
              {message && message}
                <div class="mb-3">
                <label for="photo" class="form-label">Upload File</label>
                <input 
                  type="file" 
                  class="form-control" 
                  name="image"
                  onChange={handleChange}
                  id="photo">

                </input>
                </div>
                <div class="mb-3">
                <label for="productName" class="form-label">Nama Barang</label>
                <input type="text" class="form-control" id="productName" name='name' onChange={handleChange}></input>
                </div>
                <div class="mb-3">
                <label for="hargabeli" class="form-label">Harga Beli </label>
                <input placeholder="Harga Beli (Rp.)" type="number" class="form-control" onChange={handleChange} name='hargabeli' id="hargabeli"></input>
                </div>
                <div class="mb-3">
                <label for="hargajual" class="form-label">Harga Jual</label>
                <input placeholder="Harga Jual (Rp.)" onChange={handleChange} name='hargajual' type="number" class="form-control" id="hargajual"></input>
                </div>
                <div class="mb-3">
                <label for="stok" class="form-label">Stok</label>
                <input type="number" class="form-control" name='qty' onChange={handleChange} id="stok"></input>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" type='submit'>
                  Edit Barang
                </Button>
                <Button variant="danger" onClick={handleCloseEdit}>
                  Batal
                </Button>
            </Modal.Footer>
            </form>

        </Modal>
    </div>
  )
}