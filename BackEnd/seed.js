const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const User = require('./src/models/User');
const Job = require('./src/models/Job');
const Application = require('./src/models/Application');
const bcrypt = require('bcryptjs');

dotenv.config();
connectDB();

const seedData = async () => {
    try {
        await User.deleteMany();
        await Job.deleteMany();
        await Application.deleteMany();

        // 1. Create Core Users
        const employer = await User.create({
            name: 'Tech Corp',
            companyName: 'Tech Corp',
            email: 'employer@example.com',
            password: 'password123',
            role: 'employer',
            companyBio: 'A leading technology solutions provider specializing in cloud and AI.',
            companyLocation: 'Remote'
        });

        const seeker = await User.create({
            name: 'John Doe',
            email: 'seeker@example.com',
            password: 'password123',
            role: 'seeker'
        });

        const admin = await User.create({
            name: 'Avanish',
            email: 'avanish@gmail.com',
            password: 'avanish123',
            role: 'admin'
        });

        // 2. Create Real-World Companies
        const realCompaniesData = [
            {
                name: 'TCS',
                companyName: 'Tata Consultancy Services',
                email: 'hr@tcs.com',
                password: 'password123',
                role: 'employer',
                companyBio: 'TCS is a global leader in IT services, consulting & business solutions with a large network of innovation & delivery centers.',
                companyLocation: 'Mumbai, India',
                companyLogo: '/uploads/tcs_logo_1772121150822.png',
                companyBanner: '/uploads/modern_office_1_1772123687365.png',
                companyWebsite: 'https://www.tcs.com'
            },
            {
                name: 'Infosys',
                companyName: 'Infosys Limited',
                email: 'talent@infosys.com',
                password: 'password123',
                role: 'employer',
                companyBio: 'Infosys is a global leader in next-generation digital services and consulting.',
                companyLocation: 'Bangalore, India',
                companyLogo: '/uploads/infosys_logo_1772121181400.png',
                companyBanner: '/uploads/modern_office_2_1772123721439.png',
                companyWebsite: 'https://www.infosys.com'
            },
            {
                name: 'Wipro',
                companyName: 'Wipro Limited',
                email: 'jobs@wipro.com',
                password: 'password123',
                role: 'employer',
                companyBio: 'Wipro is a leading global information technology, consulting and business process services company.',
                companyLocation: 'Bangalore, India',
                companyLogo: '/uploads/wipro_logo_1772121216470.png',
                companyBanner: '/uploads/modern_office_3_1772123744999.png',
                companyWebsite: 'https://www.wipro.com'
            },
            {
                name: 'Capgemini',
                companyName: 'Capgemini SE',
                email: 'recruit@capgemini.com',
                password: 'password123',
                role: 'employer',
                companyBio: 'Capgemini is a global leader in partnering with companies to transform and manage their business by harnessing the power of technology.',
                companyLocation: 'Pune, India',
                companyLogo: '/uploads/capgemini_logo_1772121258545.png',
                companyBanner: '/uploads/modern_office_4_1772123781136.png',
                companyWebsite: 'https://www.capgemini.com'
            },
            {
                name: 'HCL Tech',
                companyName: 'HCL Technologies',
                email: 'careers@hcl.com',
                password: 'password123',
                role: 'employer',
                companyBio: 'HCL Technologies is a next-generation global technology company that helps enterprises reimagine their businesses for the digital age.',
                companyLocation: 'Noida, India',
                companyLogo: '/uploads/hcl_logo_1772121282612.png',
                companyBanner: '/uploads/modern_office_5_1772123804985.png',
                companyWebsite: 'https://www.hcltech.com'
            }
        ];

        const createdCompanies = await User.insertMany(realCompaniesData);

        // 3. Create Jobs
        const originalJobs = [
            {
                postedBy: employer._id,
                title: 'Senior Frontend Engineer',
                company: 'Tech Corp',
                location: 'Remote',
                type: 'Full-time',
                description: 'We are looking for a React expert to lead our frontend team.',
                requirements: ['React', 'Redux', 'TypeScript'],
                salary: '$120k - $150k',
                featured: true
            }
        ];

        const additionalJobs = [
            // TCS Jobs
            {
                postedBy: createdCompanies[0]._id,
                title: 'Senior Cloud Architect',
                company: createdCompanies[0].companyName,
                companyLogo: createdCompanies[0].companyLogo,
                location: 'Mumbai, India',
                type: 'Full-time',
                workMode: 'Hybrid',
                description: 'Lead enterprise cloud migration strategies and design scalable AWS architectures for global clients.',
                requirements: ['AWS Certified Solutions Architect', 'Kubernetes', 'Python', 'System Design'],
                salary: '₹25 LPA - ₹35 LPA',
                minSalary: 2500000,
                maxSalary: 3500000,
                experience: 7,
                featured: true
            },
            {
                postedBy: createdCompanies[0]._id,
                title: 'MERN Stack Developer',
                company: createdCompanies[0].companyName,
                companyLogo: createdCompanies[0].companyLogo,
                location: 'Remote',
                type: 'Contract',
                workMode: 'Remote',
                description: 'Develop high-performance, responsive web applications using MongoDB, Express, React, and Node.js.',
                requirements: ['React.js', 'Node.js', 'MongoDB', 'REST APIs'],
                salary: '₹12 LPA - ₹18 LPA',
                minSalary: 1200000,
                maxSalary: 1800000,
                experience: 3,
                featured: false
            },
            // Infosys Jobs
            {
                postedBy: createdCompanies[1]._id,
                title: 'Machine Learning Engineer',
                company: createdCompanies[1].companyName,
                companyLogo: createdCompanies[1].companyLogo,
                location: 'Bangalore, India',
                type: 'Full-time',
                workMode: 'On-site',
                description: 'Build predictive models and NLP solutions tailored for fintech applications.',
                requirements: ['Python', 'TensorFlow', 'PyTorch', 'Data Structures'],
                salary: '₹18 LPA - ₹28 LPA',
                minSalary: 1800000,
                maxSalary: 2800000,
                experience: 4,
                featured: true
            },
            {
                postedBy: createdCompanies[1]._id,
                title: 'Global HR Manager',
                company: createdCompanies[1].companyName,
                companyLogo: createdCompanies[1].companyLogo,
                location: 'Pune, India',
                type: 'Full-time',
                workMode: 'Hybrid',
                description: 'Oversee talent acquisition and employee relations for our APAC division.',
                requirements: ['MBA in HR', '5+ Years Talent Management', 'Workday'],
                salary: '₹20 LPA - ₹30 LPA',
                minSalary: 2000000,
                maxSalary: 3000000,
                experience: 5,
                featured: false
            },
            // Wipro Jobs
            {
                postedBy: createdCompanies[2]._id,
                title: 'Cybersecurity Analyst',
                company: createdCompanies[2].companyName,
                companyLogo: createdCompanies[2].companyLogo,
                location: 'Hyderabad, India',
                type: 'Full-time',
                workMode: 'Remote',
                description: 'Monitor network traffic for security events and investigate potential breaches.',
                requirements: ['CEH', 'Splunk', 'Network Security', 'Incident Response'],
                salary: '₹14 LPA - ₹22 LPA',
                minSalary: 1400000,
                maxSalary: 2200000,
                experience: 3,
                featured: true
            },
            {
                postedBy: createdCompanies[2]._id,
                title: 'UI/UX Lead Designer',
                company: createdCompanies[2].companyName,
                companyLogo: createdCompanies[2].companyLogo,
                location: 'Bangalore, India',
                type: 'Full-time',
                workMode: 'Hybrid',
                description: 'Design intuitive wireframes and lead user research for enterprise SaaS products.',
                requirements: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
                salary: '₹16 LPA - ₹24 LPA',
                minSalary: 1600000,
                maxSalary: 2400000,
                experience: 5,
                featured: false
            },
            // Capgemini Jobs
            {
                postedBy: createdCompanies[3]._id,
                title: 'Big Data Engineer',
                company: createdCompanies[3].companyName,
                companyLogo: createdCompanies[3].companyLogo,
                location: 'Chennai, India',
                type: 'Full-time',
                workMode: 'On-site',
                description: 'Design and implement complex ETL pipelines capable of processing petabytes of data.',
                requirements: ['Hadoop', 'Spark', 'Scala', 'Apache Airflow'],
                salary: '₹22 LPA - ₹32 LPA',
                minSalary: 2200000,
                maxSalary: 3200000,
                experience: 6,
                featured: true
            },
            {
                postedBy: createdCompanies[3]._id,
                title: 'Business Analyst Intern',
                company: createdCompanies[3].companyName,
                companyLogo: createdCompanies[3].companyLogo,
                location: 'Pune, India',
                type: 'Internship',
                workMode: 'Hybrid',
                description: 'Assist in gathering requirements and translating them into technical specs.',
                requirements: ['SQL', 'Excel', 'Communication Skills', 'Agile'],
                salary: '₹40,000 / month',
                minSalary: 480000,
                maxSalary: 480000,
                experience: 0,
                featured: false
            },
            // HCL Tech Jobs
            {
                postedBy: createdCompanies[4]._id,
                title: 'Android Developer',
                company: createdCompanies[4].companyName,
                companyLogo: createdCompanies[4].companyLogo,
                location: 'Noida, India',
                type: 'Full-time',
                workMode: 'Remote',
                description: 'Create scalable Android applications using Kotlin and modern Android architecture components.',
                requirements: ['Kotlin', 'Jetpack Compose', 'MVVM', 'Coroutines'],
                salary: '₹10 LPA - ₹16 LPA',
                minSalary: 1000000,
                maxSalary: 1600000,
                experience: 2,
                featured: false
            },
            {
                postedBy: createdCompanies[4]._id,
                title: 'DevOps Engineer',
                company: createdCompanies[4].companyName,
                companyLogo: createdCompanies[4].companyLogo,
                location: 'Noida, India',
                type: 'Full-time',
                workMode: 'Hybrid',
                description: 'Automate CI/CD pipelines and manage cloud infrastructure using Terraform.',
                requirements: ['Docker', 'Jenkins', 'Terraform', 'Linux'],
                salary: '₹15 LPA - ₹25 LPA',
                minSalary: 1500000,
                maxSalary: 2500000,
                experience: 4,
                featured: true
            }
        ];

        const allJobs = await Job.insertMany([...originalJobs, ...additionalJobs]);

        // 4. Create Mock Applications for Admin Panel Tracking
        const mockApplications = [
            {
                job: allJobs[1]._id, // TCS Job
                applicant: seeker._id,
                status: 'applied',
                resumeLink: 'https://example.com/resume1.pdf',
                coverLetter: 'I am excited to apply for this role at TCS.'
            },
            {
                job: allJobs[2]._id, // Infosys Job
                applicant: seeker._id,
                status: 'reviewing',
                resumeLink: 'https://example.com/resume2.pdf',
                coverLetter: 'Infosys has always been a dream company.'
            },
            {
                job: allJobs[3]._id, // Wipro Job
                applicant: seeker._id,
                status: 'rejected',
                resumeLink: 'https://example.com/resume3.pdf',
                coverLetter: 'Dear hiring team at Wipro...'
            },
            {
                job: allJobs[4]._id, // Capgemini Job
                applicant: seeker._id,
                status: 'shortlisted',
                resumeLink: 'https://example.com/resume4.pdf',
                coverLetter: 'Applying for Cloud Architecture Intern.'
            },
            {
                job: allJobs[5]._id, // HCL Job
                applicant: seeker._id,
                status: 'hired',
                resumeLink: 'https://example.com/resume5.pdf',
                coverLetter: 'Excited for HCL.'
            }
        ];

        await Application.insertMany(mockApplications);

        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
