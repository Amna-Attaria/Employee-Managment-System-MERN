// UpdateProductModal.jsx
import React, { useState, useEffect } from 'react';      // ← add this!
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const UpdateProductModal = ({ isOpen, onClose, product, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  // Prefill when modal opens for update
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.title,
        price: product.price,
        description: product.description,
        image: product.image,
      });
      setPreviewImage(product.image);
    }
  }, [product]);

  const handleChange = (e) =>
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((f) => ({ ...f, image: file }));
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('image', formData.image);

    await onUpdate(product._id, data);

    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Update Product</h2>
          <button onClick={onClose} disabled={isSubmitting}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <label className="block mb-2">
            Name
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
              disabled={isSubmitting}
            />
          </label>

          {/* Price */}
          <label className="block mb-2">
            Price
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
              disabled={isSubmitting}
            />
          </label>

          {/* Description */}
          <label className="block mb-2">
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              rows="3"
              disabled={isSubmitting}
            />
          </label>

          {/* Image */}
          <label className="block mb-4">
            Image
            {previewImage ? (
              <div className="mb-2">
                <img src={previewImage} alt="Preview" className="h-24 w-24 object-cover rounded" />
                <button
                  type="button"
                  onClick={() => {
                    setFormData((f) => ({ ...f, image: null }));
                    setPreviewImage('');
                  }}
                  className="text-red-600"
                >
                  Remove
                </button>
              </div>
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={isSubmitting}
              />
            )}
          </label>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;
