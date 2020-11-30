import React, { useEffect, useState } from "react";
import { Media, Button, Modal } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import Comments from "./Comments";

const IssueList = ({ itemList }) => {
  return (
    <ul className="list-unstyled text-justify-left">
      {itemList.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </ul>
  );
};

const Item = ({ item }) => {
  const [show, setShow] = useState(false);
  const [comments, setComments] = useState([]);

  const [loadMore, setLoadMore] = useState("none");
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const url = item.comments_url;
        const res = await fetch(url);
        const data = await res.json();
        setComments(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, [item.comments_url]);

  const handleCloseModal = (x) => {
    setLoadMore("none");
    setShow(x);
  };
  const handleLoadMore = () => {
    // return <Comments key={item.id} item={item} />;
    setLoadMore("block");
    console.log(loadMore, "sdsdfsdfs");
  };

  return (
    <>
      <Media as="li" className="mt-4 text-left">
        <img
          width={150}
          height={150}
          className="mr-3"
          src={item.user.avatar_url}
          alt="User avatar"
        />
        <Button
          className="btn col-10"
          variant="light"
          onClick={() => setShow(true)}
        >
          <Media.Body className="justify-text-left justify-content-start">
            <h2>
              #{item.number} {item.title}
            </h2>
            <div className="text-black-50 text-left">
              <span className="mr-1">@{item.user.login} </span>
              <span>
                Last update: <Moment fromNow>{item.updated_at}</Moment>
              </span>
              <span className="ml-2">Comments: {item.comments}</span>
            </div>
            <div className="small">
              <ReactMarkdown>
                {item.body.length <= 100 ? item.body : item.body.slice(0, 99)}
              </ReactMarkdown>
            </div>
            <div className="d-flex d-row justify-content-start">
              <span className="badge badge-secondary mr-1">
                {item.labels[0]?.name}
              </span>
              <span className="badge badge-secondary mr-1">
                {item.labels[1]?.name}
              </span>
              <span className="badge badge-secondary mr-1">
                {item.labels[2]?.name}
              </span>
            </div>
            <br />
          </Media.Body>
        </Button>
      </Media>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable={true}
        show={show}
        onHide={() => handleCloseModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>{item.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactMarkdown>{item.body}</ReactMarkdown>
          <h2>Comments: </h2>
          <ul className="list-unstyled">
            {comments.map((item, idx) => {
              return idx < 5 && <Comments key={item.id} item={item} />;
            })}
          </ul>
          <ul className="list-unstyled" style={{ display: "none" }}>
            {comments.map((item, idx) => {
              return idx >= 5 && <Comments key={item.id} item={item} />;
            })}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          {item.comments > 5 ? (
            <Button
              variant="secondary"
              justify-content="center"
              onClick={handleLoadMore}
            >
              Load More
            </Button>
          ) : (
            ""
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default IssueList;
