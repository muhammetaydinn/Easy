import {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {Categories} from '../../models/categories';
import {Category} from '../../models/news';

export function CategoryMenu(categories: Category[]) {
  console.log('categories', categories);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(categories);
  console.log('items', items);

  return (
    <DropDownPicker
      badgeColors={['#ffffff']}
      addCustomItem={true}
      searchable={true}
      placeholder="Select a category"
      open={open}
      value={value}
      items={categories.map(category => {
        return {label: category.name, value: category.categoryId};
      })??[]}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
  );
}
