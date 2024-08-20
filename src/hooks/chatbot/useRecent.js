import { useState, useEffect, useCallback } from 'react';
import { useRecentChatsApi } from '../../contexts/chatbot/ChatRecentApi';

export const useRecentChats = () => {
  const [recentChats, setRecentChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 
  const api = useRecentChatsApi();

  const loadRecentChats = useCallback(async () => {
    if (!api) {
      setError('Recent chats API is not available. Please check your connection.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const userData = JSON.parse(sessionStorage.getItem('userData'));
      if (!userData || !userData.apiData || !userData.apiData.userno) {
        throw new Error('User data not found in session storage');
      }

      const userNo = userData.apiData.userno;
      const response = await api.fetchRecentChats(userNo);
      setRecentChats(response.apiData.map(chat => ({...chat, isNew: chat.isNew || false})));
    } catch (error) {
      console.error('Error loading recent chats:', error);
      setError(error.message || 'Failed to load recent chats');
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    loadRecentChats();
  }, [loadRecentChats]);

  const selectChat = useCallback(async (chatHisNo) => {
    if (!api) {
      setError('Chat details API is not available. Please check your connection.');
      return null;
    }
 
    setLoading(true);
    setError(null);
 
    try {
      const userData = JSON.parse(sessionStorage.getItem('userData'));
      if (!userData || !userData.apiData || !userData.apiData.userno) {
        throw new Error('User data not found in session storage');
      }
 
      const userNo = userData.apiData.userno;
      const chatDetails = await api.fetchChatHistory(userNo, chatHisNo);
      return chatDetails;
    } catch (error) {
      console.error('Error fetching chat details:', error);
      setError(error.message || 'Failed to fetch chat details');
      return null;
    } finally {
      setLoading(false);
    }
  }, [api]);

  return { recentChats, loading, error, selectChat, loadRecentChats };
};