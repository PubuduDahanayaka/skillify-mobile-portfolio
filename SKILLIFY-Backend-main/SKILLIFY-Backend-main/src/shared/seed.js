const bcrypt = require('bcryptjs');
const config = require('../config/env');
const { AppSetting, User, SkillQuestion, CareerPath, LearningResource } = require('../models');

const initialQuestions = [
  {
    category: 'Frontend Development',
    skill: 'HTML, CSS & React',
    type: 'technical',
    text: 'How confident are you in designing responsive web pages and building component-driven user interfaces using React?',
    weight: 1,
  },
  {
    category: 'Backend Development',
    skill: 'Node.js & Express REST APIs',
    type: 'technical',
    text: 'How experienced are you in developing server-side applications, routing, and RESTful API endpoints with Node.js and Express?',
    weight: 1,
  },
  {
    category: 'Database Management',
    skill: 'MongoDB & SQL Querying',
    type: 'technical',
    text: 'How comfortable are you designing database schemas, writing queries, and managing data modeling in MongoDB or SQL databases?',
    weight: 1,
  },
  {
    category: 'DevOps & Deployment',
    skill: 'Git, Docker & Cloud Deployment',
    type: 'technical',
    text: 'How proficient are you using Git version control, containerizing apps with Docker, and deploying services to cloud platforms?',
    weight: 1,
  },
  {
    category: 'Problem Solving & Logic',
    skill: 'Data Structures & Problem Solving',
    type: 'technical',
    text: 'How well can you apply core data structures, algorithms, and logical problem-solving techniques to optimize code performance?',
    weight: 1,
  },
];

const initialCareers = [
  {
    title: 'Full Stack Developer',
    description: 'Designs, builds, and maintains both client-side user interfaces and server-side backend services for modern web applications.',
    salaryRange: '$70,000 - $110,000',
    growthRate: 'High (22% growth)',
    targetAudience: 'IT undergraduates',
    requiredSkills: [
      { name: 'Frontend Development', level: 3 },
      { name: 'Backend Development', level: 3 },
      { name: 'Database Management', level: 2 },
      { name: 'DevOps & Deployment', level: 2 },
      { name: 'Problem Solving & Logic', level: 3 },
    ],
  },
  {
    title: 'Backend Software Engineer',
    description: 'Focuses on server-side business logic, data modeling, API integration, performance optimization, and database architecture.',
    salaryRange: '$75,000 - $120,000',
    growthRate: 'Very High (25% growth)',
    targetAudience: 'IT undergraduates',
    requiredSkills: [
      { name: 'Backend Development', level: 4 },
      { name: 'Database Management', level: 3 },
      { name: 'DevOps & Deployment', level: 3 },
      { name: 'Problem Solving & Logic', level: 3 },
      { name: 'Frontend Development', level: 1 },
    ],
  },
  {
    title: 'Frontend Engineer',
    description: 'Specializes in creating accessible, performant, and visual user interfaces using modern web frameworks and design systems.',
    salaryRange: '$68,000 - $105,000',
    growthRate: 'High (20% growth)',
    targetAudience: 'IT undergraduates',
    requiredSkills: [
      { name: 'Frontend Development', level: 4 },
      { name: 'Problem Solving & Logic', level: 2 },
      { name: 'Backend Development', level: 2 },
      { name: 'Database Management', level: 1 },
      { name: 'DevOps & Deployment', level: 1 },
    ],
  },
];

const initialResources = [
  {
    skill: 'Frontend Development',
    title: 'React Official Documentation & Interactive Guide',
    provider: 'React Docs',
    type: 'course',
    duration: '15 hours',
    rating: 4.9,
    isPaid: false,
    url: 'https://react.dev',
  },
  {
    skill: 'Backend Development',
    title: 'Node.js & Express API Development Guide',
    provider: 'MDN Web Docs',
    type: 'course',
    duration: '20 hours',
    rating: 4.8,
    isPaid: false,
    url: 'https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs',
  },
  {
    skill: 'Database Management',
    title: 'MongoDB University - Data Modeling & Aggregation',
    provider: 'MongoDB',
    type: 'certificate',
    duration: '12 hours',
    rating: 4.8,
    isPaid: false,
    url: 'https://learn.mongodb.com',
  },
  {
    skill: 'DevOps & Deployment',
    title: 'Docker for Beginners & Container Essentials',
    provider: 'freeCodeCamp',
    type: 'video',
    duration: '4 hours',
    rating: 4.7,
    isPaid: false,
    url: 'https://www.freecodecamp.org',
  },
  {
    skill: 'Problem Solving & Logic',
    title: 'Data Structures and Algorithms in JavaScript',
    provider: 'freeCodeCamp',
    type: 'course',
    duration: '30 hours',
    rating: 4.9,
    isPaid: false,
    url: 'https://www.freecodecamp.org',
  },
];

async function seedSystemData() {
  const adminPasswordHash = await bcrypt.hash(config.adminPassword, 10);
  await User.findOneAndUpdate(
    { email: config.adminEmail.toLowerCase() },
    {
      $set: {
        name: config.adminName,
        email: config.adminEmail.toLowerCase(),
        passwordHash: adminPasswordHash,
        role: 'admin',
      },
      $setOnInsert: {
        targetCareerId: '',
      },
    },
    { upsert: true, returnDocument: 'after' }
  );

  await AppSetting.findOneAndUpdate(
    { key: 'main' },
    {
      $setOnInsert: {
        key: 'main',
        appName: 'Skillify',
        audience: 'IT undergraduates',
        heroTitle: 'Start with your skill assessment',
        heroText: 'Your administrator can configure questions, career paths, learning resources, and dashboard messaging.',
      },
    },
    { upsert: true, returnDocument: 'after' }
  );

  for (const q of initialQuestions) {
    await SkillQuestion.findOneAndUpdate(
      { category: q.category, skill: q.skill },
      { $setOnInsert: q },
      { upsert: true, returnDocument: 'after' }
    );
  }

  for (const c of initialCareers) {
    await CareerPath.findOneAndUpdate(
      { title: c.title },
      { $setOnInsert: c },
      { upsert: true, returnDocument: 'after' }
    );
  }

  for (const r of initialResources) {
    await LearningResource.findOneAndUpdate(
      { skill: r.skill, title: r.title },
      { $setOnInsert: r },
      { upsert: true, returnDocument: 'after' }
    );
  }
}

module.exports = seedSystemData;
