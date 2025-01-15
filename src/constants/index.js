export const navLinks = [
    {
      id: 'projects',
      name: 'PROJECTS',
      href: '#projects',
    },
    {
      id: 'work',
      name: 'WORK',
      href: '#work',
    },
    {
      id: 'contact',
      name: 'CONTACT',
      href: '#contact',
    },
  ];
  
  export const clientReviews = [
    {
      id: 1,
      name: 'Emily Johnson',
      position: 'Marketing Director at GreenLeaf',
      img: 'assets/review1.png',
      review:
        'Working with Adrian was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.',
    },
    {
      id: 2,
      name: 'Mark Rogers',
      position: 'Founder of TechGear Shop',
      img: 'assets/review2.png',
      review:
        'Adrian’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional! Fantastic work.',
    },
    {
      id: 3,
      name: 'John Dohsas',
      position: 'Project Manager at UrbanTech ',
      img: 'assets/review3.png',
      review:
        'I can’t say enough good things about Adrian. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.',
    },
    {
      id: 4,
      name: 'Ether Smith',
      position: 'CEO of BrightStar Enterprises',
      img: 'assets/review4.png',
      review:
        'Adrian was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend backend dev are top-notch.',
    },
  ];
  
  export const myProjects = [
    {
      title: 'CHAINIFY - Blockchain Asset Management',
      desc: 'An enterprise-level blockchain application powered by Hyperledger Fabric for land registrars to manage asset transactions.',
      subdesc:
        'Integrated Node.js, Express, and React.js to build the backend and frontend. Designed a modern user interface with dynamic visuals powered by Three.js for an enhanced user experience.',
      href: 'https://github.com/your-repo-link',
      texture: '/textures/project/project1.mp4',
      logo: '/assets/project-logo1.png',
      logoStyle: {
        backgroundColor: '#2A1816',
        border: '0.2px solid #36201D',
        boxShadow: '0px 0px 60px 0px #AA3C304D',
      },
      spotlight: '/assets/spotlight1.png',
      tags: [
        {
          id: 1,
          name: 'Hyperledger Fabric',
          path: '/assets/skills/hyperledger.svg',
        },
        {
          id: 2,
          name: 'React.js',
          path: '/assets/skills/react.svg',
        },
        {
          id: 3,
          name: 'Node.js',
          path: '/assets/skills/nodejs.svg',
        },
        {
          id: 4,
          name: 'Three.js',
          path: '/assets/skills/threejs.svg',
        },
      ],
    },
    {
      title: 'BISTRO-DEX - Restaurant Management System',
      desc: 'A desktop application for managing restaurant billing and inventory systems.',
      subdesc:
        'Utilized Electron.js for cross-platform support and React.js for an interactive user interface. Connected the application to a MySQL database for reliable data storage and retrieval.',
      href: 'https://github.com/your-repo-link',
      texture: '/textures/project/project2.mp4',
      logo: '/assets/project-logo2.png',
      logoStyle: {
        backgroundColor: '#13202F',
        border: '0.2px solid #17293E',
        boxShadow: '0px 0px 60px 0px #2F6DB54D',
      },
      spotlight: '/assets/spotlight2.png',
      tags: [
        {
          id: 1,
          name: 'Electron.js',
          path: '/assets/skills/electron.svg',
        },
        {
          id: 2,
          name: 'React.js',
          path: '/assets/skills/react.svg',
        },
        {
          id: 3,
          name: 'MySQL',
          path: '/assets/skills/mysql.svg',
        },
      ],
    },
    {
      title: 'T-CHARTS - Dynamic Charting Library',
      desc: 'A dynamic charting library for visualizing data as bar, line, area charts, etc.',
      subdesc:
        'Created a custom solution to address the limitations of existing chart libraries, offering greater flexibility and customization. Published the library as an open-source project on GitHub.',
      href: 'https://github.com/your-repo-link',
      texture: '/textures/project/project3.mp4',
      logo: '/assets/project-logo3.png',
      logoStyle: {
        backgroundColor: '#60f5a1',
        background:
          'linear-gradient(0deg, #60F5A150, #60F5A150), linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(208, 213, 221, 0.8) 100%)',
        border: '0.2px solid rgba(208, 213, 221, 1)',
        boxShadow: '0px 0px 60px 0px rgba(35, 131, 96, 0.3)',
      },
      spotlight: '/assets/spotlight3.png',
      tags: [
        {
          id: 1,
          name: 'React.js',
          path: '/assets/skills/react.svg',
        },
        {
          id: 2,
          name: 'TypeScript',
          path: '/assets/skills/typescript.png',
        },
        {
          id: 3,
          name: 'Rollup',
          path: '/assets/skills/rollup.svg',
        },
      ],
    },
    {
      title: 'T-NOTE - Android Note-Taking App',
      desc: 'A production-level Android app for saving notes using clean architecture principles.',
      subdesc:
        'Built a responsive user interface with Jetpack Compose and Canvas for an enhanced user experience. Integrated Dagger Hilt for dependency injection to manage dependencies efficiently.',
      href: 'https://github.com/your-repo-link',
      texture: '/textures/project/project4.mp4',
      logo: '/assets/project-logo4.png',
      logoStyle: {
        backgroundColor: '#0E1F38',
        border: '0.2px solid #0E2D58',
        boxShadow: '0px 0px 60px 0px #2F67B64D',
      },
      spotlight: '/assets/spotlight4.png',
      tags: [
        {
          id: 1,
          name: 'Android',
          path: '/assets/skills/android.svg',
        },
        {
          id: 2,
          name: 'Jetpack Compose',
          path: '/assets/skills/jetpack-compose.svg',
        },
        {
          id: 3,
          name: 'Kotlin',
          path: '/assets/skills/kotlin.svg',
        },
        {
          id: 4,
          name: 'Dagger Hilt',
          path: '/assets/skills/dagger-hilt.svg',
        },
      ],
    },
  ];
  
  export const calculateSizes = (isSmall, isMobile, isTablet) => {
    return {
      deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
      deskPosition: isMobile ? [-2, -4.5, 0] : [6, -5.5, 0],
      cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
      reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12, 3, 0],
      ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
      targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -13, -10],
    };
  };
  
  export const workExperiences = [
    {
      id: 1,
      name: 'Pixolo',
      pos: 'Software Developer Intern',
      duration: 'Nov 2023 - Feb 2024',
      title: "Worked as a software developer on multiple projects, primarily with Angular and Next.js, showcasing strong UI design skills. Contributed to real-world production applications, gaining hands-on experience, problem-solving abilities, and delivering scalable, user-friendly solutions. This first professional role built a solid foundation for my technical expertise and adaptability in dynamic environments.",
      icon: '/assets/pixolo_logo.png',
      animation: 'salute',
    },
    {
      id: 2,
      name: 'Vector Consulting',
      pos: 'Software Developer',
      duration: 'June 2024 - Present',
      title: "Played a versatile role in developing a modern Make-to-Order supply chain project, successfully launched. Specialized in React frontend development, leveraging core concepts, advanced UI design, and unit testing. Streamlined development and deployment by implementing Azure DevOps pipelines, showcasing adaptability and a comprehensive approach to delivering high-quality applications.",
      icon: '/assets/vectorconsulting.png',
      animation: 'clapping',
    }
  ];