import React, {useState} from 'react';

import axios from 'axios'
const url = process.env.REACT_APP_IP

function FileDownloader({file, type}) {

  const [downloadstate, setDownloadstate] = useState('');

  const handleDownload = () => {
    setDownloadstate('Veuillez patienter...')
    if (file === 'Box') {
        downloadstate = 'Veuillez patienter...'
        axios.get(`${url}/boxestemplate`, { responseType: 'blob' })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.download = 'Boxes.xlsx';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setDownloadstate('')
            })
            .catch(error => {
                console.error('Error fetching file', error);
                setDownloadstate('Erreur lors de la génération du fichier')
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
                setDownloadstate('')
            })
            .catch(error => {
                console.error('Error fetching file', error);
                setDownloadstate('Erreur lors de la génération du fichier')
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
                setDownloadstate('')
            })
            .catch(error => {
                console.error('Error fetching file', error);
                setDownloadstate('Erreur lors de la génération du fichier')
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
                setDownloadstate('')
            })
            .catch(error => {
                console.error('Error fetching file', error);
                setDownloadstate('Erreur lors de la génération du fichier')
            });
    }
  };

  return (
    <>
    {type === 'template' ?
      ( 
        <>
        <div>
          <button onClick={handleDownload}>
            Download the template (.xslx file)
          </button>
        </div>
        <div>{downloadstate}</div>
        </>
      ) : (
        <>
        <div>
        <button onClick={handleDownload}>
          Download data (.xlsx File)
        </button>
        </div>
        <div>{downloadstate}</div>
        </>
      )
    }
    </>
  );
}

export default FileDownloader;