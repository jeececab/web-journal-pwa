import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { createPost, fetchPost, updatePost } from '../../../api/post';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import LoadingSpinner from '../../LoadingSpinner';

const PostForm = () => {
  let { postId } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  const [date, setDate] = useState('');
  const [mode, setMode] = useState(null);
  const defaultDay = {
    date_title: '',
    notes: '',
    book_title: '',
    book_page_count: 0,
    video_title: '',
    video_link: '',
    video_time_count: 0,
    project_title: '',
    project_time: 0,
    meditation_time: 0,
    wpm_count: 0,
    to_learn: ''
  };
  const [day, setDay] = useState(defaultDay);

  const today = new Date().toLocaleString('en-CA', { timeZone: 'America/New_York' }).split(',')[0];

  const splitDate = postId === 'new' ? today.split('-') : postId.split('-');
  const mmddyyyy = `${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`;
  const dateObj = new Date(mmddyyyy);

  async function submitPost(e) {
    e.preventDefault();

    setLoading(true);

    if (postId === 'new' || mode === 'new') {
      const result = await createPost(day);
      if (!result.post) return setError(result.error);
      history.push(`/posts/${result.post.date_title}`);
      setTimeout(() => {
        setSaved(false);
      }, 3000);
    } else {
      const result = await updatePost(postId, day);
      if (!result.post) return result.error;
      setTimeout(() => {
        setSaved(false);
      }, 3000);
    }
    setLoading(false);
    setSaved(true);
    setError(null);
  }

  async function getPost(date_title) {
    setLoading(true);

    const result = await fetchPost(date_title);

    if (!result.post) {
      setDate(date_title);
      setDay({ ...defaultDay, date_title });
      setMode('new');
    } else {
      setDay(result.post);
      setDate(result.post.date_title);
      setMode(null);
    }

    setLoading(false);
  }

  function back() {
    dateObj.setDate(dateObj.getDate() - 1);
    const yesterday = dateObj.toLocaleString('en-CA', { timeZone: 'America/New_York' }).split(',')[0];
    history.push(`/posts/${yesterday}`);
  }

  function forward() {
    dateObj.setDate(dateObj.getDate() + 1);
    const yesterday = dateObj.toLocaleString('en-CA', { timeZone: 'America/New_York' }).split(',')[0];
    history.push(`/posts/${yesterday}`);
  }

  useEffect(() => {
    if (postId === 'new') {
      setDate(today);
      setDay({ ...day, date_title: today });
      getPost(today);
    } else {
      if (postId > today) {
        history.push('/posts/new');
      } else {
        getPost(postId);
      }
    }
    //eslint-disable-next-line
  }, [postId]);

  return (
    <>
      {loading && <LoadingSpinner />}

      {!loading && (
        <div className="mx-auto w-11/12 max-w-md pb-10">
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
              <label htmlFor="video_time_count">How long did I watch (minutes):</label>
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
              <label htmlFor="project_title">The project I'm working on:</label>
              <input
                id="project_title"
                value={day.project_title}
                onChange={e => setDay({ ...day, project_title: e.target.value })}
                className="w-full mb-3 mx-auto px-2 py-1 text-gray-800"
                name="project_title"
                placeholder="Project I'm working on"
                type="text"
                maxLength="200"
              />
            </p>

            <p>
              <label htmlFor="project_time">How long I worked on the project (minutes):</label>
              <input
                id="project_time"
                value={day.project_time}
                onChange={e => setDay({ ...day, project_time: Number(e.target.value) })}
                className="w-full mb-3 mx-auto px-2 py-1 text-gray-800"
                name="project_time"
                placeholder="How long I worked on the project"
                type="number"
                min="0"
              />
            </p>

            <p>
              <label htmlFor="meditation_time">How long I meditated (minutes):</label>
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
              <label htmlFor="wpm_count">Word per minute count:</label>
              <input
                id="wpm_count"
                value={day.wpm_count}
                onChange={e => setDay({ ...day, wpm_count: Number(e.target.value) })}
                className="w-full mb-3 mx-auto px-2 py-1 text-gray-800"
                name="wpm_count"
                placeholder="Word per minute count"
                type="number"
                min="0"
              />
            </p>

            <p>
              <label htmlFor="to_learn">What I want to learn:</label>
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

            {error && <p className="text-red-600 mt-2 mb-1 text-center">{error}</p>}

            {saved && (
              <div className="bg-green-600 fixed  bottom-0 left-0 w-full pt-1 pb-2">
                <p className="text-white mt-2 mb-1 text-center text-lg">Saved!</p>
              </div>
            )}

            <div className="flex items-center">
              <div onClick={back} className="text-4xl w-10 text-green-600 hover:text-green-500 cursor-pointer">
                <FaArrowAltCircleLeft />
              </div>
              <button
                type="submit"
                className="block w-40 border-green-600 hover:border-green-500 text-green-600 hover:text-green-500 font-bold text-xl border-2 my-4 mx-auto py-2"
              >
                Save
              </button>
              <div onClick={forward} className="text-4xl w-10 text-green-600 hover:text-green-500 cursor-pointer">
                {postId < today && <FaArrowAltCircleRight />}
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default PostForm;
