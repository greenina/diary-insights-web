import data from './Data/anne_diary.json';
import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

function App() {
  const [selectedDate, setSelectedDate] = useState('1942-06-14');

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const filteredData = data.filter(item => {
    console.log("Selected : ", selectedDate)
    return item.date === selectedDate
  });

  useEffect(() => {
    console.log("DATE: ", data[0].written_date)
    console.log("DATA: ", JSON.parse(data[0].emotion_count.replace(/'/g, '"')))
  },[])

  return (
    <div className="App">
      <h1>Anne Frank's Diary Analysis</h1>

      <select onChange={handleDateChange}>
        {data.map(item => (
          <option value={item.written_date}>{item.written_date}</option>
        ))}
      </select>

      {filteredData && (
        <Plot
        data={[
          {
            values: Object.values(JSON.parse(filteredData[0].emotion_count.replace(/'/g, '"'))),
            labels: Object.keys(JSON.parse(filteredData[0].emotion_count.replace(/'/g, '"'))),
            type: 'pie',
            textinfo: 'label+percent',
            textposition: 'inside',
            automargin: true,
          }
        ]}
        layout={{
          title: "Today's Mood",
          height: 400,
          width: 500,
          margin: {"t": 0, "b": 0, "l": 0, "r": 0},
          showlegend: false
        }}
      />      
      )}
    </div>
  );
}

export default App;
