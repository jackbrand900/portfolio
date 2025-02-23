import React, { useState, useEffect } from 'react';
import './Education.css';

export default function Education() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [education, setEducation] = useState([]);
    const baseUrl = 'http://127.0.0.1:8000/portfolio/education'
    const getEducation = () => {
        setLoading(true);
        fetch(baseUrl + '/get-all')
        .then(response => {
            if (!response.ok){
                throw new Error('Could not retrieve education');
            }
            return response.json();
        }).then(data => {
            setEducation(data);
            setLoading(false);
        }).catch(error => {
            setError(error);
            setLoading(false);
        });
    };

    useEffect(() => {
        getEducation();
    }, []);

    if (loading) return <div>Loading education...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='education-box fade-in'>
            <h2>Education: </h2>
            <ul className='education-list'>
                {education.map(education => (
                    <li className='education-item' key={education.id}>
                        {education.degree} from {education.institution}
                    </li>
                ))}
            </ul>
        </div>
    );
}