import React, { useEffect, useState } from 'react';
import { fetchUserPosts } from '../api/post';
import { XAxis, CartesianGrid, YAxis, Bar, ResponsiveContainer, ComposedChart, Tooltip } from 'recharts';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

const Stats = () => {
  const [data, setData] = useState(null);
  const [inc, setInc] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [field, setField] = useState('project_time');
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

  const fieldValuelabels = {
    project_time: 'Time (min)',
    book_page_count: 'Pages read',
    video_time_count: 'Time (min)',
    wpm_count: 'Words per min',
    meditation_time: 'Time (min)'
  };

  const toolTipLabels = {
    project_time: 'min',
    book_page_count: 'pages',
    video_time_count: 'min',
    wpm_count: 'wpm',
    meditation_time: 'min'
  };

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
          book_title: recordedDay.book_title,
          meditation_time: recordedDay.meditation_time,
          project_time: recordedDay.project_time,
          project_title: recordedDay.project_title,
          video_time_count: recordedDay.video_time_count,
          video_title: recordedDay.video_title,
          wpm_count: recordedDay.wpm_count
        };
      } else {
        return {
          name: day.split('-')[2],
          book_page_count: 0,
          book_title: '',
          meditation_time: 0,
          project_time: 0,
          project_title: '',
          video_time_count: 0,
          video_title: '',
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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      console.log(payload[0]);
      let title = '';
      if (payload[0].name === 'book_page_count') {
        title = payload[0].payload.book_title;
      } else if (payload[0].name === 'project_time') {
        title = payload[0].payload.project_title;
      } else if (payload[0].name === 'video_time_count') {
        title = payload[0].payload.video_title;
      }

      return (
        <div className="custom-tooltip bg-gray-300 px-2 py-1">
          {title && <p>{title}</p>}
          <p>
            {displayedMonth.split(' ')[0].substring(0, 3)} {label}
          </p>
          <p>
            {payload[0].value} {toolTipLabels[payload[0].name]}
          </p>
        </div>
      );
    }

    return null;
  };

  useEffect(() => {
    setShits();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {loading && <LoadingSpinner />}

      {!loading && error && <p className="text-red-600 text-lg text-center px-2 mt-5">{error}</p>}

      {!loading && data && (
        <div className="w-full relative" style={{ height: '72vh', maxHeight: '600px' }}>
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

          <div className="h-full relative right-5 max-w-5xl mx-auto mt-8 text-gray-800" style={{ width: '100%' }}>
            <p className="ml-8 text-gray-400 absolute -top-6">{fieldValuelabels[field]}</p>
            <ResponsiveContainer>
              <ComposedChart width={500} height={400} data={data}>
                <CartesianGrid stroke="#707d99" strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                {field === 'project_time' && <Bar dataKey="project_time" fill="#8884d8" />}
                {field === 'book_page_count' && <Bar dataKey="book_page_count" fill="#8884d8" />}
                {field === 'video_time_count' && <Bar dataKey="video_time_count" fill="#8884d8" />}
                {field === 'wpm_count' && <Bar dataKey="wpm_count" fill="#8884d8" />}
                {field === 'meditation_time' && <Bar dataKey="meditation_time" fill="#8884d8" />}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full flex justify-center mt-1">
            <select onChange={e => setField(e.target.value)} value={field} className="text-gray-900 text-lg py-1 px-2">
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
