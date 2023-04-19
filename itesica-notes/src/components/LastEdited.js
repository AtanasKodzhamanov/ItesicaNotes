import React from 'react';


const LastEdited = ({ editedNodes }) => {
  return (
    <div>
      <h2>Last 5 edited notes:</h2>
      <ul>
        {console.log(editedNodes)}
        {editedNodes.slice(-5).reverse().map((node) => {
          // Convert the edit_date string to a Date object
          const editDate = new Date(node.edit_date);
          // Format the date and time strings
          const formattedDate = editDate.toLocaleDateString('en-GB');
          const formattedTime = editDate.toLocaleTimeString('en-GB');
          // Combine the date and time strings
          const formattedDateTime = `${formattedDate} ${formattedTime}`;
          return (
            <li key={node.edit_date} className="edit-cards">
              <div className="node">
                <h3>New</h3>
                <div className="node">
                  <h3>{node.title}</h3>
                  <p>{node.content}</p>
                </div>
                <h3>Old</h3>
                <div className="node">
                  <h3>{node.oldTitle}</h3>
                  <p>{node.oldContent}</p>
                </div>
                <div className="edit-time">
                  <p>Edited on:</p>
                  <p>{formattedDateTime}</p>
                </div>
              </div>

            </li>
          );
        })}
      </ul>
    </div>
  );
};


export default LastEdited;
