import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from '@layout/Layout'
import { HOME, LIKE, MOVIE, SEARCH } from '@const/url'
import { Home, LikehMovie, SearchMovie, MovieDetail } from '@page'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Layout>
        <Routes>
          <Route path={HOME} element={<Home />} />
          <Route path={LIKE} element={<LikehMovie />} />
          <Route path={SEARCH} element={<SearchMovie />} />
          <Route path={`${MOVIE}/:movieCd`} element={<MovieDetail />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
