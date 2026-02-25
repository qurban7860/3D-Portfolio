import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    typescript,
    // html,
    // css,
    reactjs,
    tailwind,
    nodejs,
    // mongodb,
    git,
    figma,
    // meta,
    starbucks,
    tesla,
    pucit,
    terminus,
    carrent,
    tmc,
    // threejs,
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
      title: "MERN Developer",
      icon: mobile,
    },
    {
      title: "Next Developer",
      icon: creator,
    },
    {
      title: "React Native Developer",
      icon: backend,
    },
  ];
  
  const technologies = [
    // {
    //   name: "HTML 5",
    //   icon: html,
    // },
    // {
    //   name: "CSS 3",
    //   icon: css,
    // },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "JavaScript",
      icon: javascript,
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
    // {
    //   name: "Three JS",
    //   icon: threejs,
    // },
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
        "Courses in Web Development, Software Engineering, OOP, DSA, DBMS, Operating System, Computer Network.",
        "Honors: Dean's List (2020-2024)",
      ],
    },
  ];
  
  const experiences = [
    {
      title: "Software Engineer",
      company_name: "TMC",
      icon: tmc,
      instituteUrl: "https://tmcltd.com/",
      iconBg: "#E6DEDD",
      date: "July 2025 - Present",
      points: [
        "Developing and maintaining web applications using React.js, Next.js, typescript, and other related technologies.",
        "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      ],
    },
    {
      title: "Software Engineer | MERN",
      company_name: "Terminus Technologies",
      icon: terminus,
      instituteUrl: "https://terminustech.co.nz/",
      iconBg: "#E6DEDD",
      date: "June 2024 - July 2025",
      points: [
        "Developed an ERP system with dynamic UI features using React, Material-UI and Redux for a New Zealand-based firm.",
        "Created and Implemented RESTful APIs with Node.js and MongoDB, ensuring smooth integration and efficient state management."
      ],
    },
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
      company_name: "Upwork (MERN)",
      icon: tesla,
      instituteUrl: "https://www.upwork.com/",
      iconBg: "#E6DEDD",
      date: "Aug 2023 - Dec 2024",
      points: [
        "Created a responsive and user-friendly dashboard application using React, leading to a 30% improvement in user engagement.",
        "Implementing responsive design and ensuring cross-browser compatibility.",
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
      name: "Harsh Kumar",
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
        "Built a modern e-commerce platform featuring product search, filtering, detailed item pages, user reviews, recommendations, and a responsive cart system integrated with external APIs.",
      tags: [
        {
          name: "MERN",
          color: "blue-text-gradient",
        },
        {
          name: "Material-UI",
          color: "green-text-gradient",
        },
        {
          name: "Javascript",
          color: "pink-text-gradient",
        },
      ],
      image: Project1,
      source_code_link: "https://github.com/qurban7860/AmazonClone.git",
    },
    {
      name: "AI Portfolio Builder",
      description:
        "Quickly create a personalized portfolio with AI-generated content, real-time preview, PDF export, and user authentication. Built with Mern, Firebase, and Material-UI for a seamless, responsive experience.",

      tags: [
        {
          name: "MERN",
          color: "blue-text-gradient",
        },
        {
          name: "Firebase",
          color: "green-text-gradient",
        },
        {
          name: "Material-UI",
          color: "pink-text-gradient",
        },
      ],
      image: carrent,
      source_code_link: "https://github.com/qurban7860/ai-portfolio-builder.git",
    },
    {
      name: "Final Year Project-ICE AGE",
      description:
        "Developed an ML model utilizing CNNs to analyze remote sensing data. Utilized ReactJS and NodeJS to develop a user-friendly web application.",
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
  