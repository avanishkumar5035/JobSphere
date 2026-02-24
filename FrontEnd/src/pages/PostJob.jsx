import React, { useState, useContext } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { useNavigate } from 'react-router-dom';
import jobService from '../features/jobs/jobService';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
const PostJob = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        title: '',
        type: 'Full-time',
        location: '',
        salary: '',
        description: '',
        requirements: '',
    });
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const { title, type, location, salary, description, requirements } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || !user.token) {
            alert('Please login as an employer to post a job');
            return;
        }

        try {
            let companyLogo = '';

            if (image) {
                setUploading(true);
                const formData = new FormData();
                formData.append('image', image);

                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                };

                const { data } = await axios.post(`${API_BASE_URL}/api/upload`, formData, config);
                companyLogo = data.image;
                setUploading(false);
            }

            const reqArray = requirements.split(',').map(req => req.trim()).filter(req => req !== '');

            const jobData = {
                title,
                type,
                location,
                salary,
                description,
                requirements: reqArray,
                company: user.company || user.name, // Use user's company or name
                companyLogo
            };

            await jobService.createJob(jobData, user.token);
            alert("Job Posted Successfully!");
            navigate('/dashboard/employer');
        } catch (error) {
            console.error(error);
            setUploading(false);
            alert(error.response?.data?.message || 'Something went wrong while posting the job');
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Post a New Job</h1>

                <Card>
                    <CardHeader>
                        <CardTitle>Job Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                                    <Input name="title" value={title} onChange={onChange} placeholder="e.g. Senior Frontend Engineer" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                                    <select name="type" value={type} onChange={onChange} className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                                        <option>Full-time</option>
                                        <option>Part-time</option>
                                        <option>Contract</option>
                                        <option>Freelance</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                    <Input name="location" value={location} onChange={onChange} placeholder="e.g. Remote, or City, Country" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                                    <Input name="salary" value={salary} onChange={onChange} placeholder="e.g. $100k - $130k" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo</label>
                                <Input type="file" onChange={uploadFileHandler} accept="image/*" />
                                {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
                                <textarea
                                    name="description" value={description} onChange={onChange}
                                    className="flex min-h-[150px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                                    placeholder="Describe the role, responsibilities, and requirements..."
                                    required
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Requirements (comma separated)</label>
                                <Input placeholder="React, TypeScript, Node.js..." />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button type="button" variant="ghost" onClick={() => navigate(-1)}>Cancel</Button>
                                <Button type="submit" className="flex-1">Post Job</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default PostJob;
