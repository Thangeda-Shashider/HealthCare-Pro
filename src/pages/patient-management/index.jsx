import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import DashboardNavigation from '../../components/ui/DashboardNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

const PatientManagement = () => {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState('doctor');
    const [isNavCollapsed, setIsNavCollapsed] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

    useEffect(() => {
        const role = localStorage.getItem('userRole') || 'doctor';
        setUserRole(role);
    }, []);

    const [patients, setPatients] = useState([
        {
            id: 'PT-45678',
            name: 'Sarah Johnson',
            age: 45,
            gender: 'Female',
            phone: '(555) 123-4567',
            email: 'sarah.j@example.com',
            lastVisit: '2025-12-20',
            condition: 'Hypertension',
            status: 'stable',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b7c47eff-1763293873152.png"
        },
        {
            id: 'PT-45679',
            name: 'Michael Brown',
            age: 62,
            gender: 'Male',
            phone: '(555) 234-5678',
            email: 'm.brown@example.com',
            lastVisit: '2025-12-15',
            condition: 'Type 2 Diabetes',
            status: 'monitoring',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_134653558-1763295042672.png"
        },
        {
            id: 'PT-45680',
            name: 'Jennifer Davis',
            age: 38,
            gender: 'Female',
            phone: '(555) 345-6789',
            email: 'jen.davis@example.com',
            lastVisit: '2025-12-22',
            condition: 'Infection',
            status: 'recovering',
            image: "https://images.unsplash.com/photo-1580768927356-257b64e374f2"
        },
        {
            id: 'PT-45681',
            name: 'Robert Martinez',
            age: 55,
            gender: 'Male',
            phone: '(555) 456-7890',
            email: 'r.martinez@example.com',
            lastVisit: '2025-11-28',
            condition: 'High Cholesterol',
            status: 'stable',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bc5fda4b-1763296654049.png"
        },
        {
            id: 'PT-45682',
            name: 'Emily Wilson',
            age: 28,
            gender: 'Female',
            phone: '(555) 567-8901',
            email: 'emily.w@example.com',
            lastVisit: '2025-12-28',
            condition: 'Pregnancy',
            status: 'active',
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
        },
        {
            id: 'PT-45683',
            name: 'David Lee',
            age: 70,
            gender: 'Male',
            phone: '(555) 678-9012',
            email: 'david.lee@example.com',
            lastVisit: '2025-12-10',
            condition: 'Arthritis',
            status: 'stable',
            image: "https://images.unsplash.com/photo-1566616213894-2dcd1107d5ac"
        }
    ]);

    const statusOptions = [
        { value: 'all', label: 'All Status' },
        { value: 'stable', label: 'Stable' },
        { value: 'monitoring', label: 'Monitoring' },
        { value: 'recovering', label: 'Recovering' },
        { value: 'critical', label: 'Critical' }
    ];

    const filteredPatients = patients.filter(patient => {
        const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status) => {
        const colors = {
            stable: 'bg-success/10 text-success border-success/20',
            monitoring: 'bg-warning/10 text-warning border-warning/20',
            recovering: 'bg-primary/10 text-primary border-primary/20',
            critical: 'bg-error/10 text-error border-error/20',
            active: 'bg-secondary/10 text-secondary border-secondary/20'
        };
        return colors[status] || colors.stable;
    };

    return (
        <div className="min-h-screen bg-background">
            <RoleBasedHeader userRole={userRole} userName="Dr. Michael Chen" />
            <DashboardNavigation
                userRole={userRole}
                isCollapsed={isNavCollapsed}
                onToggleCollapse={() => setIsNavCollapsed(!isNavCollapsed)}
            />

            <main className={`pt-[72px] transition-all duration-250 ${isNavCollapsed ? 'lg:pl-[80px]' : 'lg:pl-[280px]'}`}>
                <div className="p-4 md:p-6 lg:p-8">

                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                                Patient Management
                            </h1>
                            <p className="text-muted-foreground">
                                Manage patient records, view histories, and update statuses.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <div className="bg-card border border-border rounded-lg p-1 flex">
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'}`}
                                >
                                    <Icon name="List" size={20} />
                                </button>
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'}`}
                                >
                                    <Icon name="Grid" size={20} />
                                </button>
                            </div>
                            <Button iconName="UserPlus" iconPosition="left">Add New Patient</Button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary"><Icon name="Users" size={24} /></div>
                                <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">+5%</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-1">{patients.length}</h3>
                            <p className="text-sm text-muted-foreground">Total Patients</p>
                        </div>
                        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 bg-secondary/10 rounded-lg text-secondary"><Icon name="UserPlus" size={24} /></div>
                                <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">+12</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-1">24</h3>
                            <p className="text-sm text-muted-foreground">New This Month</p>
                        </div>
                        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 bg-warning/10 rounded-lg text-warning"><Icon name="Activity" size={24} /></div>
                                <span className="text-xs font-medium text-warning bg-warning/10 px-2 py-1 rounded-full">Low</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-1">3</h3>
                            <p className="text-sm text-muted-foreground">Critical Condition</p>
                        </div>
                        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 bg-success/10 rounded-lg text-success"><Icon name="Heart" size={24} /></div>
                                <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">98%</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-1">45.2</h3>
                            <p className="text-sm text-muted-foreground">Average Age</p>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-card border border-border rounded-xl p-4 mb-6 sticky top-[80px] z-10 shadow-sm">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search patients by name or ID..."
                                    className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="w-full md:w-48">
                                <Select
                                    options={statusOptions}
                                    value={filterStatus}
                                    onChange={setFilterStatus}
                                    placeholder="Filter Status"
                                />
                            </div>
                        </div>
                    </div>

                    {/* List/Grid View */}
                    {viewMode === 'list' ? (
                        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-muted/50 border-b border-border">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Patient</th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">ID</th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Contact</th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Last Visit</th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                                            <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {filteredPatients.map((patient) => (
                                            <tr key={patient.id} className="hover:bg-muted/30 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img src={patient.image || `https://ui-avatars.com/api/?name=${patient.name}`} alt={patient.name} className="w-10 h-10 rounded-full object-cover" />
                                                        <div>
                                                            <p className="font-medium text-foreground">{patient.name}</p>
                                                            <p className="text-xs text-muted-foreground">{patient.gender}, {patient.age} yrs</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-mono text-muted-foreground">{patient.id}</td>
                                                <td className="px-6 py-4 text-sm text-muted-foreground">
                                                    <div className="flex flex-col">
                                                        <span>{patient.phone}</span>
                                                        <span className="text-xs">{patient.email}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-foreground">{new Date(patient.lastVisit).toLocaleDateString()}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(patient.status)}`}>
                                                        {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button variant="ghost" size="sm" iconName="Eye" />
                                                        <Button variant="ghost" size="sm" iconName="Edit" />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredPatients.map((patient) => (
                                <div key={patient.id} className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors shadow-sm group">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(patient.status)}`}>
                                            {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                                        </div>
                                        <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Icon name="MoreVertical" size={18} />
                                        </button>
                                    </div>
                                    <div className="flex flex-col items-center text-center mb-6">
                                        <div className="w-20 h-20 rounded-full overflow-hidden mb-3 border-4 border-muted/30">
                                            <img src={patient.image || `https://ui-avatars.com/api/?name=${patient.name}`} alt={patient.name} className="w-full h-full object-cover" />
                                        </div>
                                        <h3 className="text-lg font-bold text-foreground">{patient.name}</h3>
                                        <p className="text-sm text-muted-foreground">{patient.id}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg mb-4">
                                        <div className="text-center border-r border-border">
                                            <span className="block text-xs uppercase tracking-wider mb-1">Last Visit</span>
                                            <span className="font-medium text-foreground">{new Date(patient.lastVisit).toLocaleDateString()}</span>
                                        </div>
                                        <div className="text-center">
                                            <span className="block text-xs uppercase tracking-wider mb-1">Condition</span>
                                            <span className="font-medium text-foreground truncate px-1">{patient.condition}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" fullWidth iconName="MessageSquare">Message</Button>
                                        <Button size="sm" fullWidth iconName="Eye">View</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
};

export default PatientManagement;
