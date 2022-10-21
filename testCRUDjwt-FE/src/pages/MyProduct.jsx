import { Button, Container, Row, Col, Pagination } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavbarUser from "../components/NavbarUser";
import ModalAddProduct from "../components/ModalAddProduct";
import ModalEditProduct from "../components/ModalEditProduct";
import ModalDeleteProduct from "../components/ModalDeleteProduct";
import profile from "../assets/profile.jfif";
import { useQuery } from "react-query";
import { API } from "../config/api";


function DarkExample() {
  //modal Add
  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);
  //modal edit
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);
  //modal for delete
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [dataApi, setDataApi] = useState(null)
  const [fetchStatus, setFetchStatus] = useState(true)

  useEffect(() => {
    let fetchData = async () => {
      const response = await API.get('/products')
      
      const resData = response.data.data
      setDataApi(resData)
    }

    if(fetchStatus) {
      fetchData();
      setFetchStatus(false)
    }

  }, [fetchStatus, setFetchStatus])


  return (
    <div style={{ backgroundColor: "whitesmoke", minHeight: "100vh" }}>
      <NavbarUser />
      <br />
      <Container>
        <Row>
          <Col>
            <h3>Barang Saya</h3>
          </Col>
          <Col>
            <Button
              variant="outline-primary"
              style={{ width: "200px", float: "right" }}
              onClick={handleShowAdd}
            >
              Tambah Barang
            </Button>
          </Col>
        </Row>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr style={{ color: "red" }}>
              <th>Nama Barang</th>
              <th style={{ width: "100px" }}>Image</th>
              <th style={{ width: "120px" }}>Harga Jual</th>
              <th style={{ width: "120px" }}>Harga Beli</th>
              <th style={{ width: "80px" }}>Stok</th>
              <th style={{ width: "250px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataApi?.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>
                  <img
                    src={item.image}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                    alt="project"
                  />
                </td>
                <td>{item.hargajual}</td>
                <td>{item.hargabeli}</td>
                <td>{item.qty}</td>
                <td>
                  <Row>
                    <Col>
                      <Button
                        variant="outline-primary"
                        style={{ width: "80px" }}
                        onClick={handleShowEdit}
                      >
                        Edit
                      </Button>
      <ModalEditProduct showEdit={showEdit} handleCloseEdit={handleCloseEdit} idData={item.id} setFetchStatus={setFetchStatus}/>

                    </Col>
                    <Col>
                      <Button
                        variant="outline-danger"
                        style={{ width: "80px" }}
                        onClick={handleShow}
                      >
                        Delete
                      </Button>
      <ModalDeleteProduct show={show} handleClose={handleClose} idData={item.id} setFetchStatus={setFetchStatus}/>

                    </Col>
                  </Row>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <ModalAddProduct
        showAdd={showAdd}
        handleCloseAdd={handleCloseAdd}
        handleShowAdd={handleShowAdd}
        setFetchStatus={setFetchStatus}
      />
    </div>
  );
}

export default DarkExample;
