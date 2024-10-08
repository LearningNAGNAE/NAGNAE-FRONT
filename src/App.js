import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SignPage from './pages/SignPage';
import ChatBotPage from './pages/ChatBotPage';
import BoardPage from './pages/BoardPage';
import StudyPage from './pages/StudyPage';
import ChatListPage from './pages/ChatListPage.js';
import './assets/styles/global.scss';
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux';
import store from './redux/Store';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId="548018321247-nvrl8pv5juotgi2m09lvutofv37vjbfh.apps.googleusercontent.com">
      <Provider store={store}>
        <ChakraProvider>
          <BrowserRouter>
            <div className="App">
              <Header />
              <div className="content">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/ChatBotPage" element={<ChatBotPage />} />
                  <Route path="/SignPage" element={<SignPage />} />
                  <Route path="/BoardPage" element={<BoardPage />} />
                  <Route path="/StudyPage" element={<StudyPage />} />
                  <Route path="/ChatListPage" element={<ChatListPage />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </BrowserRouter>
        </ChakraProvider>
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default App;