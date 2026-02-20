import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CreateTaskModal = ({ isOpen, onClose, onSave }) => {
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        type: 'prescription',
        priority: 'medium',
        dueTime: '1 hour'
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...taskData,
            id: `TASK-${Date.now()}` // Generate a temporary ID
        });
        onClose();
        // Reset form
        setTaskData({
            title: '',
            description: '',
            type: 'prescription',
            priority: 'medium',
            dueTime: '1 hour'
        });
    };

    return (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-card w-full max-w-md rounded-xl border border-border shadow-elevation-3">
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <h2 className="text-xl font-bold">Create New Task</h2>
                    <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <Input
                        label="Task Title"
                        placeholder="e.g., Review Blood Report"
                        value={taskData.title}
                        onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                        required
                    />

                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm min-h-[80px]"
                            placeholder="Details about the task..."
                            value={taskData.description}
                            onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Select
                            label="Type"
                            value={taskData.type}
                            onChange={(val) => setTaskData({ ...taskData, type: val })}
                            options={[
                                { value: 'prescription', label: 'Prescription' },
                                { value: 'report', label: 'Report Review' },
                                { value: 'followup', label: 'Follow-up' },
                                { value: 'review', label: 'General Review' }
                            ]}
                        />
                        <Select
                            label="Priority"
                            value={taskData.priority}
                            onChange={(val) => setTaskData({ ...taskData, priority: val })}
                            options={[
                                { value: 'urgent', label: 'Urgent' },
                                { value: 'high', label: 'High' },
                                { value: 'medium', label: 'Medium' },
                                { value: 'low', label: 'Low' }
                            ]}
                        />
                    </div>

                    <Input
                        label="Due In"
                        placeholder="e.g., 30 min"
                        value={taskData.dueTime}
                        onChange={(e) => setTaskData({ ...taskData, dueTime: e.target.value })}
                    />

                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit">Create Task</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTaskModal;
