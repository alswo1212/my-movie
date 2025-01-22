import { useLocation, useNavigate } from 'react-router-dom'
import { styled, Toolbar } from '@mui/material'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import Search from '@component/Search';
import { HOME, LIKE, SEARCH } from '@const/url';

const NaviWrapper = styled(Toolbar)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding:'0 !important'
}));

const NeviButtonWrapper = styled('div')`
  background: #777;
  border-radius: 100px;
  width: 40px;
  aspect-ratio: 1 / 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &>svg{
    fill:${props => props.color ?? 'white'};
  }
`

const Navi = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  return (
    <NaviWrapper>
      <div style={{display:'flex', gap:10}}>
        {location.pathname === HOME ||
        <NeviButtonWrapper onClick={e => navigate(HOME)}>
          <HomeRoundedIcon fontSize='large'/>
        </NeviButtonWrapper>
        }
        {location.pathname === LIKE ||
        <NeviButtonWrapper color='yellow' onClick={e => navigate(LIKE)}>
          <StarRateRoundedIcon fontSize='large'/>
        </NeviButtonWrapper>
        }
      </div>
      {location.pathname === SEARCH ||
      <Search />
      }
    </NaviWrapper>
  )
}

export default Navi