import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { useMutation } from 'react-query';
import { Modal, Button, Alert } from 'react-bootstrap'

import { API } from '../config/api'

export default function ModalAddProduct({showAdd, handleCloseAdd, handleShowAdd, setFetchStatus}) {

  const [form, setForm] = useState ({
    image: '',
    name: "",
    hargabeli: 0,
    hargajual: 0,
    qty: 0,
  });

  const [message, setMessage] = useState(null);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
      e.target.type === 'file' ? e.target.files : e.target.value,
    });
  };


  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      //config conten-type
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.token}`,
        },
      };

      const formData = new FormData();
      formData.set('image', form?.image[0], form?.image[0].name);
      formData.set('name', form?.name);
      formData.set('hargabeli', form?.hargabeli);
      formData.set('hargajual', form?.hargajual);
      formData.set('qty', form?.qty);

      console.log(form);

      const response = await API.post('/product', formData, config);

      setFetchStatus(true)
      handleCloseAdd()
      // handling response here
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  // useEffect(() => {
  //   console.log(form);
  // }, [form.image])

  return (
    <div>
       <Modal show={showAdd} onHide={handleCloseAdd}>
            <Modal.Header >
                <Modal.Title>Tambah Barang</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form onSubmit={(e) => {
              handleSubmit.mutate(e);
            }}>
                <div class="mb-3">
                <label for="photo" class="form-label">Upload File</label>
                <input 
                  type="file" 
                  class="form-control" 
                  name='image'
                  id="photo" 
                  onChange={handleChange}/>
                </div>
                <div class="mb-3">
                <label for="productName" class="form-label">Nama Barang</label>
                <input type="text" className='input-barang form-control' id="productName" name='name' onChange={handleChange}/>
                </div>
                <div class="mb-3">
                <label for="hargabeli" class="form-label">Harga Beli </label>
                <input 
                  placeholder="Harga Beli (Rp.)" 
                  type="number" 
                  className='input-hargabeli form-control' 
                  name='hargabeli' 
                  id="hargabeli" 
                  onChange={handleChange}/>
                </div>
                <div class="mb-3">
                <label for="hargajual" class="form-label">Harga Jual</label>
                <input placeholder="Harga Jual (Rp.)" type="number" className='input-hargajual form-control' name='hargajual' id="hargajual" onChange={handleChange}/>
                </div>
                <div class="mb-3">
                <label for="qty" class="form-label">Stok</label>
                <input type="number" className='input-qty form-control' id="qty" name='qty' onChange={handleChange}/>
                </div>
                <Modal.Footer>
                <Button variant="success" type='submit' >
                  Tambah Barang
                </Button>
                <Button variant="danger" onClick={handleCloseAdd}>
                  Batal
                </Button>
            </Modal.Footer>
            </form>
            </Modal.Body>
        </Modal>
    </div>
  )
}