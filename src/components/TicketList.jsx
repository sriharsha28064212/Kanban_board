import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleCheck, faExclamationCircle , faEllipsis, faCircleHalfStroke} from '@fortawesome/free-solid-svg-icons';
import {faCircle } from '@fortawesome/free-regular-svg-icons';
import '../App.css';

const TicketList = ({ groupedAndSortedTickets }) => {
  const getIconForGroup = (groupKey) => {
    switch (groupKey) {
      case 'Completed':
        return faCircleCheck;
      case 'Todo':
        return faCircle;
      case 'In progress':
        return faCircleHalfStroke;
      case 'Backlog':
        return faExclamationCircle;
      case 'No priority':
        return faEllipsis;
      case 'Urgent':
        return faExclamationCircle;
      default:
        return ;
    }
  };
  return (
    <div className="container">
      {Object.entries(groupedAndSortedTickets).map(([groupKey, group]) => (
        <div className="column" key={groupKey}>
          <h3><FontAwesomeIcon icon={getIconForGroup(groupKey)} /> {groupKey} <span style={{fontWeight:'100'}}>{group.length}</span></h3>
          <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
            {group.map((ticket) => (
              <li style={{fontFamily:'Arial, Helvetica, sans-serif'}} key={ticket.id} className="card">
                <p>{ticket.id}</p>
                <p style={{fontSize:'16px',fontWeight:'550'}}>{ticket.title}</p>
                <p style={{border:'1px solid #ddd',borderRadius:'2px',width:'150px',padding:'1px',textAlign:'center'}}><FontAwesomeIcon icon={faCircle} style={{marginRight:'5px'}}/>{ticket.tag.join(', ')}</p>
                {/* <p>User: {ticket.userId}</p>
                <p>Priority: {getPriorityLabel(ticket.priority)}</p> */}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const getPriorityLabel = (priority) => {
  switch (priority) {
    case 4:
      return 'Urgent';
    case 3:
      return 'High';
    case 2:
      return 'Medium';
    case 1:
      return 'Low';
    default:
      return 'No priority';
  }
};

export default TicketList;
