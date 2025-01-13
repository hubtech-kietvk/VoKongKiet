import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Currencies from './pages/Currencies'
import Home from './pages/Home'
import { Footer, Header } from './components'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/currencies' element={<Currencies />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
