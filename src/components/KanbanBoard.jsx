import React from 'react';
import TicketList from './TicketList';
import '../App.css';

const KanbanBoard = ({ tickets, groupBy, sortOrder }) => {
    const groupedAndSortedTickets = groupAndSortTickets(tickets, groupBy, sortOrder);
  
    return (
      <div className='kanban'>
        <TicketList groupedAndSortedTickets={groupedAndSortedTickets} />
      </div>
    );
  };

const groupAndSortTickets = (tickets, groupBy, sortOrder) => {
  const groupedTickets =
    groupBy === 'status'
      ? groupByStatus(tickets)
      : groupBy === 'user'
      ? groupByUser(tickets)
      : groupByPriority(tickets);

  const sortedTickets =
    sortOrder === 'priority' ? sortByPriority(groupedTickets) : sortByTitle(groupedTickets);

  return sortedTickets;
};

const groupByStatus = (tickets) => {
  return tickets.reduce((grouped, ticket) => {
    const { status } = ticket;
    if (!grouped[status]) {
      grouped[status] = [];
    }
    grouped[status].push(ticket);
    return grouped;
  }, {});
};

const groupByUser = (tickets) => {
    return tickets.reduce((grouped, ticket) => {
      const { userId } = ticket;
      if (!grouped[userId]) {
        grouped[userId] = [];
      }
      grouped[userId].push(ticket);
      return grouped;
    }, {});
  };
  

const groupByPriority = (tickets) => {
  return tickets.reduce((grouped, ticket) => {
    const { priority } = ticket;
    const priorityLabel = getPriorityLabel(priority);
    if (!grouped[priorityLabel]) {
      grouped[priorityLabel] = [];
    }
    grouped[priorityLabel].push(ticket);
    return grouped;
  }, {});
};

const sortByPriority = (groupedTickets) => {
  return Object.keys(groupedTickets)
    .sort((a, b) => Number(b) - Number(a))
    .reduce((sorted, key) => {
      sorted[key] = groupedTickets[key];
      return sorted;
    }, {});
};

const sortByTitle = (groupedTickets) => {
  return Object.keys(groupedTickets)
    .sort((a, b) => a.localeCompare(b))
    .reduce((sorted, key) => {
      sorted[key] = groupedTickets[key];
      return sorted;
    }, {});
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

export default KanbanBoard;
