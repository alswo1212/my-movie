import { useEffect, useState } from "react"
import styled from "styled-components"
import Carousel from "react-material-ui-carousel"
import { getDailyMovie } from "@apis/movie"

const Posters = ({movies}) => {
  return (<div style={{
    display:'flex',
    width:'100%',
    justifyContent:'space-around',
    padding: '10px 0'
    }}>
    {movies.map(movie => <Poster key={movie.movie_cd} {...movie} />)}
  </div>)
}

const Poster = styled.div`
  width:170px;
  height:230px;
  background-image: url(${props => props.poster_url});
  border-radius: 5px;
  background-size: cover;
`

const Header = () => {
  const [movies, setMovies] = useState([])
  useEffect(() => {
    const setHeader = async () => {
      const dailyMovies = await getDailyMovie();
      setMovies(dailyMovies)
    }
    setHeader()
  }, [])
  return (
    <header style={{
      background:'black',
      height:281,
      minWidth:1000
    }}>
      <div style={{
        display:'flex',
        width:1000,
        margin: '0 auto',
        height:'100%',
      }}>
        <Carousel 
          cycleNavigation={true}
          navButtonsAlwaysInvisible={true}
          sx={{width:1000,}}>
          {[
            movies.filter((_, i) => i >= 5),
            movies.filter((_, i) => i < 5)
          ].map((subMovies, i) => <Posters key={i} movies={subMovies}/>)}
        </Carousel>
      </div>
    </header>
  )
}
export default Header