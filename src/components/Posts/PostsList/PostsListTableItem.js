import React from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaVideo, FaExternalLinkAlt, FaWrench, FaPrayingHands, FaKeyboard } from 'react-icons/fa';

const PostsListTaleItem = ({ post }) => {
  const notes = post.notes.split('\n');
  const to_learn = post.to_learn.split('\n');

  return (
    <li className="m-3">
      <div className="bg-gray-100 text-gray-700 p-2">
        <Link to={`/posts/${post.date_title}`}>
          <h2 className="font-bold text-lg hover:text-gray-500 flex items-center">
            {post.date_title}
            <span className="ml-2 text-base">
              <FaExternalLinkAlt />
            </span>
          </h2>
        </Link>

        {post.notes && (
          <p>
            {notes.map(note => (
              <>
                {note}
                <br />
              </>
            ))}
          </p>
        )}

        {post.book_title && (
          <p className="flex items-center">
            <span className="mr-2">
              <FaBook />
            </span>
            {post.book_title} (read {post.book_page_count} pages)
          </p>
        )}

        {post.video_title && (
          <p className="flex items-center">
            <span className="mr-2">
              <FaVideo />
            </span>
            <a
              href={post.video_link}
              target="_blank"
              rel="noopenner noreferrer"
              className="underline hover:text-gray-500"
            >
              {post.video_title}
            </a>
            &nbsp;(watched {post.video_time_count} min)
          </p>
        )}

        {post.project_title && (
          <p className="flex items-center">
            <span className="mr-2">
              <FaWrench />
            </span>
            {post.project_title} (spent {post.project_time} min on it)
          </p>
        )}

        {post.meditation_time > 0 && (
          <p className="flex items-center">
            <span className="mr-2">
              <FaPrayingHands />
            </span>
            Meditated {post.meditation_time} min
          </p>
        )}

        {post.wpm_count > 0 && (
          <p className="flex items-center">
            <span className="mr-2">
              <FaKeyboard />
            </span>
            Typing speed: {post.wpm_count} words per minute
          </p>
        )}

        {post.to_learn && (
          <p className="mt-1">
            <span className="font-bold">To learn:</span>
            <ul className="pl-6">
              {to_learn.map(el => (
                <li className="list-disc">{el}</li>
              ))}
            </ul>
          </p>
        )}
      </div>
    </li>
  );
};

export default PostsListTaleItem;
