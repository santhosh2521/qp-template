import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css';
import './Popup.css';
import './home.css';

export const Createtemplate = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([
    ['', '', '', '', ''],
  ]);

  const columns = [
    'Question Number',
    'Subpart',
    'Maximum Marks',
    'CO Number',
    'BT Number',
  ];

  const isFormValid = () => {
    // Add your validation logic here
    // Ensure that all cells have values before allowing submission
    return data.every((row) => row.every((cell) => cell !== ''));
  };

  const handleNext = () => {
    setData((prevData) => [...prevData, ['', '', '', '', '']]);
  };

  const handleSubmit = async () => {
    // Handle the final form submission logic here
    const tableData = data.map((row) => ({
      questionNumber: row[0],
      subpart: row[1],
      maxMarks: row[2],
      coNumber: row[3],
      btNumber: row[4],
    }));
  
    if (tableData.length > 0 && isFormValid()) {
      console.log('Table Data:', tableData);
      // Send the table data to the server or perform any other actions
      try {
        const response = await fetch('http://localhost:8081/create-template', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(tableData),
        });
  
        if (response.ok) {
          console.log('Template created successfully');
          // Clear the table data
          setData([['', '', '', '', '']]);
          
          // Use the navigate function to redirect to coursecoordhome
          navigate('/coursecoordhome');
        } else {
          console.error('Failed to create template');
          // Handle error as needed
        }
      } catch (error) {
        console.error('Error creating template:', error);
        // Handle error as needed
      }
    } else {
      console.error('Table is empty. Add at least one row.');
    }
  };
  

  return (
    <div>
      <div className='template-form'>
        <h2>Create Template</h2>
        <HotTable
          data={data}
          colHeaders={columns}
          rowHeaders={true}
          width='600px'
          height='auto'
          stretchH='all'
          licenseKey='non-commercial-and-evaluation' // Replace with your Handsontable license key
          settings={{
            manualColumnResize: true,
            manualRowResize: true,
          }}
          afterChange={(changes, source) => {
            // Handle changes if needed
          }}
        />
        <div>
          <button type='button' onClick={handleNext}>
            Add Row
          </button>
          <button type='button' onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
