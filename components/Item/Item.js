import Header from "../Layouts/Header"
import Table from "./Table"
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import AddUpdateItem from "./AddUpdateItem";
function Item(){
    const [data , setData] = useState([])

    const [isLoading , setLoading] = useState(false)
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setEdit({isEdit : false, data : null})
        setShow(true);
    }
    const [editData , setEdit] = useState({
        isEdit : false,
        data : null
    })

    useEffect(() =>{
        getSparepartTime('');
    },[]);

    const getSparepartTime = async (search) => {
        setLoading(true)
        try {
            const response = await axios.get(`/api/item?search=${search}`)
            setData(response.data.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    
    const setField = async (data) => {
        setEdit({isEdit : true, data : data})
        setShow(true)
    }

    function searchItem(e){
        if(e.keyCode == 13){
            getSparepartTime(e.target.value)
        }

    }

    function onDelete(e, id){ 
        e.preventDefault();
        Swal.fire({
            text : 'Yakin Ingin Hapus ?',
            width : "300px",
            showCancelButton : true,
            confirmButtonText : "Hapus",
            cancelButtonText : "Batal",
            showLoaderOnConfirm : true,
            preConfirm: () => {
                if (id == null) {
                    return null;
                }

                return axios.delete(`api/item/${id}`)
            },
            allowOutsideClick : () => !Swal.isLoading()
        }).then((result) => {
            if(result.value){
                getSparepartTime('');
                Swal.fire({
                    text : "Item Berhasil dihapus",
                    width : "300px",
                    confirmButtonText :"Tutup"
                })
            }
        }) 
    }
    return (
        <>
            <Header/>
            <div className="container content position-relative">
                <div className="row">
                    <div className="row mb-2">
                        <div className="col-md-3">
                            <button className="btn btn-primary ml-2 mb-2 float-right" onClick={handleShow}>Tambah Sparepart</button>
                        </div>
                        <div className="col-md-9">
                            <div className="card-tools">
                                <div className="input group append">
                                    <input 
                                        type="text"
                                        name="table_search"
                                        className="form-control"
                                        placeholder="Cari Item"
                                        style={{width : "100%",height:"40px"}}
                                        id="searchItem"
                                        onKeyDown={searchItem}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Table data={data} onDelete={onDelete} setField={setField}/>
            <AddUpdateItem show={show} handleClose={handleClose} handleShow={handleShow} onRefresh={getSparepartTime} editData={editData}/>
        </>
    );

}

export default Item;