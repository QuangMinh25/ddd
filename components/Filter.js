import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { CgMenuRound } from 'react-icons/cg';

import filterSearch from '../utils/filterSearch'
import {getData} from '../utils/fetchData'
import {useRouter} from 'next/router'

const Filter  = ({state}) => {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('')
  const [category, setCategory] = useState('')

  //const {categories} = state
  const categories = state.categories.filter(cat => cat.categorytype === '1');
  const categories2 = state.categories.filter(cat => cat.categorytype === '2');

  const router = useRouter()


  const handleSort = (value) => {
    setSort(value);
    filterSearch({router, sort: value});
    // Yêu cầu router và filterSearch được truyền vào từ đâu đó khác.
    // Nếu không sẽ gây lỗi ReferenceError.
  };


  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleSelectCategorySach = (categoryId) => {
    setSelectedCategory(categoryId);
     const selectedCat = categories.find(cat => cat._id === categoryId && cat.categorytype === '1');
     filterSearch({router, category: selectedCat && selectedCat._id});
    // Yêu cầu router và filterSearch được truyền vào từ đâu đó khác.
    // Nếu không sẽ gây lỗi ReferenceError.
  };
  const handleSelectCategoryDCHT = (categoryId) => {
    setSelectedCategory(categoryId);
     const selectedCat = categories2.find(cat => cat._id === categoryId && cat.categorytype === '2');
     filterSearch({router, category: selectedCat && selectedCat._id});
    // Yêu cầu router và filterSearch được truyền vào từ đâu đó khác.
    // Nếu không sẽ gây lỗi ReferenceError.
  };
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hover, setHover] = useState(false); // tạo state mới

  const toggle = () => setDropdownOpen(!dropdownOpen);

  const onMouseEnter = () => setHover(true); // xác định trạng thái hover
  const onMouseLeave = () => setHover(false);

  return (
    <Dropdown isOpen={dropdownOpen || hover} toggle={toggle} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <DropdownToggle className="my-custom-toggle">
      <CgMenuRound />
      </DropdownToggle>
      <DropdownMenu >
        <div className="d-flex flex-column flex-md-row">
          <div>
            <h5 style={{color:'blue',textAlign: 'center'}}>Books </h5>
           
        {categories.map(cat => (
          <DropdownItem key={cat._id} onClick={() => handleSelectCategorySach(cat._id)}>
            {cat.name}
          </DropdownItem>
        ))}
      </div>
          <div>
           
            <h5 style={{color:'blue',textAlign: 'center'}}>Learning tools </h5>
            {categories2.map(cat => (
          <DropdownItem key={cat._id} onClick={() => handleSelectCategoryDCHT(cat._id)}>
            {cat.name}
          </DropdownItem>
        ))}
          </div>
          <div>
            
            <h5 style={{color:'blue',textAlign: 'center'}}>Bộ Lọc </h5>
            <DropdownItem onClick={() => handleSort('-createdAt')}>Newest</DropdownItem>
            <DropdownItem onClick={() => handleSort('oldest')}>Oldest</DropdownItem>
            <DropdownItem onClick={() => handleSort('-sold')}>Best sales</DropdownItem>
            <DropdownItem onClick={() => handleSort('-price')}>Price: Hight-Low</DropdownItem>
            <DropdownItem onClick={() => handleSort('price')}>Price: Low-Hight</DropdownItem>
          </div>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default Filter
