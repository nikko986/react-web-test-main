import logo from './logo.svg';
import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import axios from './helper/axios'
import Table from './components/commons/Table'
// Load toast
import ToastMessage from './helper/toastContainer';
import {toast} from 'react-toastify';

function App() {
    const [cartList, addToCart] = useState([]);
    const [catalog, setCatalog] = useState([]);
    const columns = React.useMemo(
        () => [
            {
                Header: "Image",
                accessor: "image",
                maxWidth: 70,
                minWidth: 70,
                Cell: ({ cell: { value } }) => (
                  <img
                    src={value}
                    width={60}
                  />
                )
            },
            {
                Header: 'Name',
                accessor: 'name'
            },
            {
                Header: 'Description',
                accessor: 'description'
            },
            {
                Header: 'Category',
                accessor: 'category'
            },
            {
                Header: 'Price',
                accessor: 'price'
            }
        ],
        []
    )

     useEffect(() => {
       displayCatalog();
     }, [])

     const displayCatalog = () => {
       axios
            .get('catalog?key=3fc45675')
            .then(response => {
                setCatalog(response.data)
            })
            .catch(() => toast.error('Failed to fetch catalog..'))
     }

     const getProducts = () => {
         axios
              .get('catalog?key=3fc45675')
              .then(response => {
                  const { data } = response

                  addToCart(data)
                  toast.success('Successfully get products')

              })
              .catch(() => toast.error('Failed to fetch catalog..'))
     }

     const addProducts = id => {
         axios
            .post(`cart/${id}?key=3fc45675`)
            .then(response => {
                const { data } = response
                //updated cart is being returned so we just set the state based on the response data
                addToCart(data)
                toast.success('Successfully added product to cart')

            })
            .catch(() => toast.error('Failed to add product to cart..'))
     }

     const updateProduct = (id, quantity) => {
         const config = { id, quantity }

         axios
              .put('cart?key=3fc45675', config)
              .then(response => {
                  const { data } = response
                  //updated cart is being returned so we just set the state based on the response data
                  addToCart(data)
                  toast.success('Successfully updated product')
              })
              .catch(() => toast.error('Failed to update product..'))
     }

     const deleteProduct = id => {
         axios
            .delete(`cart/${id}?key=3fc45675`)
            .then(response => {
                const { data } = response
                //updated cart is being returned so we just set the state based on the response data
                addToCart(data)
                toast.success('Successfully deleted product')
            })
            .catch(() => toast.error('Failed to delete product..'))
     }

    return (
        <React.Fragment>
          <Table columns={columns} data={catalog}/>
          <button className='ui button' onClick={() => getProducts()}>Get available products</button>
          <button className='ui button' onClick={() => addProducts(1)}>Add Product To Cart</button>
          <button className='ui button' onClick={() => updateProduct(1, 2)}>Update Product Quantity</button>
          <button className='ui button' onClick={() => deleteProduct(1)}>Remove Product From Cart</button>
          <ToastMessage />
        </React.Fragment>
    );
}

export default App;
