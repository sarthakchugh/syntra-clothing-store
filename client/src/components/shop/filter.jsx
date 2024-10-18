import { filterOptions } from '@/config';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';

function ProductFilter({ filters, onFilter }) {
	return (
		<div className='bg-background rounded-lg shadow-sm'>
			<div className='p-4 border-b mt-2'>
				<h2 className='text-lg font-bold'>Filters</h2>
			</div>
			<div className='space-y-4 p-4'>
				{Object.keys(filterOptions).map((keyItem) => (
					<div key={keyItem}>
						<h3 className='text-base font-semibold'>{keyItem}</h3>
						<div className='grid gap-2 mt-2'>
							{filterOptions[keyItem].map((option) => (
								<Label className='flex items-center gap-2 font-normal' key={option.id}>
									<Checkbox
										checked={
											filters &&
											Object.keys(filters).length > 0 &&
											filters[keyItem.toLowerCase()] &&
											filters[keyItem.toLowerCase()].indexOf(option.id) > -1
										}
										onCheckedChange={() => onFilter(keyItem, option.id)}
									/>
									{option.label}
								</Label>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default ProductFilter;
