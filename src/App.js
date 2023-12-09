import React, { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons'
import './App.css';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [groupBy, setGroupBy] = useState(() => {
    return localStorage.getItem('kanbanGroupBy') || 'status';
  });
  const [sortOrder, setSortOrder] = useState(() => {
    return localStorage.getItem('kanbanSortOrder') || 'priority';
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('kanbanGroupBy', groupBy);
  }, [groupBy]);

  useEffect(() => {
    localStorage.setItem('kanbanSortOrder', sortOrder);
  }, [sortOrder]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      const data = await response.json();
      setTickets(data.tickets);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleGroupByChange = (value) => {
    setGroupBy(value);
  };

  const handleSortOrderChange = (value) => {
    setSortOrder(value);
  };

  return (
    <div className='Main'>
      <div className='Header'>
        <div class="dropdown">
          <button class="dropbtn"><FontAwesomeIcon icon={faBars} />  Display</button>
          <div class="dropdown-content">
            <div className='dropdown-select'>
              <label>
                Group By:
                <select value={groupBy} onChange={(e) => handleGroupByChange(e.target.value)} >
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </label>
            </div>
            <div className='dropdown-select'>
              <label>
                Sort By:
                <select value={sortOrder} onChange={(e) => handleSortOrderChange(e.target.value)}>
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </label>
            </div>
          </div>
        </div>
        {/* <button onClick={fetchData}>Display</button> */}
      </div>

      <KanbanBoard tickets={tickets} groupBy={groupBy} sortOrder={sortOrder} />
    </div>
  );
};

export default App;
