import React from "react";

const Header = ({ course }) => (
  <div>
    <h1>{course}</h1>
  </div>
);

const Part = ({ part, exercises }) => (
  <div>
    <p>
      {part} {exercises}
    </p>
  </div>
);

// const Content = ({ parts }) => {
//   return (
//     <div>
//       <Part part={parts[0].name} exercises={parts[0].exercises} />
//       <Part part={parts[1].name} exercises={parts[1].exercises} />
//       <Part part={parts[2].name} exercises={parts[2].exercises} />
//     </div>
//   );
// };

const Content = ({ parts }) =>
  parts.map((part) => (
    <Part key={part.id} part={part.name} exercises={part.exercises} />
  ));

const Total = ({ parts }) => {
  const sum = parts.reduce((acc, part) => acc + part.exercises, 0);
  return (
    <div>
      <p>Number of exercises {sum}</p>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
