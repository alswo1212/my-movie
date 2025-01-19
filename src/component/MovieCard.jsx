import { Card, CardContent, CardMedia } from "@mui/material"

const MovieCard = ({movie}) => {
  return <Card>
    <CardMedia
      sx={{ height: 140 }}
      image={movie.posterUrl}
      title={movie.movieNm}
    />
    <CardContent>
      <h5>{movie.movieNm}</h5>
    </CardContent>
  </Card>
}
export default MovieCard