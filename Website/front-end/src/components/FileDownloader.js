import React from 'react';

import axios from 'axios'
const url = process.env.REACT_APP_IP

function FileDownloader({file, type}) {

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
    else if (file === 'BoxSQL') {
      axios.get(`${url}/boxessqltocsv`, { responseType: 'blob' })
          .then(response => {
              const url = window.URL.createObjectURL(new Blob([response.data]));
              const link = document.createElement('a');
              link.href = url;
              link.download = 'BoxesData.xlsx';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
          })
          .catch(error => {
              console.error('Error fetching file', error);
          });
    }
    else if (file === 'IndividualSQL') {
      axios.get(`${url}/individualssqltocsv`, { responseType: 'blob' })
          .then(response => {
              const url = window.URL.createObjectURL(new Blob([response.data]));
              const link = document.createElement('a');
              link.href = url;
              link.download = 'IndividualsData.xlsx';
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
    <>
    {type === 'template' ?
      ( 
        <button onClick={handleDownload}>
          Download the template (.xslx file)
        </button>
      ) : (
        <button onClick={handleDownload}>
          Download data (.xlsx File)
        </button>
      )
    }
    </>
  );
}

export default FileDownloader;