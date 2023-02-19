import React from 'react';

import axios from 'axios'
const url = 'http://localhost:4000'

function FileDownloader({file}) {

  const handleDownload = () => {
    if (file === 'Box') {
        axios.get(`${url}/boxestemplate`, { responseType: 'blob' })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.download = 'Boxes.xlsx';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(error => {
                console.error('Error fetching file', error);
            });
    }
    else if (file === 'Individual') {
        axios.get(`${url}/individualstemplate`, { responseType: 'blob' })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.download = 'Individuals.xlsx';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(error => {
                console.error('Error fetching file', error);
            });
    }
  };

  return (
    <button onClick={handleDownload}>
      Download the template
    </button>
  );
}

export default FileDownloader;