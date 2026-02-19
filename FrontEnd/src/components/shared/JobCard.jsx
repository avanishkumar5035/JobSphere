import { MapPin, Clock, DollarSign, Bookmark, Briefcase } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card, CardContent } from '../ui/Card';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
    return (
        <Card className="hover:shadow-md transition-shadow cursor-pointer bg-white dark:bg-gray-800 dark:border-gray-700 group transition-colors duration-300">
            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="h-12 w-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xl font-bold text-gray-600 dark:text-gray-300 shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                        {job.company.charAt(0)}
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                            <div>
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                                    <Link to={`/jobs/${job._id}`} className="hover:underline">{job.title}</Link>
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 font-medium">{job.company}</p>
                            </div>
                            {job.featured && (
                                <Badge variant="secondary" className="mt-2 md:mt-0 w-fit dark:bg-gray-700 dark:text-gray-200">Featured</Badge>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                            <div className="flex items-center gap-1">
                                <Briefcase className="h-4 w-4" />
                                {job.type}
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {job.location}
                            </div>
                            <div className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4" />
                                {job.salary}
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {new Date(job.createdAt).toLocaleDateString()}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mt-auto">
                            {/* Skills/Tags if available */}
                            {job.requirements && job.requirements.slice(0, 3).map((req, index) => (
                                <span key={index} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                                    {req.substring(0, 10)}...
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 mt-4 md:mt-0 md:items-end justify-between">
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-accent dark:text-gray-500 dark:hover:text-accent">
                            <Bookmark className="h-5 w-5" />
                        </Button>
                        <Link to={`/jobs/${job._id}`}>
                            <Button className="w-full md:w-auto dark:bg-primary dark:text-white dark:hover:bg-primary/90">Apply Now</Button>
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default JobCard;
