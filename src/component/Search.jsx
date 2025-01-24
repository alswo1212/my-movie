import { useLocation } from 'react-router-dom'
import { styled, Select, MenuItem, InputLabel } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { SEARCH } from '@const/url';

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
const iconSize = {S: 1.5, M: 2, L:2.5}
const Search = ({size = 'S'}) => {
  const location = useLocation();
  
  return (
    <SearchWrapper>
      <div>
        {location.pathname === SEARCH &&
        <>
        <InputLabel id='searchDiv' ></InputLabel>
        <CustomSelect labelId='searchDiv' defaultValue={'movieNm'} size='small'>
          <MenuItem value={'movieNm'} >영화</MenuItem>
          <MenuItem value={'directorNm'} >감독</MenuItem>
        </CustomSelect>
        </>
        }
      </div>
      <div>
        <SearchInput placeholder='검색' size={size}/>
      </div>
      <div>
        <SearchIcon sx={{fontSize:`${iconSize[size]}em`}}/>
      </div>
    </SearchWrapper>
  )
}

export default Search