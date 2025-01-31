import { useLocation, useNavigate } from 'react-router-dom'
import { Toolbar } from '@mui/material'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import Search from '@component/Search';
import { HOME, LIKE, SEARCH } from '@const/url';
import LoginModal from '@component/LoginModal';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import { loginModalOpenAtom } from '../util/atoms';

const NaviWrapper = styled(Toolbar)(({theme}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding:'0 !important',
  "& > div": {
    flexBasis: '33%'
  }
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
  const email = sessionStorage.getItem('email');
  const [loginModalOpen, setLoginModalOpen] = useAtom(loginModalOpenAtom);
  
  return (
    <NaviWrapper>
      <div style={{display:'flex', gap:10}}>
        {location.pathname === HOME ||
        <NeviButtonWrapper onClick={e => navigate(HOME)}>
          <HomeRoundedIcon fontSize='large'/>
        </NeviButtonWrapper>
        }
        {location.pathname === LIKE ||
        <NeviButtonWrapper color='yellow' onClick={e => {
          if(!email){
            setLoginModalOpen(true);
            return;
          }
          navigate(LIKE);
        }}>
          <StarRateRoundedIcon fontSize='large'/>
        </NeviButtonWrapper>
        }
      </div>
      {location.pathname.startsWith(SEARCH) || <Search />}
      <LoginModal></LoginModal>
    </NaviWrapper>
  )
}

export default Navi