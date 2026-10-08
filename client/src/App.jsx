import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [students, setStudents] = useState([]);
  const [editingID, setEditingID] = useState(null);
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [age, setAge] = useState('');

useEffect(() => {
  axios.get('http://localhost:5000/students')
    .then(response => {
      setStudents(response.data);
    })
}, []);

  const handleEdit = (id) => {
    const editStudentID = students.find(student => student._id === id);
    setName(editStudentID.name);
    setCourse(editStudentID.course);
    setAge(editStudentID.age);
    setEditingID(id);
  };


  return (
    <>
      <h1>Student Management System</h1>
      <br></br>

      <h2>Add Student</h2>
      <input 
        placeholder='Name' 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <br></br>
      
      <input 
        placeholder='Course' 
        value={course} 
        onChange={(e) => setCourse(e.target.value)} 
      />
      <br></br>
      
      <input 
        placeholder='Age' 
        value={age} 
        onChange={(e) => setAge(e.target.value)} 
      />
      <br></br>

      <button onClick={() => {
        if(editingID){
          axios.put(`http://localhost:5000/students/${editingID}`, {name, course, age})
          .then(response => {
            setStudents(students.map(student => 
              student._id === editingID ? response.data : student
            ));
            setEditingID(null);
            setName('');
            setCourse('');
            setAge('');
          })
        } else {
          axios.post('http://localhost:5000/students', { name, course, age })
          .then(response => {
            setStudents([...students, response.data]);
            setName('');
            setCourse('');
            setAge('');
            setEditingID(null);
          });
        };
      }}>
       {editingID ? "Update Student" : "Add Student"}
      </button>

      <h2>Students</h2>

      {students.map((student) => (
        <div key={student.id}>
          <p>Name: {student.name}</p>
          <p>Course: {student.course}</p>
          <p>Age: {student.age}</p>
          <br/>
          <button onClick={() => {handleEdit(student._id)}}>
              Edit
          </button>
          <button onClick={() => {
            axios.delete(`http://localhost:5000/students/${student._id}`)
              .then(() => {
                setStudents(students.filter(s => s._id !== student._id));
              });
          }}>
            Delete
          </button>
          <br></br>
        </div>
      ))}
    </>
  )
}

export default App
