import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = () => (
  <div>
    <h1>Give feedback</h1>
  </div>
);

const SubTitle = ({ title }) => (
  <div>
    <h1>{title}</h1>
  </div>
);

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Content = (props) => {
  return (
    <div>
      <Button handleClick={() => props.setGood(props.good + 1)} text="good" />
      <Button
        handleClick={() => props.setNeutral(props.neutral + 1)}
        text="neutral"
      />
      <Button handleClick={() => props.setBad(props.bad + 1)} text="bad" />
    </div>
  );
};

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  if (total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={total} />
        <Statistic text="average" value={(good - bad) / total} />
        <Statistic text="positive" value={good / total} />
      </tbody>
    </table>
  );
};

const anecdotes = [
  "",
  "1- If it hurts, do it more often",
  "2- Adding manpower to a late software project makes it later!",
  "3- The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "4- Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "5- Premature optimization is the root of all evil.",
  "6- Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const Anecdotes = () => {
  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [max, setMax] = useState(0);

  const handleClickAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    random === 0 ? setSelected(1) : setSelected(random);
    if (!random) console.log(random);
  };

  const handleClickVotes = () => {
    vote[selected]++;
    setVote([...vote]);
    const m = vote.indexOf(Math.max(...vote));
    setMax(m);
  };

  if (selected === 0) {
    return (
      <div>
        <h2>Anecdotas</h2>
        <p>Clic para mostrar alguna anecdota.</p>
        <Button handleClick={handleClickAnecdote} text="Anecdota Random" />
      </div>
    );
  }

  return (
    <div>
      <h2>Anecdotas</h2>
      <p>{anecdotes[selected]}</p>
      <Button handleClick={handleClickAnecdote} text="Anecdota Random" />
      <Button handleClick={handleClickVotes} text="Voto" />
      <Vote arrVote={vote} />
      <SubTitle title="Anecdotas con mas votos" />
      <Winner winner={max} />
    </div>
  );
};

const TableVotes = ({ posArr, votes }) => (
  <tr>
    <td>{posArr}</td>
    <td>{votes}</td>
  </tr>
);

const Vote = ({ arrVote }) => {
  return (
    <table>
      <tbody>
        <TableVotes posArr="Anecdota 2" votes={arrVote[1]} />
        <TableVotes posArr="Anecdota 3" votes={arrVote[2]} />
        <TableVotes posArr="Anecdota 4" votes={arrVote[3]} />
        <TableVotes posArr="Anecdota 5" votes={arrVote[4]} />
        <TableVotes posArr="Anecdota 6" votes={arrVote[5]} />
        <TableVotes posArr="Anecdota 1" votes={arrVote[6]} />
      </tbody>
    </table>
  );
};

const Winner = ({ winner }) => {
  if (!winner) return <p>Todavia no hay votos registrados</p>;
  return <p>La anecdota mas votada es la {winner}</p>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header />
      <Content
        good={good}
        neutral={neutral}
        bad={bad}
        setGood={setGood}
        setNeutral={setNeutral}
        setBad={setBad}
      />
      <SubTitle title="Estadisticas" />
      <Statistics good={good} neutral={neutral} bad={bad} />
      <Anecdotes />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
