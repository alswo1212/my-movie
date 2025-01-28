import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { styled, Select, MenuItem, InputLabel } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { SEARCH } from '@const/url';
import { useEffect, useRef, useState } from 'react';


const SearchWrapper = styled('div')`
  position: relative;
  border-radius: 100px;
  border: #ccc 2px solid;
  background-color: rhba(255,255,255,0.15);
  box-shadow: #ccc 0 0 3px 0;
  display: flex;
  overflow: hidden;
  padding: 5px 10px;
  gap: 5px;
  &>div{
    display: flex;
    align-items: center;
  }
`;

const inputSize = {S: 12, M: 21, L:30}
const fontSize = {S: 1, M: 1.5, L:1.5}
const SearchInput = styled('input')`
  outline: none;
  border: none;
  font-size: ${props => fontSize[props.size ?? 'S']}em;
  color: #666;
  font-weight: bold;
  width: ${props => inputSize[props.size ?? 'S']}ch;
  transition: 0.25s;
  &:focus{
    width: ${props => inputSize[props.size ?? 'S'] / 2 * 3 }ch;
  }
`;

const CustomSelect = styled(Select)`
  &>fieldset{
    border:none;
  }
`
const iconSize = {S: 1.5, M: 2, L:2.5};

const Search = ({
  size = 'S', 
  setList, 
  selectOptions = [], 
  setOption,
}) => {
  const navigate = useNavigate();
  const input = useRef(null);
  const [searchParam, setSearchParam] = useSearchParams();
  const searchText = searchParam.get('searchText');
  const search = e => {
    if(!e.nativeEvent.isComposing && e.key === 'Enter'){
      const inputVal = input?.current.value ?? '';
      if (searchText !== inputVal) {
        navigate(`${SEARCH}?searchText=${inputVal}`);
        return;
      }
      if (setList) {
        setList();
        
      }else{
        navigate(`${SEARCH}?searchText=${inputVal}`);
      }
    }
  };
  useEffect(() => {
    // if (setList) {
    //   setList();
    // }
  },[])
  
  return (
    <div style={{
      display:'flex',
      justifyContent:'center'
    }}>
      <SearchWrapper>
        <div>
          {selectOptions.length 
          ? <>
          <InputLabel id='searchDiv' ></InputLabel>
          <CustomSelect labelId='searchDiv' defaultValue={selectOptions[0].val} size='small' 
            onChange={e => setOption(e.target.value)}>
            {selectOptions.map(op => <MenuItem value={op.val} >{op.text}</MenuItem>)}
          </CustomSelect>
          </>
          : null}
        </div>
        <div>
          <SearchInput ref={input} placeholder='검색' size={size}
            onKeyDown={search}/>
        </div>
        <div>
          <SearchIcon sx={{fontSize:`${iconSize[size]}em`}} onClick={search}/>
        </div>
      </SearchWrapper>
    </div>
  )
}

export default Search