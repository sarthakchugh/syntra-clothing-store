import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

function Form({ formControls, formData, setFormData, onSubmit, buttonText, isBtnDisabled }) {
	function renderInputsByComponentType(controlItem) {
		let element = null;
		const value = formData[controlItem.name] || '';

		switch (controlItem.componentType) {
			case 'input':
				element = (
					<Input
						name={controlItem.name}
						placeholder={controlItem.placeholder}
						id={controlItem.name}
						type={controlItem.type}
						value={value}
						onChange={(e) =>
							setFormData({
								...formData,
								[controlItem.name]: e.target.value,
							})
						}
					/>
				);
				break;
			case 'select':
				element = (
					<Select
						onValueChange={(value) =>
							setFormData({
								...formData,
								[controlItem.name]: value,
							})
						}
						value={value}
					>
						<SelectTrigger className='w-full'>
							<SelectValue placeholder={controlItem.label} />
						</SelectTrigger>
						<SelectContent>
							{controlItem.options && controlItem.options.length > 0
								? controlItem.options.map((optionItem) => (
										<SelectItem key={optionItem.id} value={optionItem.id}>
											{optionItem.label}
										</SelectItem>
								  ))
								: null}
						</SelectContent>
					</Select>
				);
				break;
			case 'textarea':
				element = (
					<Textarea
						name={controlItem.name}
						placeholder={controlItem.placeholder}
						id={controlItem.name}
						value={value}
						onChange={(e) =>
							setFormData({
								...formData,
								[controlItem.name]: e.target.value,
							})
						}
					/>
				);
				break;
			default:
				element = (
					<Input
						name={controlItem.name}
						placeholder={controlItem.placeholder}
						id={controlItem.name}
						type={controlItem.type}
						value={value}
						onChange={(e) =>
							setFormData({
								...formData,
								[controlItem.name]: e.target.value,
							})
						}
					/>
				);
		}

		return element;
	}

	return (
		<form onSubmit={onSubmit}>
			<div className='flex flex-col gap-3'>
				{formControls.map((controlItem) => (
					<div key={controlItem.name} className='grid w-full gap-1.5'>
						<Label className='mb-1'>{controlItem.label}</Label>
						{renderInputsByComponentType(controlItem)}
					</div>
				))}
			</div>
			<Button className='mt-4 w-full' disabled={isBtnDisabled}>
				{buttonText || 'Submit'}
			</Button>
		</form>
	);
}

export default Form;
