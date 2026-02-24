const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/talentbridge').then(async () => {
    try {
        const Job = require('./src/models/Job');
        const User = require('./src/models/User');

        let employer = await User.findOne({ email: 'employer@example.com' });
        if (!employer) {
            console.log('Employer employer@example.com not found. Exiting.');
            process.exit(1);
        }

        const newJobs = [
            { title: 'Senior React Developer', company: 'TechNova', location: 'Remote', type: 'Full-time', salary: '$120k - $150k', description: 'Build modern UIs with React and Next.js.', requirements: ['React', 'Next.js', 'Tailwind'], postedBy: employer._id },
            { title: 'Node.js Backend Engineer', company: 'GlobalData', location: 'New York (Remote)', type: 'Full-time', salary: '$130k - $160k', description: 'Scale high-traffic API services.', requirements: ['Node.js', 'Express', 'MongoDB'], postedBy: employer._id },
            { title: 'Frontend Specialist (Vue)', company: 'InnovateHub', location: 'Europe (Remote)', type: 'Contract', salary: '$80/hr - $100/hr', description: 'Lead frontend architecture for our core product.', requirements: ['Vue.js', 'Nuxt', 'TypeScript'], postedBy: employer._id },
            { title: 'Product Designer', company: 'DesignStudio', location: 'Remote', type: 'Full-time', salary: '$90k - $130k', description: 'Create beautiful user experiences in Figma.', requirements: ['Figma', 'UI/UX', 'Wireframing'], postedBy: employer._id },
            { title: 'DevOps Engineer', company: 'CloudWorks', location: 'Remote', type: 'Full-time', salary: '$140k - $180k', description: 'Manage AWS infrastructure and CI/CD pipelines.', requirements: ['AWS', 'Docker', 'Kubernetes'], postedBy: employer._id },
            { title: 'Mobile App Developer', company: 'AppWorks', location: 'San Francisco (Hybrid)', type: 'Full-time', salary: '$110k - $140k', description: 'Develop cross-platform apps using React Native.', requirements: ['React Native', 'iOS', 'Android'], postedBy: employer._id },
            { title: 'Data Scientist', company: 'AI Solutions', location: 'Remote', type: 'Full-time', salary: '$150k - $190k', description: 'Build predictive models and AI algorithms.', requirements: ['Python', 'Machine Learning', 'SQL'], postedBy: employer._id },
            { title: 'Cybersecurity Analyst', company: 'SecureNet', location: 'London (Remote)', type: 'Full-time', salary: '$70k - $90k', description: 'Monitor and secure network infrastructure.', requirements: ['Security', 'Networks', 'Firewalls'], postedBy: employer._id },
            { title: 'Marketing Manager', company: 'GrowthHackers', location: 'Remote', type: 'Full-time', salary: '$80k - $110k', description: 'Lead digital marketing campaigns.', requirements: ['SEO', 'Marketing', 'Analytics'], postedBy: employer._id },
            { title: 'Customer Success Specialist', company: 'ServicePro', location: 'Remote', type: 'Full-time', salary: '$50k - $70k', description: 'Ensure customer satisfaction and retention.', requirements: ['Communication', 'CRM', 'Support'], postedBy: employer._id }
        ];

        await Job.insertMany(newJobs);
        console.log('10 Additional jobs seeded successfully.');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
});
