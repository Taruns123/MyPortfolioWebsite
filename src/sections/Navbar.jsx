import { useState, useEffect } from 'react'
import { navLinks } from '../constants';


const NavItems = ({ activeId })=>{


        
        return (
            <ul className="nav-ul">
            {navLinks.map(({ id, href, name }) => (
                (activeId === id) ? 
                <li key={id} className={`nav-li transform transition-transform duration-300 hover:scale-110 hover:rotate-6 bg-white/50 text-black p-3 rounded-lg`}>
                <a href={href} className="nav-li_a text-black">{name}</a>
                </li>
                :
                <li key={id} className={`nav-li transform transition-transform duration-300 hover:scale-110 hover:rotate-6`}>
                <a href={href} className="nav-li_a">{name}</a>
                </li>
            ))}
            </ul>
        );
    };

const Navbar = () => {

    const [activeId, setActiveId] = useState('');


    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu =()=> setIsOpen((prevIsOpen)=>!prevIsOpen);

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section');
            let currentId = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - 50) {
                    currentId = section.getAttribute('id');
                }
            });
            console.log("current id", currentId);
            setActiveId(currentId);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-transparent'>
            <div className="max-w-7xl mx-auto">
                    <div className='flex justify-between items-center py-5 mx-auto c-space'>
                            <a href='/' className='text-neutral-400 font-bold text-[28px] hover:text-white transition-colors duration-300'>
                                    TS.
                            </a>

                            <button onClick={toggleMenu} className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex transition-transform duration-300 transform hover:scale-110" aria-label="Toggle menu">
                                    <img src={isOpen ? "assets/close.svg":"assets/menu.svg"} alt="toggle" className='w-6 h-6' />
                            </button>

                            <nav className='sm:flex hidden'>
                                    <NavItems activeId={activeId}/>
                            </nav>
                    </div>
            </div>

            <div className={`nav-sidebar transition-max-height duration-500 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
                    <nav className='p-5'>
                            <NavItems activeId={activeId}/>
                    </nav>
            </div>
    </header>
)
}

export default Navbar