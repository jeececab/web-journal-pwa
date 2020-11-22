import React, { useContext } from 'react';
import PostsContext from '../../../contexts/PostsContext';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

const Pagination = () => {
  const { meta, options, setPostsList } = useContext(PostsContext);

  return (
    <div className="flex w-full justify-between mb-12 mt-6 px-3 text-lg">
      <span
        onClick={() => setPostsList({ ...options, skip: options.skip - 1 })}
        className="text-green-600 hover:text-green-500 text-4xl cursor-pointer w-9"
      >
        {meta.currentPage > 1 && <FaArrowAltCircleLeft />}
      </span>

      {meta.currentPage > 2 && (
        <span
          className="cursor-pointer hover:text-gray-400"
          onClick={() => setPostsList({ ...options, skip: options.skip - 2 })}
        >
          {meta.currentPage - 2}
        </span>
      )}

      {meta.currentPage > 1 && (
        <span
          className="cursor-pointer hover:text-gray-400"
          onClick={() => setPostsList({ ...options, skip: options.skip - 1 })}
        >
          {meta.currentPage - 1}
        </span>
      )}

      <span className="border-b-2 h-7 font-bold">{meta.currentPage}</span>

      {meta.currentPage < meta.totalPages && (
        <span
          className="cursor-pointer hover:text-gray-400"
          onClick={() => setPostsList({ ...options, skip: options.skip + 1 })}
        >
          {meta.currentPage + 1}
        </span>
      )}

      {meta.currentPage < meta.totalPages - 1 && (
        <span
          className="cursor-pointer hover:text-gray-400"
          onClick={() => setPostsList({ ...options, skip: options.skip + 2 })}
        >
          {meta.currentPage + 2}
        </span>
      )}

      <span
        onClick={() => setPostsList({ ...options, skip: options.skip + 1 })}
        className="text-green-600 hover:text-green-500 text-4xl cursor-pointer w-9"
      >
        {meta.currentPage < meta.totalPages && <FaArrowAltCircleRight />}
      </span>
    </div>
  );
};

export default Pagination;
