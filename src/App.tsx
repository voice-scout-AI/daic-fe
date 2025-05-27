import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import MainLayout from '@layouts/MainLayout';

import Entry from '@contents/Entry';
import UploadProc from '@contents/UploadProc';
import ExtractedProc from '@contents/ExtractedProc';
import SelectCard from '@contents/select/SelectCard';
import CheckSelected from '@contents/select/CheckSelected';
import ConvertProc from '@contents/ConvertProc';
import GenerateProc from '@contents/GenerateProc';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Entry />} />
          <Route path="upload" element={<UploadProc />} />
          <Route path="extract" element={<ExtractedProc />} />
          <Route path="select">
            <Route index element={<SelectCard />} />
            <Route path="check" element={<CheckSelected />} />
          </Route>
          <Route path="convert" element={<ConvertProc />} />
          <Route path="generate" element={<GenerateProc />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
