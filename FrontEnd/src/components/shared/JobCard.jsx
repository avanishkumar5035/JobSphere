import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { MapPin, DollarSign, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
    return (
        <Card className="hover:shadow-md transition-shadow group border-l-4 border-l-transparent hover:border-l-accent">
            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex gap-4">
                        <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-500 uppercase overflow-hidden">
                            {job.companyLogo ? <img src={job.companyLogo} alt={job.company} className="h-full w-full object-cover" /> : job.company.charAt(0)}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-accent transition-colors">
                                {job.title}
                            </h3>
                            <p className="text-sm text-gray-600 font-medium mb-2">{job.company}</p>

                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                    <MapPin className="h-3.5 w-3.5" />
                                    {job.location}
                                </span>
                                <span className="flex items-center gap-1">
                                    <DollarSign className="h-3.5 w-3.5" />
                                    {job.salary}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="h-3.5 w-3.5" />
                                    {job.type}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:items-end gap-3 mt-4 md:mt-0">
                        <div className="flex gap-2">
                            {job.tags && job.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="rounded-md font-normal">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                        <Link to={`/jobs/${job.id}`}>
                            <Button size="sm" variant="outline" className="w-full md:w-auto">View Details</Button>
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default JobCard;
