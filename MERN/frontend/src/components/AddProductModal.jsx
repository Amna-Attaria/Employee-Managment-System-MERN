import React, { useState } from 'react';
import axios from 'axios';
	const apiUrl = import.meta.env.VITE_API_BASE_URL;


const AddProductModal = ({ isOpen, onClose, setProducts }) => {
	const [formData, setFormData] = useState({
		name: '',
		price: '',
		description: '',
		image: null,
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [previewImage, setPreviewImage] = useState('');

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setFormData({
				...formData,
				image: file,
			});

			// Create preview URL
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!formData.image) {
			alert('Please select an image');
			return;
		}

		setIsSubmitting(true);

		const data = new FormData();
		data.append('name', formData.name);
		data.append('price', formData.price);
		data.append('description', formData.description);
		data.append('image', formData.image);

		try {
			const token = localStorage.getItem('token');
			const response = await axios.post(`${apiUrl}/products/add`, data, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`,
				}
			});

			console.log('Product added:', response.data);
			setProducts((prevProducts) => [...prevProducts, response.data.product]);
			onClose();

			// Reset form
			setFormData({
				name: '',
				price: '',
				description: '',
				image: null,
			});
			setPreviewImage('');
		} catch (error) {
			console.error('Error adding product:', error.response?.data || error.message);
			alert('Failed to add product: ' + (error.response?.data?.message || error.message));
		} finally {
			setIsSubmitting(false);
		}
	};

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300'>
			<div className='bg-white rounded-lg p-6 w-full max-w-md'>
				<div className='flex justify-between items-center mb-4'>
					<h2 className='text-xl font-bold'>Add New Product</h2>
					<button
						onClick={onClose}
						className='text-gray-500 hover:text-gray-700 focus:outline-none'
						disabled={isSubmitting}>
						&times;
					</button>
				</div>

				<form onSubmit={handleSubmit}>
					<div className='mb-4'>
						<label className='block text-gray-700 mb-2'>Product Name</label>
						<input
							type='text'
							name='name'
							value={formData.name}
							onChange={handleChange}
							className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							required
							disabled={isSubmitting}
						/>
					</div>

					<div className='mb-4'>
						<label className='block text-gray-700 mb-2'>Price</label>
						<input
							type='number'
							name='price'
							value={formData.price}
							onChange={handleChange}
							className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							required
							min='0'
							step='0.01'
							disabled={isSubmitting}
						/>
					</div>

					<div className='mb-4'>
						<label className='block text-gray-700 mb-2'>Description</label>
						<textarea
							name='description'
							value={formData.description}
							onChange={handleChange}
							className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							rows='3'
							disabled={isSubmitting}
						/>
					</div>

					<div className='mb-4'>
						<label className='block text-gray-700 mb-2'>Product Image</label>
						{previewImage ? (
							<div className='mb-2'>
								<img src={previewImage} alt='Preview' className='h-32 w-32 object-cover rounded border' />
								<button
									type='button'
									onClick={() => {
										setFormData({ ...formData, image: null });
										setPreviewImage('');
									}}
									className='mt-2 text-sm text-red-600 hover:text-red-800'>
									Remove Image
								</button>
							</div>
						) : (
							<div className='border-2 border-dashed rounded-lg p-4 text-center'>
								<label className='cursor-pointer'>
									<div className='flex flex-col items-center justify-center'>
										<svg className='w-8 h-8 mb-2 text-gray-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='2'
												d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
											/>
										</svg>
										<p className='text-sm text-gray-600'>Click to upload an image</p>
									</div>
									<input
										type='file'
										accept='image/*'
										onChange={handleImageChange}
										className='hidden'
										required
										disabled={isSubmitting}
									/>
								</label>
							</div>
						)}
					</div>

					<div className='flex justify-end gap-2'>
						<button
							type='button'
							onClick={onClose}
							className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50'
							disabled={isSubmitting}>
							Cancel
						</button>
						<button
							type='submit'
							className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
							disabled={isSubmitting}>
							{isSubmitting ? (
								<>
									<svg
										className='animate-spin -ml-1 mr-2 h-4 w-4 text-white inline'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'>
										<circle
											className='opacity-25'
											cx='12'
											cy='12'
											r='10'
											stroke='currentColor'
											strokeWidth='4'></circle>
										<path
											className='opacity-75'
											fill='currentColor'
											d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
									</svg>
									Adding...
								</>
							) : (
								'Add Product'
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddProductModal;