import Product from '../models/product/product.mjs';
import uploadToCloudinary from '../config/cloudinary.mjs';


export const addProduct = async (req, res) => {
	try {
		const { name, price, description } = req.body;

		// Validate input
		if (!name || !price || !req.file ) {
			return res.status(400).json({
				success: false,
				message: 'Name, price, and image are required',
			});
		}

		// Verify file buffer exists
		if (!req.file.buffer) {return res.status(400).json({
				success: false,
				message: 'Invalid image file',
			});
		}
			

		// Upload to Cloudinary
		const cloudinaryResult = await uploadToCloudinary(req.file.buffer);

		// Save to MongoDB
		const newProduct = new Product({
			title: name,
			price: parseFloat(price),
			description,
			image: cloudinaryResult.secure_url,
		});

		await newProduct.save();

		res.status(201).json({
			success: true,
			message: 'Product added successfully',
			product: newProduct,
		});
	} catch (error) {
		console.error('Error adding product:', error);
		res.status(500).json({
			success: false,
			message: error.message || 'Failed to add product',
			error: process.env.NODE_ENV === 'development' ? error.stack : undefined,
		});
	}
};


export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;

    console.log('🛠️ PUT /products/:id hit with ID:', id);

	const product = await Product.findById(req.params.id);


    if (!product) {
      console.log('❌ Product not found');
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (req.file && req.file.buffer) {
      const cloudinaryResult = await uploadToCloudinary(req.file.buffer);
      product.image = cloudinaryResult.secure_url;
    }

    if (name) product.title = name;
    if (price) product.price = parseFloat(price);
    if (description) product.description = description;

    await product.save();

    res.status(200).json({
      success: true,
      message: '✅ Product updated successfully',
      product,
    });
  } catch (error) {
    console.error('🔥 Error updating product:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};


export const deleteProduct = async (req, res) => {
	try {
	  const { id } = req.params;
  
	  const deletedProduct = await Product.findByIdAndDelete(id);
  
	  if (!deletedProduct) {
		return res.status(404).json({ message: 'Product not found' });
	  }
  
	  res.json({ message: 'Product deleted successfully' });
	} catch (err) {
	  res.status(400).json({ error: err.message, status: 400 });
	}
  };
  

export const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find();
		const formattedProducts = products.map((product) => ({
			...product._doc,
		}));

		res.status(200).json({ success: true, products: formattedProducts });
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'An internal server error occurred',
		});
		console.error('Error in get all products route', error);
	}
};


