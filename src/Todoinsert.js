import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';

function Todoinsert() {
  // State for product data and form fields
  const [productId, setProductId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [edit, setEdit] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Simulate Fetch Data (local data)
  const getData = () => {
    // Simulated static product data
    const data = [
      { id: '', title: '', description: '' },
      { id: '', title: '', description: ' ' },
      { id: '', title: '', description: ' ' },
    ];
    // setProducts(data);
  };

  // Handle Edit
  const handleEdit = (id) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      setProductId(product.id);
      setTitle(product.title);
      setDescription(product.description);
      setEdit(true);
    }
  };

  // Handle Submit (Create or Update)
  const handleSubmit = () => {
    if (edit) {
      handleUpdate();
    } else {
      handleSave();
    }
  };

  // Handle Save (Create New Product)
  const handleSave = () => {
    if (!title || !description) {
      Swal.fire({
        title: 'Please fill in both fields!',
        icon: 'error',
      });
      return;
    }
    const newProduct = {
      id: products.length + 1, // New ID for the product
      title,
      description,
    };
    setProducts([...products, newProduct]); // Add new product to the state
    Swal.fire({
      title: 'Successfully Created!',
      icon: 'success',
    });
    setTitle('');
    setDescription('');
  };

  // Handle Update
  const handleUpdate = () => {
    if (!title || !description) {
      Swal.fire({
        title: 'Please fill in both fields!',
        icon: 'error',
      });
      return;
    }
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, title, description } : product
    );
    setProducts(updatedProducts); // Update product in the state
    Swal.fire({
      title: 'Successfully Updated!',
      icon: 'success',
    });
    setEdit(false);
    setTitle('');
    setDescription('');
  };

  // Handle Delete
  const handleDelete = (id) => {
    const remainingProducts = products.filter((product) => product.id !== id);
    setProducts(remainingProducts); // Remove the deleted product from the state
    Swal.fire({
      title: 'Successfully Deleted!',
      icon: 'success',
    });
  };

  // Columns for DataTable
  const columns = [
    { name: 'ID', selector: (row) => row.id, sortable: true },
    { name: 'Title', selector: (row) => row.title },
    { name: 'Description', selector: (row) => row.description },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="action-buttons">
          <button className="btn btn-delete" onClick={() => handleDelete(row.id)}>
            Delete
          </button>
          <button className="btn btn-edit" onClick={() => handleEdit(row.id)}>
            Edit
          </button>
        </div>
      ),
    },
  ];

  // Custom styles for DataTable
  const customStyles = {
    headRow: { style: { backgroundColor: 'black', color: 'blue', fontSize: '24px'} },
    cells: { style: { color: 'red', fontSize: '23px' } },
  };

  // useEffect hook to fetch data on component mount
  useEffect(() => {
    getData(); // Get data when the component is mounted
  }, []);

  return (
    <div>
      <h1>Product Insert</h1>
      <div className="form-container">
        <input
          placeholder="Insert Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Insert Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleSubmit}>{edit ? 'Update' : 'Create'}</button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <DataTable
          data={products}
          columns={columns}
          customStyles={customStyles}
          pagination
          paginationPerPage={5}
        />
      )}
    </div>
  );
}

export default Todoinsert;
