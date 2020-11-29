import React from "react";
import { Media } from "react-bootstrap";
import ReactMarkdown from "react-markdown";

const Comments = ({ item }) => {
  return (
    <Media as="li">
      <img
        width={64}
        height={64}
        className="mr-3"
        src={item.user.avatar_url}
        alt="Generic placeholder"
      />
      <Media.Body>
        <h5>{item.user.login}</h5>
        <div>
          <ReactMarkdown>{item.body}</ReactMarkdown>
        </div>
      </Media.Body>
    </Media>
  );
};

export default Comments;
