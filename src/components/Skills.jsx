import { useEffect } from 'react';
import { gsap } from 'gsap';

const Skills = () => {
    const skills = [
        { name: 'HTML', icon: '/assets/skills/html.svg' },
        { name: 'CSS', icon: '/assets/skills/css.svg' },
        { name: 'Typescript', icon: '/assets/skills/typescript.svg' },
        { name: 'React', icon: '/assets/skills/react.svg' },
        { name: 'Node.js', icon: '/assets/skills/nodejs.svg' },
        { name: 'Git', icon: '/assets/skills/git.svg' },
        { name: 'Android', icon: '/assets/skills/android.svg' },
        { name: 'Kotlin', icon: '/assets/skills/kotlin.svg' },
        { name: 'Firebase', icon: '/assets/skills/firebase.svg' },
        { name: 'Nextjs', icon: '/assets/skills/nextjs.svg' },
        { name: 'Threejs', icon: '/assets/skills/threejs.svg' },
        { name: 'Tailwind', icon: '/assets/skills/tailwind.svg' },
        { name: 'cpp', icon: '/assets/skills/cpp.svg' },
        { name: 'Solidity', icon: '/assets/skills/solidity.svg' },
        { name: 'Ethereum', icon: '/assets/skills/ethereum.svg' },
    ];

    const val = 4;
    useEffect(() => {
        const rows = document.querySelectorAll('.skill-row');
        const rowGroups = [];
        rows.forEach((row, index) => {
            const rowIndex = Math.floor(index / 4);
            if (!rowGroups[rowIndex]) {
                rowGroups[rowIndex] = [];
            }
            rowGroups[rowIndex].push(row);
        });

        rowGroups.forEach((group, index) => {
            const direction = index % 2 === 0 ? '+=100%' : '-=100%';
            gsap.to(group, {
            x: direction,
            duration: 15,
            ease: 'power1.inOut', // Added ease value
            repeat: -1,
            yoyo: true, // Change yoyo to false for continuous flow
            modifiers: {
                x: gsap.utils.unitize(x => parseFloat(x) % 100),
                opacity: gsap.utils.unitize(x => {
                const pos = parseFloat(x) % 100;
                return pos < 100 ? 0.1 + (pos / 100) * 0.9 : 1 - ((pos - 100) / 100) * 0.9;
                })
            }
            });
        });
    }, []);


    return (
        <div className="relative bg-transparent text-white/60 shadow-md rounded-lg py-6 overflow-hidden">
            <div className="bg-transparent flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                    <div key={index} className="flex flex-col items-center skill-row bg-transparent" style={{ width: 'calc(25% - 0.75rem)' }}>
                        {skill.name === 'Nextjs' || skill.name === 'Threejs' ? (
                            <img key={index} src={skill.icon} alt={skill.name} className="w-11 h-11 mb-1 transition-transform duration-300 hover:scale-125" />
                        ) : (
                            <img key={index} src={skill.icon} alt={skill.name} className="opacity-[0.5] w-11 h-11 mb-1 transition-transform duration-300 hover:scale-125" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Skills;