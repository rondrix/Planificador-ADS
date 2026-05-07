import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('vidrios_asd_calendar_posts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing posts", e);
      }
    }
    // Default initial data
    return [];
  });

  const [campaign, setCampaign] = useState(() => {
    const saved = localStorage.getItem('vidrios_asd_calendar_campaign');
    return saved ? JSON.parse(saved) : { title: 'Abril 2026', subtitle: 'Campaña 40 Años' };
  });

  useEffect(() => {
    localStorage.setItem('vidrios_asd_calendar_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('vidrios_asd_calendar_campaign', JSON.stringify(campaign));
  }, [campaign]);

  const addPost = (post) => setPosts([...posts, { ...post, id: Date.now() }]);
  
  const updatePost = (id, updatedPost) => {
    setPosts(posts.map((p) => (p.id === id ? { ...p, ...updatedPost } : p)));
  };

  const deletePost = (id) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  const updateCampaign = (updated) => {
    setCampaign({...campaign, ...updated});
  }

  return (
    <DataContext.Provider value={{ posts, setPosts, addPost, updatePost, deletePost, campaign, updateCampaign }}>
      {children}
    </DataContext.Provider>
  );
};
