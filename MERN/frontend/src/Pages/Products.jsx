import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // If using React Router

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const Products = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get(`${apiUrl}/products`);
				setProducts(Array.isArray(response?.data.products) ? response.data.products : []);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchProducts();
	}, []);

	if (loading)
		return (
			<div className='flex justify-center items-center h-64'>
				<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
			</div>
		);

	if (error)
		return (
			<div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
				Error loading products: {error}
			</div>
		);

	return (
		<div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-7xl mx-auto'>
			
				{/* Product Grid */}
				{products.length > 0 ? (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
						{products.map((product) => (
							<div key={product._id} className='bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition'>
								<div className='w-full h-64 bg-gray-100 rounded-md overflow-hidden'>
									<img
										src={product.image || '/placeholder-product.jpg'}
										alt={product.name}
										className='w-full h-full object-cover object-center transition-opacity duration-300 group-hover:opacity-75'
									/>
								</div>
								<div className='mt-4'>
									<h3 className='text-lg font-semibold text-gray-900'>{product.title}</h3>
									<p className='text-sm text-gray-500 mt-1'>{product.description?.substring(0, 60)}...</p>
									<p className='text-md font-bold text-gray-800 mt-2'>${product.price.toFixed(2)}</p>
								</div>
								<Link
									to={`/products/${product._id}`}
									className='mt-4 inline-block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-md transition'>
									Add to Cart
								</Link>
							</div>
						))}
					</div>
				) : (
					<div className='text-center py-12'>
						<svg className='mx-auto h-12 w-12 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
							/>
						</svg>
						<h3 className='mt-2 text-lg font-medium text-gray-900'>No products available</h3>
						<p className='mt-1 text-gray-500'>Check back later for new products</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Products;