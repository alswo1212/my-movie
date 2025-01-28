import Search from "@component/Search";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from '@component/MovieCard';
import { getSearchMovies } from '@apis/movie';

const selectOptions = [
  {val:'title', text:'영화'}, 
  {val:'director', text:'감독'},
];

const SearchMovie = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const searchText = searchParam.get('searchText');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [isLoding, setIsLoading] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [paramDiv, setParamDiv] = useState(selectOptions[0].val);

  const fetchData = () => {
    if(isOver || isLoding)
      return;

    setIsLoading(true);
    getSearchMovies(searchText, paramDiv, page).then(newMovies => {
      
      if (newMovies.length) {
        setMovies(prevList => [...prevList, ...newMovies]);
        setPage(prev => prev + 1);
      }else{
        setIsOver(true);
      }
      setIsLoading(false);
    });
  };

  const observeCallback = ([entry]) => {
    if (entry.isIntersecting) {
      setFetchTrigger(prev => !prev);
    }
  }
  
  useEffect(() => {
    const observer = new IntersectionObserver(observeCallback, {threshold:0});
    observer.observe(document.getElementById('observer'));
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    if (page) {
      fetchData();
    }
  }, [fetchTrigger]);
  
  useEffect(() => {
    getSearchMovies(searchText, paramDiv, 0).then(newMovies => {
      setMovies(newMovies);
      setPage(1);
      setIsOver(newMovies.length == 0);
    });
  }, [searchText, paramDiv]);


  return (
    <>
    <Search size={'L'} setList={fetchData} selectOptions={selectOptions} setOption={setParamDiv}/>
    <br/>
    <Typography variant="h4" gutterBottom fontFamily={'GmarketSansBold'}>
      {movies.length
      ? `"${searchText}"에 대한 검색 결과`
      : '검색 결과가 없습니다.'}
    </Typography>
    <div style={{
      display:'flex',
      flexWrap: 'wrap',
      gap:10,
      flexDirection:'row',
    }}>
      {movies.map((movie, i) => <MovieCard key={`${i}_${movie.movie_cd}`} {...movie} />)}
    </div>
    <div id="observer" style={{position:'absolute',bottom:0}}></div>
    </>
  )
};

export default SearchMovie;