import React from 'react';

const profiles = [
    {
        name: 'LeetCode',
        logo: 'assets/skills/leetcode.svg',
        rating: '1675',
        link: "https://leetcode.com/u/Tarun_Shetty/",
        designation: '',
        solved: 300,
    },
    {
        name: 'CodeChef',
        logo: 'assets/skills/codechef.svg',
        rating: '1833',
        link: "https://www.codechef.com/users/taruns_123",
        designation: '4 Star',
        solved: 76,
    },
    {
        name: 'Codeforces',
        logo: 'assets/skills/codeforces.svg',
        rating: '1324',
        link: 'https://codeforces.com/profile/Taruns123',
        designation: 'Pupil',
        solved: 87,
    },
];

const ProblemSolving = () => {
    return (
        <div className="grid grid-cols-1 my-6 md:grid-cols-3 gap-4 p-4">
            {profiles.map((profile) => (
                <a 
                    key={profile.name} 
                    href={profile.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-black shadow-md rounded-lg p-4 flex items-center transform transition-transform duration-300 hover:scale-105 hover:rotate-3"
                >
                    <img src={profile.logo} alt={`${profile.name} logo`} className="w-16 h-16 mr-4" />
                    <div>
                        <h2 className="text-lg text-white font-semibold mb-2">{profile.name}</h2>
                        <p className="text-white/50 mb-1">Rating: <span className='font-bold'>{profile.rating}</span></p>
                        {/* {profile.designation && <p className="text-white/50 mb-1 text-bold">({profile.designation})</p>} */}
                        {/* <p className="text-white/50">Solved: {profile.solved} problems</p> */}
                    </div>
                </a>
            ))}
        </div>
    );
};

export default ProblemSolving;