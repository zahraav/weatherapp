import React from 'react';
import './info.css'; 

const Info = () => {
    return (
        <div className="info-container">
            <div className="personal-info">
                <h2>About Me</h2>
                <p>Hi! I'm Zara Vafadoost, a Full stack developer developer who loves building apps!</p>
                <p>I enjoy working with JavaScript, React, and other modern technologies.
                    and I did this project to join an Accelerator Program as a software developer
                </p>
            </div>
            <div className="company-info">
                <h2>About PM Accelerator Program</h2>
                <p>The Product Manager Accelerator Program is designed to support PM professionals 
                through every stage of their careers. From students looking for entry-level jobs to
                 Directors looking to take on a leadership role, our program has helped over 
                 hundreds of students fulfill their career aspirations.</p>

                <p>Our Product Manager Accelerator community are ambitious and committed. 
                    Through our program they have learnt, honed and developed new PM and
                     leadership skills, giving them a strong foundation for their future 
                     endeavors.</p>
            </div>
        </div>
    );
};

export default Info;
