import {
    mobile,
    backend,
    // creator,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    tailwind,
    nodejs,
    // mongodb,
    git,
    figma,
    meta,
    starbucks,
    tesla,
    pucit,
    carrent,
    threejs,
    Project1,
    fyp,
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Software Engineer",
      icon: web,
    },
    {
      title: "Full Stack Developer",
      icon: mobile,
    },
    {
      title: "React Developer",
      icon: backend,
    },
    // {
    //   title: "UI/UX Developer",
    //   icon: creator,
    // },
  ];
  
  const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "TypeScript",
      icon: typescript,
    },
    
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },
    // {
    //   name: "MongoDB",
    //   icon: mongodb,
    // },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name: "figma",
      icon: figma,
    },
  
  ];

  export const educations = [
    {
      degree: "Bachelor of Science in Software Engineering",
      image: pucit,
      institute_name: "University Of The Punjab (PUCIT), Lahore Pakistan",
      instituteUrl: "https://pucit.edu.pk/",
      points: [
        "Courses in web development, software engineering, operating system, computer network, OOP, DSA, database management.",
        "Honors: Dean's List (2020-2024)",
      ],
    },
  ];
  
  const experiences = [
    {
      title: "Frontend Developer",
      company_name: "COSVM Labs (React, Tailwind)",
      icon: starbucks,
      instituteUrl: "https://cosvm.network/en",
      iconBg: "#383E56",
      date: "Feb 2024 - June 2024",
      points: [
        "Responsible developing web pages using React, Tailwind and integrating them into the live server.",
        "Collaborated closely with the development team to create engaging and user-friendly interfaces that met clients' needs.",
      ],
    },
    {
      title: "Full Stack Developer",
      company_name: "Upwork (MERN, Java)",
      icon: tesla,
      instituteUrl: "https://www.upwork.com/",
      iconBg: "#E6DEDD",
      date: "Jan 2023 - Feb 2024",
      points: [
        "Created a responsive and user-friendly dashboard application using React, leading to a 30% improvement in user engagement.",
        "Implementing responsive design and ensuring cross-browser compatibility.",
      ],
    },
    {
      title: "React Developer",
      company_name: "Fiverr",
      icon: meta,
      instituteUrl: "https://www.fiverr.com/",
      iconBg: "#E6DEDD",
      date: "Jan 2023 - July 2023",
      points: [
        "Developing and maintaining web applications using React.js and other related technologies.",
        "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      ],
    },
  ];
  
  const testimonials = [
    {
      testimonial:
        "I thought it was impossible to make a website as beautiful as our product, but Qurban proved me wrong.",
      name: "Sara Henry ",
      // designation: "CFO",
      // company: "Acme Co",
      image : "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      testimonial:
        "I've never met a web developer who truly cares about their clients' success like Qurban does.",
      name: "Chris Jordan",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      testimonial:
        "After Qurban optimized our website, our traffic increased by 50%. We can't thank them enough!",
      name: "Lisa william",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
  ];
  
  const projects = [
    {
      name: "Amazon Services",
      description:
        "A product catalog with search and filtering functionality, A product detail page with reviews and recommendations, A shopping cart for adding and removing items.",
      tags: [
        {
          name: "javascript",
          color: "blue-text-gradient",
        },
        {
          name: "html5",
          color: "green-text-gradient",
        },
        {
          name: "css3",
          color: "pink-text-gradient",
        },
      ],
      image: Project1,
      source_code_link: "https://github.com/qurban7860/AmazonClone.git",
    },
    {
      name: "Ecommerce Website",
      description:
        "Developed a user-friendly product catalog featuring an add to cart option, images and specifications for each item with API integration, enhancing the website functionality and features.",

      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "javascript",
          color: "green-text-gradient",
        },
        {
          name: "tailwind",
          color: "pink-text-gradient",
        },
      ],
      image: carrent,
      source_code_link: "https://github.com/qurban7860/EcommerceResponsiveDesign.git",
    },
    {
      name: "Final Year Project-ICE AGE",
      description:
        "Developed an ML model utilizing CNNs to analyze remote sensing data and estimate debris thickness across glaciers. Utilized ReactJS and NodeJS to develop a user-friendly web application interface for interacting with data.",
      tags: [
        {
          name: "ML",
          color: "blue-text-gradient",
        },
        {
          name: "MERN",
          color: "green-text-gradient",
        },
        {
          name: "Tailwind",
          color: "pink-text-gradient",
        },
      ],
      image: fyp,
      source_code_link: "https://github.com/qurban7860/FinalYearProject.git",
    },
    
  ];
  
  export { services, technologies, experiences, testimonials, projects };
  