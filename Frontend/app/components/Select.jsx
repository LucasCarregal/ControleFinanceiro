"use client";

import { Select } from "flowbite-react";

export default function Component({ options, selected }) {
  return (
    <>
      <Select>
        {options.map((option) => {
          if (option === selected) return <option selected>{option}</option>;
          return <option>{option}</option>;
        })}
      </Select>
    </>
  );
}
