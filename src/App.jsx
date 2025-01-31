import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from '@layout/Layout'
import { HOME, LIKE, MOVIE, SEARCH } from '@const/url'
import { Home, LikeMovie, SearchMovie, MovieDetail } from '@page'

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path={HOME} element={<Home />} />
          <Route path={LIKE} element={<LikeMovie />} />
          <Route path={`${SEARCH}`} element={<SearchMovie />} />
          <Route path={`${MOVIE}/:movieId/:movieSeq`} element={<MovieDetail />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
