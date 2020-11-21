import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { createPost, fetchPost } from '../../api/post';

const PostForm = () => {
  const { postId } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState('');
  const [day, setDay] = useState({
    _id: '',
    notes: '',
    book_title: '',
    book_page_count: '',
    video_title: '',
    video_link: '',
    video_time_count: '',
    meditation_time: '',
    to_learn: ''
  });

  async function submitPost(e) {
    e.preventDefault();

    setLoading(true);

    if (postId === 'new') {
      const result = await createPost(day);
      if (!result.post) return setError(result.error);
      history.push(`/posts/${result.post._id}`);
    }
    setLoading(false);
  }

  async function getPost(_id) {
    const result = await fetchPost(_id);

    if (!result.post) {
      history.push('/posts/new');
    } else {
      setDay(result.post);
      setDate(result.post._id);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (postId === 'new') {
      const today = new Date();
      const dateString = today.toISOString().split('T')[0];
      setDate(dateString);
      setDay({ ...day, _id: dateString });
      setLoading(false);
    } else {
      getPost(postId);
    }
    //eslint-disable-next-line
  }, [postId]);

  return (
    <>
      {loading && <p>Loading...</p>}

      {!loading && (
        <div className="mx-auto w-11/12 max-w-md">
          <h2 className="text-center text-2xl my-4">{date}</h2>

          <form onSubmit={submitPost}>
            <p>
              <label htmlFor="notes">Today's notes: </label>
              <textarea
                id="notes"
                value={day.notes}
                onChange={e => setDay({ ...day, notes: e.target.value })}
                className="w-full mb-2 mx-auto px-2 py-1 text-gray-800"
                name="notes"
                placeholder="Notes"
                maxLength="300"
              />
            </p>
            <p>
              <label htmlFor="book_title">The book I'm reading:</label>
              <input
                id="book_title"
                value={day.book_title}
                onChange={e => setDay({ ...day, book_title: e.target.value })}
                className="w-full mb-3 mx-auto px-2 py-1 text-gray-800"
                name="book_title"
                placeholder="Book I'm reading"
                type="text"
                maxLength="100"
              />
            </p>

            <p>
              <label htmlFor="book_page_count">How many pages I read:</label>
              <input
                id="book_page_count"
                value={day.book_page_count}
                onChange={e => setDay({ ...day, book_page_count: Number(e.target.value) })}
                className="w-full mb-3 mx-auto px-2 py-1 text-gray-800"
                name="book_page_count"
                placeholder="Number of pages I read"
                type="number"
                min="0"
              />
            </p>

            <p>
              <label htmlFor="video_title">The video tutorial I watched:</label>
              <input
                id="video_title"
                value={day.video_title}
                onChange={e => setDay({ ...day, video_title: e.target.value })}
                className="w-full mb-3 mx-auto px-2 py-1 text-gray-800"
                name="video_title"
                placeholder="Video tutorial I watched"
                type="text"
                maxLength="200"
              />
            </p>

            <p>
              <label htmlFor="video_link">Video tutorial link:</label>
              <input
                id="video_link"
                value={day.video_link}
                onChange={e => setDay({ ...day, video_link: e.target.value })}
                className="w-full mb-3 mx-auto px-2 py-1 text-gray-800"
                name="video_link"
                placeholder="Video tutorial link"
                type="text"
                maxLength="400"
              />
            </p>

            <p>
              <label htmlFor="video_time_count">How long did I watch</label>
              <input
                id="video_time_count"
                value={day.video_time_count}
                onChange={e => setDay({ ...day, video_time_count: Number(e.target.value) })}
                className="w-full mb-3 mx-auto px-2 py-1 text-gray-800"
                name="video_time_count"
                placeholder="How long did I watch"
                type="number"
                min="0"
              />
            </p>

            <p>
              <label htmlFor="meditation_time">How long I meditated</label>
              <input
                id="meditation_time"
                value={day.meditation_time}
                onChange={e => setDay({ ...day, meditation_time: Number(e.target.value) })}
                className="w-full mb-3 mx-auto px-2 py-1 text-gray-800"
                name="meditation_time"
                placeholder="How long I meditated"
                type="number"
                min="0"
              />
            </p>

            <p>
              <label htmlFor="to_learn">What I want to learn</label>
              <textarea
                id="to_learn"
                value={day.to_learn}
                onChange={e => setDay({ ...day, to_learn: e.target.value })}
                className="w-full mb-1 mx-auto px-2 py-1 text-gray-800"
                name="to_learn"
                placeholder="What do I want to learn"
                maxLength="300"
              />
            </p>

            {error && <p className="text-red-600 my-3 text-center">{error}</p>}

            <p>
              <button type="submit" className="block w-40 border-gray-50 border-2 my-4 mx-auto py-2">
                Save
              </button>
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default PostForm;
