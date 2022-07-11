import React, { useState } from 'react';
import {
  teachersList,
  students,
  teachersByLevel,
} from '../../entities';

import './schedule-today.styles.scss';



const ScheduleToday = () => {
  const [teachers, setTeachers] = useState(teachersList);


  const onSelectChange = (e, i) => {
    let val = e.target.value;
    const newTeachers = [...teachers];
    newTeachers[i].attendance = val;
    setTeachers(newTeachers);
    // console.log({newTeachers});
  }

  const isTeacherPresent = (currentTeacher) => {
    const teacherObj = teachers.filter((teacher, i) => teacher.name === currentTeacher);
    // console.log(teacherObj, currentTeacher);
    return teacherObj?.[0]?.attendance === 'Present';
  }

  const findTeacher = (subject) => {
    const maxLevels = Object.keys(teachersByLevel).length;

    for(let i = 0; i < maxLevels; i++) {
      const currentTeacher = teachersByLevel[i+1][subject] || teachersByLevel[i+1]["*"];
      if(isTeacherPresent(currentTeacher)) {
        return currentTeacher;
      }
    }
    return 'Not Assigned';
  }

  const getTeacher = (subject, currentTeacher) => {
    if(isTeacherPresent(currentTeacher)) {
      return currentTeacher;
    }
    return findTeacher(subject);
  }

  return(
    <>
      <h2>Hogwarts Today's Schedule</h2>
      <div className="main-container">
        <div className="attendance-container">
          <h3>Attendance</h3>
          <div className="attendance-gridX">
            <div className="teachers-container">
              <ul className="teachers">
                <li className="list-item">
                  <span className="col-teachers">Teacher(s)</span>
                  <span className="col-attendance">Attendance</span>
                </li>
                {
                  teachers.map((teacher,i)=>{
                    return(
                      <li className="list-item" key={i}>
                        <span className="col-teachers">{teacher.name}</span>
                        <span className="col-attendance">
                          <select name="attendanceDropdown" id="attendanceDropdown" className="attendance-dropdown"
                                  onChange={e => onSelectChange(e, i)}
                          >
                            <option value={teacher.attendance === 'Present'}>Present</option>
                            <option value={teacher.attendance === 'Absent'}>Absent</option>
                          </select>
                        </span>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </div>

        <div className="schedule-container">
          <h3>Schedule</h3>
          <ul className="schedule">
            <li className="list-item">
              <span className="col-student">Student</span>
              <span className="col-subject">Subject</span>
              <span className="col-teacher">Teacher</span>
            </li>
            {
              Object.keys(students).map((student, i)=>{
                return(
                  <li className="list-item" key={i}>
                    <span className="col-student">{student}</span>
                    <span className="col-subject">{students[student].subject}</span>
                    <span className="col-teacher">{getTeacher(students[student].subject, students[student].teacher)}</span>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default ScheduleToday;