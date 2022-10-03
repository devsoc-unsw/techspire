const DateTimeDisplay = ({value, type}) => {
    return (
        <>
            <text class="font-bold xl:text-8xl">{value}</text> <text class="xl:text-4xl">{type} </text> 
        </>        
    )
}

const ShowCounter = ({ days, hours, minutes, seconds }) => {
    return (
        <div className="bg-green-100">
            <DateTimeDisplay value={days} type={'DAYS'}/> <DateTimeDisplay value={hours} type={'HOURS'}/> <DateTimeDisplay value={minutes} type={'MINUTES'}/> <DateTimeDisplay value={seconds} type={'SECONDS'}/>
        </div>
    );
};

export default ShowCounter;