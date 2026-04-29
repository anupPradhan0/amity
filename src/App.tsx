import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Page from '@/app/page'
import PageV2 from '@/app/page-v2'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/v2" replace />} />
        <Route path="/v1" element={<Page />} />
        <Route path="/v2" element={<PageV2 />} />
        <Route path="*" element={<Navigate to="/v2" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
