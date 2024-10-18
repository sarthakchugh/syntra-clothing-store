import ImageUpload from '@/components/admin/imageUpload';
import AdminProductTile from '@/components/admin/productTile';
import Form from '@/components/common/form';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { addProductFormElements } from '@/config';
import { useToast } from '@/hooks/use-toast';
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from '@/store/admin/productSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const initialFormData = {
	image: null,
	title: '',
	description: '',
	category: '',
	brand: '',
	price: 0,
	salePrice: 0,
	totalStock: 0,
};

function AdminProducts() {
	const [openNewProductSidebar, setOpenNewProductSidebar] = useState(false);
	const [formData, setFormData] = useState(initialFormData);
	const [imageFile, setImageFile] = useState(null);
	const [uploadedImageURL, setUploadedImageURL] = useState('');
	const [isImageLoading, setIsImageLoading] = useState(false);
	const [currentEdittedId, setCurrentEdittedId] = useState(null);
	const { toast } = useToast();

	const dispatch = useDispatch();
	const { productList } = useSelector((state) => state.adminProducts);

	useEffect(() => {
		dispatch(fetchAllProducts());
	}, [dispatch]);

	function isFormValid() {
		return Object.keys(formData)
			.filter((key) => key !== 'salePrice' && key !== 'image' && key !== '__v') // Filter out keys that can be empty
			.map((key) => formData[key] !== '' && formData[key] !== 0)
			.every((item) => item);
	}

	function handleDelete(id) {
		dispatch(deleteProduct(id)).then((data) => {
			if (data?.payload?.success) {
				dispatch(fetchAllProducts());
				setCurrentEdittedId(null);
				toast({
					variant: 'success',
					title: 'Success!',
					description: 'Product Deleted.',
				});
			} else {
				toast({
					variant: 'destructive',
					title: 'Error!',
					description: 'Failed to delete product.',
				});
			}
		});
	}

	function onSubmit(e) {
		e.preventDefault();
		currentEdittedId !== null
			? dispatch(
					editProduct({
						id: currentEdittedId,
						formData,
					})
			  ).then((data) => {
					if (data?.payload?.success) {
						dispatch(fetchAllProducts());
						setOpenNewProductSidebar(false);
						setFormData(initialFormData);
						setCurrentEdittedId(null);
						toast({
							variant: 'success',
							title: 'Success!',
							description: 'Product Updated.',
						});
					} else {
						toast({
							variant: 'destructive',
							title: 'Error!',
							description: 'Failed to update product.',
						});
					}
			  })
			: dispatch(addNewProduct({ ...formData, image: uploadedImageURL })).then((data) => {
					if (data?.payload?.success) {
						dispatch(fetchAllProducts());
						setOpenNewProductSidebar(false);
						setImageFile(null);
						setFormData(initialFormData);
						toast({
							variant: 'success',
							title: 'Success!',
							description: 'New product added.',
						});
					} else {
						toast({
							variant: 'destructive',
							title: 'Error!',
							description: 'Failed to add new product.',
						});
					}
			  });
	}

	return (
		<>
			<div className='mb-5 flex justify-end w-full'>
				<Button onClick={() => setOpenNewProductSidebar(true)}>Add New Product</Button>
			</div>
			<div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
				{productList &&
					productList.length > 0 &&
					productList.map((productItem) => (
						<AdminProductTile
							key={productItem.title}
							product={productItem}
							setCurrentEdittedId={setCurrentEdittedId}
							setOpenNewProductSidebar={setOpenNewProductSidebar}
							setFormData={setFormData}
							handleDelete={handleDelete}
						/>
					))}
			</div>
			<Sheet
				open={openNewProductSidebar}
				onOpenChange={() => {
					setOpenNewProductSidebar(false);
					setCurrentEdittedId(null);
					setFormData(initialFormData);
				}}
			>
				<SheetContent side='right' className='overflow-auto'>
					<SheetHeader>
						<SheetDescription />
						<SheetTitle>{currentEdittedId === null ? 'Add New Product' : 'Edit Product'}</SheetTitle>
					</SheetHeader>
					<ImageUpload
						file={imageFile}
						setFile={setImageFile}
						uploadedImageURL={uploadedImageURL}
						setUploadedImageURL={setUploadedImageURL}
						isLoading={isImageLoading}
						setIsLoading={setIsImageLoading}
						isEditting={currentEdittedId !== null}
					/>
					<div className='py-6'>
						<Form
							formControls={addProductFormElements}
							formData={formData}
							setFormData={setFormData}
							buttonText={currentEdittedId === null ? 'Add Product' : 'Update Product'}
							onSubmit={onSubmit}
							isBtnDisabled={!isFormValid()}
						/>
					</div>
				</SheetContent>
			</Sheet>
		</>
	);
}

export default AdminProducts;
