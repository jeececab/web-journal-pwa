import React, { useEffect, useState } from 'react';
import { fetchUserPosts } from '../api/post';
import { XAxis, CartesianGrid, YAxis, Bar, ResponsiveContainer, ComposedChart } from 'recharts';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

const Stats = () => {
  const [data, setData] = useState(null);
  const [inc, setInc] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayedMonth, setDisplayedMonth] = useState(null);
  const params = { limit: 31, skip: 0, sort: 'asc' };
  const now = new Date();

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  function getDaysInMonth(month, year) {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days.map(day => day.toLocaleString('en-CA', { timeZone: 'America/New_York' }).split(',')[0]);
  }

  async function getStats(options) {
    setLoading(true);
    const result = await fetchUserPosts(options);
    if (!result) return setError('Failed to fetch data');

    const m = Number(options.month.split('-')[1]) - 1;
    const y = Number(options.month.split('-')[0]);
    const monthDays = getDaysInMonth(m, y);

    const mappedResult = monthDays.map(day => {
      const recordedDay = result.posts.find(post => post.date_title === day);

      if (recordedDay) {
        return {
          name: recordedDay.date_title.split('-')[2],
          book_page_count: recordedDay.book_page_count,
          meditation_time: recordedDay.meditation_time,
          project_time: recordedDay.project_time,
          video_time_count: recordedDay.video_time_count,
          wpm_count: recordedDay.wpm_count
        };
      } else {
        return {
          name: day.split('-')[2],
          book_page_count: 0,
          meditation_time: 0,
          project_time: 0,
          video_time_count: 0,
          wpm_count: 0
        };
      }
    });

    setDisplayedMonth(`${monthNames[options.month.split('-')[1] - 1]} ${options.month.split('-')[0]}`);
    setData(mappedResult);
    setLoading(false);
  }

  function moveMonth(num) {
    setInc(inc + num);
    now.setMonth(now.getMonth() + (inc + num));
    setShits();
  }

  function setShits() {
    const t = now.toLocaleString('en-CA', { timeZone: 'America/New_York' }).split(',')[0];
    const month = Number(t.split('-')[1]);
    const year = Number(t.split('-')[0]);
    setDisplayedMonth(`${monthNames[month]} ${year}`);
    getStats({ ...params, month: `${year}-${month}` });
  }

  useEffect(() => {
    setShits();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {loading && <LoadingSpinner />}

      {!loading && error && <p className="text-red-600 text-lg text-center px-2 mt-5">{error}</p>}

      {!loading && data && (
        <div className="w-full relative" style={{ height: '75vh', maxHeight: '600px' }}>
          <div className="flex items-center justify-between px-4 mt-1 mb-3">
            <span
              onClick={() => moveMonth(-1)}
              className="text-green-600 hover:text-green-500 text-4xl cursor-pointer w-9"
            >
              <FaArrowAltCircleLeft />
            </span>
            <h2 className="text-xl text-center">{displayedMonth}</h2>
            <span
              onClick={() => moveMonth(1)}
              className="text-green-600 hover:text-green-500 text-4xl cursor-pointer w-9"
            >
              <FaArrowAltCircleRight />
            </span>
          </div>

          <div className="h-full relative right-5 max-w-5xl mx-auto" style={{ width: '100%' }}>
            <ResponsiveContainer>
              <ComposedChart width={500} height={400} data={data}>
                <CartesianGrid stroke="#707d99" strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                {/*  <Legend /> */}
                <Bar dataKey="book_page_count" fill="#8884d8" />
                {/*  <Bar dataKey="pages" fill="#82ca9d" /> */}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full flex justify-center mt-1">
            <select className="text-gray-900 text-lg py-1 px-2">
              <option value="project_time">Project</option>
              <option value="book_page_count">Book</option>
              <option value="video_time_count">Video</option>
              <option value="wpm_count">WPM</option>
              <option value="meditation_time">Meditation</option>
            </select>
          </div>
        </div>
      )}
    </>
  );
};

export default Stats;
