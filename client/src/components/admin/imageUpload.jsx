import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useEffect, useRef } from 'react';
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';
import { Skeleton } from '../ui/skeleton';

function ImageUpload({
	file,
	setFile,
	uploadedImageURL,
	setUploadedImageURL,
	isLoading,
	setIsLoading,
	isEditting,
}) {
	const inputRef = useRef(null);

	function handleImageFileChange(e) {
		const selectedFile = e.target.files?.[0];
		if (selectedFile) setFile(selectedFile);
	}

	function handleDragOver(e) {
		e.preventDefault();
	}

	function handleDrop(e) {
		e.preventDefault();
		const droppedFile = e.dataTransfer.files?.[0];
		if (droppedFile) setFile(droppedFile);
	}

	function handleRemoveImage() {
		setFile(null);
		if (inputRef.current) inputRef.current.value = '';
	}

	async function uploadImageToCloudinary(file) {
		setIsLoading(true);
		const data = new FormData();
		data.append('product_file', file);
		try {
			const response = await axios.post('http://localhost:5000/api/admin/products/upload', data);
			if (response?.data?.success) {
				console.log(response.data.result);
				setUploadedImageURL(response.data.result.url);
				setIsLoading(false);
			}
		} catch (err) {
			console.log(err);
			setIsLoading(false);
		}
	}

	useEffect(() => {
		if (file !== null) uploadImageToCloudinary(file);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [file]);

	return (
		<div className='w-full max-w-md mx-auto mt-4'>
			<Label className='text-lg font-semibold mb-2 block'>Upload Image</Label>
			<div
				className={`${isEditting ? 'opacity-60' : ''} border-2 border-dashed rounded-lg p-4`}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
			>
				<Input
					ref={inputRef}
					id='image-upload'
					type='file'
					className='hidden'
					onChange={handleImageFileChange}
					disabled={isEditting}
				/>
				{!file ? (
					<Label
						htmlFor='image-upload'
						className={`${
							isEditting ? 'cursor-not-allowed' : 'cursor-pointer'
						} flex flex-col items-center justify-center h-32`}
					>
						<UploadCloudIcon className='w-10 h-10 text-muted-foreground mb-2' />
						<span> Drag & Drop or Click to upload image</span>
					</Label>
				) : isLoading ? (
					<div className='flex items-center gap-4'>
						<Skeleton className='h-10 w-10' />
						<Skeleton className='h-4 w-[200px]' />
					</div>
				) : (
					<div className='flex items-center justify-between'>
						<div className='flex items-center'>
							<FileIcon className='w-8 h-8 text-primary mr-2' />
						</div>
						<p className='text-sm font-medium'>{file.name}</p>
						<Button
							variant='ghost'
							size='icon'
							className='text-muted-foreground hover:text-foreground'
							onClick={handleRemoveImage}
						>
							<XIcon className='w-4 h-4' />
							<span className='sr-only'>Remove File</span>
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}

export default ImageUpload;
