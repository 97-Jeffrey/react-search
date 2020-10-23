import React, {useState, useEffect} from 'react'
import './App.css';
import axios from 'axios';
import Student from './component/Student'

function App() {

  const [students, setStudent] = useState([]);
  const [name, setName] = useState('');

useEffect(()=>{
  axios.get(`https://api.hatchways.io/assessment/students`)
  .then(response=>{
    console.log(response)
    setStudent(response.data.students)
  })
},[])

  console.log(students)


  
  const studentList = students.map(item=>{
    let totalScore = 0;
    for(const each of item.grades){
      totalScore += parseInt(each);
    }
    let median = totalScore / item.grades.length;
   if(item.firstName.toLowerCase().includes(name) || item.lastName.toLowerCase().includes(name)){
    return(
      <Student 
        key = {item.id}
        item = {item}
        median = {median}
      />
    )
   }
  })

  return (
    <div>
    <input
      value={name}
      onChange = {e=>setName(e.target.value)}
      placeholder='Search by name'
    />

      {studentList}
 
    </div>
  );
}

export default App;
