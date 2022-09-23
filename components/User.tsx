import { useState } from "react";
import createNewPost from "../utils/createNewPost";
import Post from "./Post";
import styles from "./User.module.css";
import * as ReactBootStrap from 'react-bootstrap';

type Props = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export default function User({ id, name, username, email }: Props) {

  const [values, setvalues] = useState({
    title: '',
    body: ''
  });
  const [postData, setPostData] = useState([]);
  const [isShown, setValue] = useState(false);

  const getPosts = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
      .then((res) => res.json())
      .then((json) => {
        setPostData(json);
        setValue(!isShown)
      });
  }

  const post = (id) => {
    console.log(values);
    createNewPost(values.title, values.body, id)
      .then((res) => {
        setPostData([...postData, res]);
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setvalues({
      ...values,
      [name] : value
    })
  }

  return (
    <>
      <div className={styles.User} onClick={() => getPosts(id)}>
        {name} - {username} - {email}
      </div>

      <div className={styles.create}>
        {isShown && (
          <ReactBootStrap.Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Body</th>
                </tr>
              </thead>
              <tbody>
                {postData && postData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.body}</td>
                  </tr>
                  ))}
              </tbody>
          </ReactBootStrap.Table>)}
      </div>

      <div className={styles.create}>
        {isShown && (
          <label>Title : <input type="text" name="title" value={values.title} onChange={handleChange}/></label>
        )}
      </div>

      <div className={styles.create}>
        {isShown && (
          <label>Body : <textarea name="body" value={values.body} onChange={handleChange}/></label>
        )}
      </div>

      <div className={styles.create}>
        {isShown && (
          <button onClick={() => post(id)}>Post</button>
        )}
      </div>

    </>
  );
}
