import React, { useState } from 'react';
import { mockAadhaarData } from '../services/mockData.jsx';
import StatusBadge from '../components/StatusBadge';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Register = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [userData, setUserData] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState(null);
  const [isNewRegistration, setIsNewRegistration] = useState(false);
  const { toast } = useToast();

  const handleAadhaarSubmit = (e) => {
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
      setIsNewRegistration(false);
      toast({
        title: "Aadhaar Verified",
        description: "Your identity has been verified successfully"
      });
    } else {
      // Allow new registration
      setIsNewRegistration(true);
      setUserData({
        aadhaarNumber: formatAadhaar(formattedAadhaar),
        name: '',
        dateOfBirth: '',
        gender: 'Male',
        address: '',
        phone: '',
        email: ''
      });
      setEditedUserData({
        aadhaarNumber: formatAadhaar(formattedAadhaar),
        name: '',
        dateOfBirth: '',
        gender: 'Male',
        address: '',
        phone: '',
        email: ''
      });
      setVerificationStatus('Pending');
      toast({
        title: "New Registration",
        description: "Please complete your registration details"
      });
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };
  
  const handleSaveClick = () => {
    // Validate that all required fields are filled in
    if (!editedUserData?.name || !editedUserData?.dateOfBirth || 
        !editedUserData?.address || !editedUserData?.phone || !editedUserData?.email) {
      toast({
        variant: "destructive",
        title: "Incomplete Information",
        description: "Please fill in all required fields"
      });
      return;
    }

    setIsEditing(false);
    setVerificationStatus('Pending');
    toast({
      title: isNewRegistration ? "Registration Submitted" : "Changes Submitted",
      description: "Your information is pending verification by an admin"
    });
  };
  
  const handleCancelClick = () => {
    setIsEditing(false);
    if (isNewRegistration) {
      setUserData(null);
      setEditedUserData(null);
      setVerificationStatus(null);
      setIsNewRegistration(false);
    } else {
      setEditedUserData(userData);
    }
  };

  const handleInputChange = (e) => {
    if (editedUserData) {
      setEditedUserData({
        ...editedUserData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const formatAadhaar = (aadhaar) => {
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
        
        {!userData && (
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Verify Aadhaar</h2>
            <form onSubmit={handleAadhaarSubmit}>
              <div className="mb-4">
                <label htmlFor="aadhaar" className="block text-sm font-medium mb-1">
                  Aadhaar Number (12 digits)
                </label>
                <div className="flex gap-2">
                  <Input
                    id="aadhaar"
                    type="text"
                    placeholder="XXXX XXXX XXXX"
                    value={aadhaarNumber}
                    onChange={(e) => setAadhaarNumber(formatAadhaar(e.target.value))}
                    maxLength={14}
                    className="flex-grow"
                  />
                  <Button type="submit">
                    Verify
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  For testing, use: 1234 5678 9012, 2345 6789 0123, or enter any new 12-digit number to register
                </p>
              </div>
            </form>
          </div>
        )}

        {userData && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{isNewRegistration ? "New Registration" : "User Information"}</h2>
              <div className="flex items-center gap-2">
                {verificationStatus && <StatusBadge status={verificationStatus} />}
                {!isEditing && verificationStatus === 'Verified' && (
                  <Button 
                    onClick={handleEditClick}
                    variant="outline"
                    size="sm"
                  >
                    Edit Info
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Aadhaar Number</label>
                  <Input
                    type="text"
                    value={editedUserData?.aadhaarNumber}
                    className="bg-gray-100"
                    disabled
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name*</label>
                  <Input
                    type="text"
                    name="name"
                    value={editedUserData?.name}
                    onChange={handleInputChange}
                    disabled={!isEditing && !isNewRegistration}
                    className={!isEditing && !isNewRegistration ? "bg-gray-100" : ""}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Date of Birth*</label>
                  <Input
                    type="date"
                    name="dateOfBirth"
                    value={editedUserData?.dateOfBirth}
                    onChange={handleInputChange}
                    disabled={!isEditing && !isNewRegistration}
                    className={!isEditing && !isNewRegistration ? "bg-gray-100" : ""}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Gender*</label>
                  <select
                    name="gender"
                    value={editedUserData?.gender}
                    onChange={handleInputChange}
                    disabled={!isEditing && !isNewRegistration}
                    className={`flex h-10 w-full rounded-md border border-input px-3 py-2 text-base md:text-sm ${!isEditing && !isNewRegistration ? "bg-gray-100" : "bg-background"}`}
                    required
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Address*</label>
                  <Textarea
                    name="address"
                    value={editedUserData?.address}
                    onChange={handleInputChange}
                    disabled={!isEditing && !isNewRegistration}
                    className={!isEditing && !isNewRegistration ? "bg-gray-100" : ""}
                    required
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number*</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={editedUserData?.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing && !isNewRegistration}
                    className={!isEditing && !isNewRegistration ? "bg-gray-100" : ""}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email*</label>
                  <Input
                    type="email"
                    name="email"
                    value={editedUserData?.email}
                    onChange={handleInputChange}
                    disabled={!isEditing && !isNewRegistration}
                    className={!isEditing && !isNewRegistration ? "bg-gray-100" : ""}
                    required
                  />
                </div>
              </div>

              {(isEditing || isNewRegistration) && (
                <div className="flex justify-end space-x-2 mt-4">
                  <Button
                    onClick={handleCancelClick}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveClick}
                  >
                    {isNewRegistration ? "Register" : "Save Changes"}
                  </Button>
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
