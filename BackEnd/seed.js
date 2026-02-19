const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const User = require('./src/models/User');
const Job = require('./src/models/Job');
const bcrypt = require('bcryptjs');

dotenv.config();
connectDB();

const seedData = async () => {
    try {
        await User.deleteMany();
        await Job.deleteMany();

        const employer = await User.create({
            name: 'Tech Corp',
            email: 'employer@example.com',
            password: 'password123',
            role: 'employer'
        });

        const seeker = await User.create({
            name: 'John Doe',
            email: 'seeker@example.com',
            password: 'password123',
            role: 'seeker'
        });

        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'password123', // Let the pre-save hook hash it
            role: 'admin'
        });

        const jobs = [
            {
                postedBy: employer._id,
                title: 'Senior Frontend Engineer',
                company: 'Tech Corp',
                location: 'Remote',
                type: 'Full-time',
                description: 'We are looking for a React expert to lead our frontend team. You will be working with the latest technologies to build a seamless user experience.',
                requirements: ['React', 'Redux', 'TypeScript', 'Tailwind CSS'],
                salary: '$120k - $150k',
                featured: true
            },
            {
                postedBy: employer._id,
                title: 'Backend Developer',
                company: 'Tech Corp',
                location: 'New York, NY',
                type: 'Full-time',
                description: 'Join our backend team to build scalable APIs and microservices. Experience with Node.js and MongoDB is a must.',
                requirements: ['Node.js', 'Express', 'MongoDB', 'AWS'],
                salary: '$90k - $120k',
                featured: false
            },
            {
                postedBy: employer._id,
                title: 'Product Designer',
                company: 'Creative Studio',
                location: 'San Francisco, CA',
                type: 'Full-time',
                description: 'We need a creative Product Designer to help us shape the future of our digital products. You will work closely with PMs and engineers.',
                requirements: ['Figma', 'Sketch', 'Prototyping', 'User Research'],
                salary: '$100k - $130k',
                featured: true
            },
            {
                postedBy: employer._id,
                title: 'Marketing Manager',
                company: 'Growth Inc.',
                location: 'Remote',
                type: 'Contract',
                description: 'Looking for a Marketing Manager to drive our user acquisition strategy. You should be data-driven and creative.',
                requirements: ['SEO', 'SEM', 'Google Analytics', 'Content Strategy'],
                salary: '$80k - $100k',
                featured: false
            },
            {
                postedBy: employer._id,
                title: 'DevOps Engineer',
                company: 'Cloud Systems',
                location: 'Austin, TX',
                type: 'Full-time',
                description: 'Ensure our infrastructure is robust and scalable. You will be responsible for CI/CD pipelines and cloud infrastructure.',
                requirements: ['AWS', 'Docker', 'Kubernetes', 'Jenkins'],
                salary: '$130k - $160k',
                featured: false
            },
            {
                postedBy: employer._id,
                title: 'Data Scientist',
                company: 'Data Wizz',
                location: 'Boston, MA',
                type: 'Full-time',
                description: 'Analyze large datasets to derive actionable insights. You will build machine learning models to solve complex business problems.',
                requirements: ['Python', 'SQL', 'Machine Learning', 'TensorFlow'],
                salary: '$140k - $170k',
                featured: true
            },
            {
                postedBy: employer._id,
                title: 'UX Writer',
                company: 'Creative Studio',
                location: 'Remote',
                type: 'Part-time',
                description: 'Craft clear and concise copy for our user interfaces. You will work with designers to ensure a consistent voice and tone.',
                requirements: ['Copywriting', 'UX Design', 'Communication', 'Content Strategy'],
                salary: '$50k - $70k',
                featured: false
            },
            {
                postedBy: employer._id,
                title: 'Sales Representative',
                company: 'Global Sales',
                location: 'Chicago, IL',
                type: 'Full-time',
                description: 'Drive revenue growth by identifying and closing new business opportunities. You should be a self-starter with a proven track record.',
                requirements: ['Sales', 'CRM', 'Communication', 'Negotiation'],
                salary: '$60k - $80k + Commission',
                featured: false
            },
            {
                postedBy: employer._id,
                title: 'Flutter Developer',
                company: 'Mobile First',
                location: 'Remote',
                type: 'Contract',
                description: 'Build beautiful cross-platform mobile applications using Flutter. You will work on both iOS and Android apps.',
                requirements: ['Flutter', 'Dart', 'iOS', 'Android'],
                salary: '$90k - $110k',
                featured: false
            },
            {
                postedBy: employer._id,
                title: 'Project Manager',
                company: 'Tech Corp',
                location: 'Seattle, WA',
                type: 'Full-time',
                description: 'Lead cross-functional teams to deliver projects on time and within budget. You will be the bridge between stakeholders and the development team.',
                requirements: ['Agile', 'Scrum', 'Jira', 'Communication'],
                salary: '$110k - $140k',
                featured: true
            }
        ];

        await Job.insertMany(jobs);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

seedData();
