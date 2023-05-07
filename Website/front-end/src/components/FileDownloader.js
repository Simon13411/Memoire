import React, {useState} from 'react';

import axios from 'axios'
const url = process.env.REACT_APP_IP

function FileDownloader({path, filename, type}) {

    const [downloadstate, setDownloadstate] = useState('');

    const handleDownload = () => {
        setDownloadstate('Please wait... Operation can take minutes to complete')
        axios.get(`${url}${path}`, { responseType: 'blob' })
        .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setDownloadstate('')
        })
        .catch(error => {
            console.error('Error fetching file', error);
            setDownloadstate('Error fecthing file')
        });
    };

    return (
        <>
        {type === 'template' &&
            <>
                <div>
                    <button onClick={handleDownload}>
                        Download the template (.xslx file)
                    </button>
                </div>
                <div>{downloadstate}</div>
            </>
        }
        {type === 'data' &&
            <>
                <div>
                    <button onClick={handleDownload}>
                        Download data (.xlsx file)
                    </button>
                </div>
                <div>{downloadstate}</div>
            </>
        }
        {type === 'instructions' &&
            <>
                <div>
                    <button onClick={handleDownload}>
                        Download instructions (.pdf file)
                    </button>
                </div>
                <div>{downloadstate}</div>
            </>
        }
        </>
    );
}

export default FileDownloader;