import React from 'react';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ScheduleToday from './schedule-today.component';


describe('schedule today component', ()=>{
  it('Component should render', () => {
    // Arrange
    render(<ScheduleToday/>);

    // Act

    // Assert
    expect(screen.queryByText(`Hogwarts Today's Schedule`)).toBeTruthy();
  });

  it('Component should render list of students', () => {
    // Arrange
    const { container } = render(<ScheduleToday/>);

    // Act

    // Assert
    const students = container.querySelectorAll('.schedule-container .list-item');
    expect(students.length).toBe(7);
  });

  it('Component should render list of teachers', () => {
    // Arrange
    const { container } = render(<ScheduleToday/>);

    // Act

    // Assert
    const teachers = container.querySelectorAll('.attendance-container .list-item');
    expect(teachers.length).toBe(9);
  });

  it('Schedule should be updated if teacher is Absent', async () => {
    // Arrange
    const { container } = render(<ScheduleToday/>);

    // Act
    const dropdown = container.querySelectorAll('.attendance-container .list-item select')[4];
    const harryPotterSchedule = container.querySelectorAll('.schedule-container .list-item')[1];

    fireEvent.change(dropdown, { target: { value: 'Absent' } })

    console.log('Tacking', harryPotterSchedule.textContent);
    // Assert
    // expect(harryPotterSchedule.textContent.includes('Rubeus Hagrid')).toBeTruthy();
  })


})