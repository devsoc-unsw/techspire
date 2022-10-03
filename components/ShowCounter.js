const DateTimeDisplay = ({ value, type }) => {
  return (
    <>
      <span className="xl:span-8xl font-bold ">{value}</span>{" "}
      <span className="xl:span-4xl">{type} </span>
    </>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="bg-green-100">
      <DateTimeDisplay value={days} type={"DAYS"} />{" "}
      <DateTimeDisplay value={hours} type={"HOURS"} />{" "}
      <DateTimeDisplay value={minutes} type={"MINUTES"} />{" "}
      <DateTimeDisplay value={seconds} type={"SECONDS"} />
    </div>
  );
};

export default ShowCounter;
