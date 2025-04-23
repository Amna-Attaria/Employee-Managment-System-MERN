import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AddProductModal from './AddProductModal';
import UpdateProductModal from './UpdateProduct';  // make sure this matches your filename

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/products`);
        const list = Array.isArray(response.data)
          ? response.data
          : response.data.products || [];
        setProducts(list);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Add new or update existing product handler lives in the modals

  // Update product in place
  const handleUpdate = async (productId, formData) => {
    try {
      setIsUpdating(true);
      const token = localStorage.getItem('token');
  
      const { data } = await axios.put(
        `http://localhost:5000/api/products/${productId}`, // ✅ Correct URL
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      setProducts((prev) =>
        prev.map((p) => (p._id === productId ? data.product : p))
      );
    } catch (err) {
      console.error('Error updating product:', err);
    } finally {
      setIsUpdating(false);
      setIsModalOpen(false);
      setSelectedProduct(null);
    }
  };
  ;

  // Delete product
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const token = localStorage.getItem('token');
      await axios.delete(`${apiUrl}/products/${selectedProduct._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prev) =>
        prev.filter((p) => p._id !== selectedProduct._id)
      );
    } catch (err) {
      console.error('Error deleting product:', err);
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      setSelectedProduct(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header & Add Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={() => {
            setSelectedProduct(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          disabled={isAdding}
        >
          Add Product
        </button>
      </div>

      {/* Product Grid */}
      {loading ? (
        <p>Loading products…</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white shadow rounded-lg p-4">
              <img
                src={product.image || '/placeholder-image.jpg'}
                alt={product.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p>${product.price}</p>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsModalOpen(true);
                  }}
                  className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-600"
                  disabled={isUpdating}
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsDeleteModalOpen(true);
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  disabled={isDeleting}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Product Modal: only when no product is selected */}
      <AddProductModal
        isOpen={isModalOpen && selectedProduct === null}
        onClose={() => setIsModalOpen(false)}
        setProducts={setProducts}
        setIsAdding={setIsAdding}
      />

      {/* Update Product Modal: only when a product is selected */}
      <UpdateProductModal
        isOpen={isModalOpen && selectedProduct !== null}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        onUpdate={handleUpdate}
      />

      {/* Delete Confirmation */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p>
              Are you sure you want to delete{' '}
              <strong>{selectedProduct?.title}</strong>?
            </p>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border rounded"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded"
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
