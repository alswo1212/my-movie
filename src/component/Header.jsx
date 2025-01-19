import { useEffect, useState } from "react"
import { axiosMovies, axiosPoster } from '@util/axios'
import { DAILY, POSTER } from "@const/baseUrl"
import { getYesterday } from "@util/day"
import styled from "styled-components"
import Carousel from "react-material-ui-carousel"

const Header = () => {
    const [movies, setMovies] = useState([])
    useEffect(() => {
        const setHeader = async () => {
            const { data } = await axiosMovies.get(`${DAILY}&targetDt=${getYesterday()}`)
            const newMovies = data.boxOfficeResult.dailyBoxOfficeList.map(movie => ({
                rank : movie.rank, // 순위
                movieCd : movie.movieCd, // 영화 코드
                movieNm : movie.movieNm, // 영화명
                openDt : movie.openDt, // 개봉일
                audiAcc : movie.audiAcc, // 누적관객수
            }))
            
            Promise.all(newMovies.map(({movieNm, openDt}) => axiosPoster.get(`${POSTER}&title=${movieNm}&releaseDts=${openDt.replaceAll('-','')}`)))
            .then((response) => {
                response.forEach((rep, i) => {
                  const posterUrl = rep.data.Data[0]?.Result[0].posters.split('|')[0]
                  newMovies[i].posterUrl = posterUrl ?? ''
                });
                setMovies(newMovies)
            })
        }
        setHeader()
    }, [])
    return (
        <header style={{
            background:'black'
        }}>
            <div style={{
                display:'flex',
                width:1000,
                margin: '0 auto'
            }}>
                <Carousel 
                    cycleNavigation={true}
                    navButtonsAlwaysInvisible={true}

                    sx={{width:1000}}>
                    {[
                        movies.filter((_, i) => i < 5),
                        movies.filter((_, i) => i >= 5)
                    ].map((subMovies, i) => <Posters key={i} movies={subMovies}/>)}
                </Carousel>
            </div>
        </header>
    )
}
export default Header

const Posters = ({movies}) => {
    return (<div style={{
        display:'flex',
        width:'100%',
        justifyContent:'space-around',
        padding: '10px 0'
        }}>
        {movies.map(movie => <Poster key={movie.movieCd} {...movie} />)}
    </div>)
}

const Poster = styled.div`
    width:170px;
    height:230px;
    background-image: url(${props => props.posterUrl});
    border-radius: 5px;
    background-size: cover;
`