// src/components/PostList.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/styles/board/Community/Comm_PostList.scss';
import { usePostList } from '../../../hooks/board/BoardComm_PostList';

function Comm_PostList({ posts = [], currentPage, totalPages, totalPosts, pageSize, onPageChange, onSearch }) {

  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='comm_postlist_wrap'>
      <div className='comm-post-list-header'>
        <h1 className='comm_h1'>Community</h1>
        <div className='comm-input-btn-box'>
          <input 
            className='comm-search' 
            type='text' 
            placeholder='Please enter your search term'
            onChange={(e) => onSearch(e.target.value)}
          />
          <button className='comm-search-btn'>
            <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#5f6368">
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
            </svg>
          </button>
        </div>
      </div>

      <table className="comm-post-list">
        <thead className='comm-thead'>
          <tr>
            <th>no</th>
            <th>title</th>
            <th>writer</th>
            <th>date</th>
            <th>hits</th>
          </tr>
        </thead>
        <tbody className='comm-tbody'>
          {posts.length > 0 ? (
            posts.map((post,index) => (
              <tr key={post.boardno}>
                <td>{totalPosts - ((currentPage - 1) * pageSize + index)}</td>
                <td align='left'>
                  <Link to={'/BoardPage?type=Comm_PostRead'} state= {{boardno: post.boardno }}>{post.title}</Link>
                </td>
                <td>{post.userName}</td>
                <td>{post.insertDate}</td>
                <td>{post.views}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No posts available</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className='pagenation-writebtn-box'>
        <div className="pagination">
          <button onClick={() => onPageChange(1)} className="pagination-button">&laquo;</button>
          <button onClick={() => onPageChange(Math.max(1, currentPage - 1))} className="pagination-button">&lt;</button>
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => onPageChange(number)}
              className={`pagination-button ${currentPage === number ? 'active' : ''}`}
            >
              {number}
            </button>
          ))}
          <button onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} className="pagination-button">&gt;</button>
          <button onClick={() => onPageChange(totalPages)} className="pagination-button">&raquo;</button>
        </div>
        
        <div className='write-btn'>
          <Link to="/BoardPage?type=Comm_PostForm">Write</Link>
        </div>
      </div>
    </div>
  );
}

function Comm_PostListMain() {
  const {
    posts,
    currentPage,
    totalPages,
    totalPosts,
    pageSize,
    onPageChange,
    onSearch
  } = usePostList(1);  // 1은 초기 페이지 번호입니다


  return (
    <Comm_PostList
      posts={posts}
      currentPage={currentPage}
      totalPages={totalPages}
      totalPosts={totalPosts}
      pageSize={pageSize}
      onPageChange={onPageChange}
      onSearch={onSearch}
    />
  );
}

export default Comm_PostListMain;
