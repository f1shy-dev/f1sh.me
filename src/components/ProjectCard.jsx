/* eslint-disable react/prop-types */

import React from 'react';
export const ProjectCard = (props) => (
  <div
    className={`shadow-lg rounded-md bg-[#333436] flex flex-col py-4 px-8 text-left w-full mb-2`}
  >
    <span
      className={`text-base font-semibold font-mono no-underline`}
    >
      {props.name}
    </span>
    <span className={`text-sm text-gray-400 font-mono`}>
      {props.desc}
    </span>
    {props.comingSoon && (
      <div>
        <div
          className={`rounded-full text-xs bg-blue-400 py-1 px-2 inline-block font-bold`}
        >
          Coming Soon
        </div>
      </div>
    )}
  </div>
);
