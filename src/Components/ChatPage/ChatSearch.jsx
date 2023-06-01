import React from 'react'

const ChatSearch = () => {
  return (
    <div className='chatSearch'>
      <div className="searchForm">
        <input type="text" placeholder='find user' />
      </div>
      <div className="userChat">
        <img src="https://images.unsplash.com/photo-1504593811423-6dd665756598?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" />
        <div className="userChatinfo">
            <span>achu</span>
            <p>hello</p>
        </div>
      </div>
    </div>
  )
}

export default ChatSearch
