
import React, { useState } from 'react';
import { mockAadhaarData } from '../services/mockData';
import StatusBadge from '../components/StatusBadge';
import { useToast } from '@/components/ui/use-toast';

type VerificationStatus = 'Verified' | 'Pending' | 'Rejected';

interface UserData {
  aadhaarNumber: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  phone: string;
  email: string;
}

const Register = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState<UserData | null>(null);
  const { toast } = useToast();

  const handleAadhaarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate Aadhaar number (basic validation)
    const formattedAadhaar = aadhaarNumber.replace(/\s/g, '');
    if (formattedAadhaar.length !== 12 || !/^\d+$/.test(formattedAadhaar)) {
      toast({
        variant: "destructive",
        title: "Invalid Aadhaar Number",
        description: "Please enter a valid 12-digit Aadhaar number"
      });
      return;
    }
    
    // Search mock data for the Aadhaar number
    const result = mockAadhaarData.find(data => 
      data.aadhaarNumber.replace(/\s/g, '') === formattedAadhaar
    );
    
    if (result) {
      setUserData(result);
      setEditedUserData(result);
      setVerificationStatus('Verified');
      toast({
        title: "Aadhaar Verified",
        description: "Your identity has been verified successfully"
      });
    } else {
      setUserData(null);
      setVerificationStatus(null);
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: "No records found for the provided Aadhaar number"
      });
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };
  
  const handleSaveClick = () => {
    setIsEditing(false);
    setVerificationStatus('Pending');
    toast({
      title: "Changes Submitted",
      description: "Your changes are pending verification by an admin"
    });
  };
  
  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedUserData(userData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (editedUserData) {
      setEditedUserData({
        ...editedUserData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const formatAadhaar = (aadhaar: string) => {
    const cleaned = aadhaar.replace(/\s/g, '');
    const groups = [];
    for (let i = 0; i < cleaned.length; i += 4) {
      groups.push(cleaned.substring(i, i + 4));
    }
    return groups.join(' ');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-aadhaar-primary">Aadhaar Registration</h1>
        
        <div className="card mb-8">
          <h2 className="text-xl font-semibold mb-4">Verify Aadhaar</h2>
          <form onSubmit={handleAadhaarSubmit}>
            <div className="mb-4">
              <label htmlFor="aadhaar" className="block text-sm font-medium mb-1">
                Aadhaar Number (12 digits)
              </label>
              <div className="flex">
                <input
                  id="aadhaar"
                  type="text"
                  className="input-field flex-grow"
                  placeholder="XXXX XXXX XXXX"
                  value={aadhaarNumber}
                  onChange={(e) => setAadhaarNumber(formatAadhaar(e.target.value))}
                  maxLength={14}
                />
                <button type="submit" className="btn btn-primary ml-2">
                  Verify
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                For testing, use: 1234 5678 9012, 2345 6789 0123, etc.
              </p>
            </div>
          </form>
        </div>

        {userData && (
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">User Information</h2>
              <div className="flex items-center">
                {verificationStatus && <StatusBadge status={verificationStatus} />}
                {!isEditing && verificationStatus === 'Verified' && (
                  <button 
                    onClick={handleEditClick}
                    className="btn btn-secondary ml-2 text-sm"
                  >
                    Edit Info
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Aadhaar Number</label>
                  <input
                    type="text"
                    className="input-field bg-gray-100"
                    value={editedUserData?.aadhaarNumber}
                    disabled
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className={`input-field ${isEditing ? '' : 'bg-gray-100'}`}
                    value={editedUserData?.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    className={`input-field ${isEditing ? '' : 'bg-gray-100'}`}
                    value={editedUserData?.dateOfBirth}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Gender</label>
                  <select
                    name="gender"
                    className={`input-field ${isEditing ? '' : 'bg-gray-100'}`}
                    value={editedUserData?.gender}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    className={`input-field ${isEditing ? '' : 'bg-gray-100'}`}
                    value={editedUserData?.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    className={`input-field ${isEditing ? '' : 'bg-gray-100'}`}
                    value={editedUserData?.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    className={`input-field ${isEditing ? '' : 'bg-gray-100'}`}
                    value={editedUserData?.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={handleCancelClick}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveClick}
                    className="btn btn-primary"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
