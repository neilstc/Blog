import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default ({ comments }) => {
  const renderedComments = comments.map(comment => {
    let content = comment.content;
    if(comment.status === "approved") comment.content = content;
    else if(comment.status === "rejected") content = "comment rejected";
    else if(comment.status === "pending") content = "content pending";
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};
