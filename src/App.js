import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import SignPage from './pages/SignPage';
import ChatBotPage from './pages/ChatBotPage';
import BoardPage from './pages/BoardPage';
import StudyPage from './pages/StudyPage';
import LoginTestPage from './pages/LoginTestPage';
// 1. import `ChakraProvider` component
import './assets/styles/global.scss';
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux';
import store from './redux/Store';

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <BrowserRouter>
          <div className="App">
            <Header  />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/ChatBotPage" element={<ChatBotPage />} />
              <Route path="/SignPage" element={<SignPage />} />
              <Route path="/BoardPage" element={<BoardPage />} />
              <Route path="/ContactPage" element={<ContactPage />} />
              <Route path="/AboutPage" element={<AboutPage />} />
              <Route path="/StudyPage" element={<StudyPage />} />
              {/* <Route path="/LoginTestPage" element={<LoginTestPage />} /> */}
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  );
}

export default App;