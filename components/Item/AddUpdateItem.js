import React, {useState , useEffect} from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import {Modal , Button} from "react-bootstrap"
function AddUpdateItem({handleClose, show, handleShow, onRefresh , editData}){
    
    const [sparepartCode, setSparepartCode] = useState({
        value : "",
        errorMessage : ""
    })

    const [sparepartName, setSparepartName] = useState({
        value : "",
        errorMessage : ""
    })

    const [unit, setSparepartUnit] = useState({
        value : "",
        errorMessage : ""
    })

    const [price, setSparepartPrice] = useState({
        value : "",
        errorMessage : ""
    })

    function onSparepartCodeChange(e) {
        let errorMessage;
        let name = (e.target.validity.valid) ? e.target.value : unit.value

        if(name==""){
            errorMessage ="kode sparepart kosong"
        }else{
            errorMessage = ""
        }
        setSparepartCode({...sparepartCode , value : name , errorMessage : errorMessage})
    }

    function onSparepartNameChange(e) {
        let errorMessage;
        let name = (e.target.validity.valid) ? e.target.value : sparepartName.value

        if(name==""){
            errorMessage ="nama sparepart kosong"
        }else{
            errorMessage = ""
        }
        setSparepartName({...sparepartName , value : name , errorMessage : errorMessage})
    }

    function onSparepartUnitChange(e) {
        setSparepartUnit({...unit , value : e.target.value , errorMessage : ""})
    }

    function onSparepartPriceChange(e) {
        setSparepartPrice({...price , value : e.target.value , errorMessage : ""})
    }

    const postSparePartItem = async () => {
        try {
            const response = await axios.post(`/api/item`,{
                "sparepartCode" : sparepartCode.value,
                "name" : sparepartName.value,
                "unit" : unit.value,
                "price" : price.value
            })
            onRefresh('')
            handleClose()
            clear()
            Swal.fire(response.data.message)
        } catch (error) {
            console.log(error)
            Swal.fire('Oops...', error.response.data.message , 'error' )
        }
    }

    const putSparePartItem = async () => {
        try {
            const response = await axios.put(`/api/item/${editData.data._id}`,{
                "sparepartCode" : sparepartCode.value,
                "name" : sparepartName.value,
                "unit" : unit.value,
                "price" : price.value
            })
            onRefresh('')
            handleClose()
            clear()
            Swal.fire(response.data.message)
        } catch (error) {
            console.log(error)
            Swal.fire('Oops...', error.response.data.message , 'error' )
        }
    }


    function clear(){
        setSparepartCode({
            value : "",
            errorMessage : ""
        })

        setSparepartName({
            value : "",
            errorMessage : ""
        })

        setSparepartUnit({
            value : "",
            errorMessage : ""
        })

        setSparepartPrice({
            value : "",
            errorMessage : ""
        })
    
      
    }

    useEffect(() => {
        if(editData.isEdit){
            console.log('test')
            console.log(editData)
            setSparepartCode({
                value : editData.data.sparepartCode,
                errorMessage : ""
            })
    
            setSparepartName({
                value : editData.data.name,
                errorMessage : ""
            })
    
            setSparepartUnit({
                value : editData.data.unit,
                errorMessage : ""
            })
    
            setSparepartPrice({
                value : editData.data.price,
                errorMessage : ""
            })
        
        }else{
            clear();
        }
    },[editData]);
    return (
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header >
              <Modal.Title>{editData.isEdit ? 'Edit Sparepart' : 'Tambah Sparepart'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="form-group">
                        <label htmlFor="sparepartCode f12">Kode Sparepart</label>
                        <input 
                            id="sparepartCode"
                            name="sparepartCode"
                            type="text"
                            value={sparepartCode.value}
                            onChange={onSparepartCodeChange}
                            maxLength="10"
                            className={[
                                "form-control mt-2 mb-2",
                                sparepartCode.errorMessage === "" ? "" : 'is-invalid',
                            ].join(" ")}
                            placeholder="kode sparepart"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sparepartName f12">Nama Sparepart</label>
                        <input 
                            id="sparepartName"
                            name="sparepartName"
                            type="text"
                            value={sparepartName.value}
                            onChange={onSparepartNameChange}
                            maxLength="50"
                            className={[
                                "form-control mt-2 mb-2",
                                sparepartName.errorMessage === "" ? "" : 'is-invalid',
                            ].join(" ")}
                            placeholder="nama sparepart"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sparepartUnit f12">Satuan Sparepart</label>
                        <input 
                            id="sparepartUnit"
                            name="sparepartUnit"
                            type="text"
                            value={unit.value}
                            onChange={onSparepartUnitChange}
                            maxLength="10"
                            className={[
                                "form-control mt-2 mb-2",
                                unit.errorMessage === "" ? "" : 'is-invalid',
                            ].join(" ")}
                            placeholder="satuan sparepart"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price f12">Harga</label>
                        <input 
                            id="sparepartPrice"
                            name="sparepartPrice"
                            type="number"
                            value={price.value}
                            onChange={onSparepartPriceChange}
                            maxLength="20"
                            className={[
                                "form-control mt-2 mb-2",
                                price.errorMessage === "" ? "" : 'is-invalid',
                            ].join(" ")}
                            placeholder="Harga sparepart"
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={editData.isEdit ? putSparePartItem : postSparePartItem}>
                Simpan Data
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}

export default AddUpdateItem;