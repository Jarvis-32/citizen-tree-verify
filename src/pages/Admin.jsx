
import React, { useState } from 'react';
import { mockVerifications, VerificationRecord } from '../services/mockData';
import StatusBadge from '../components/StatusBadge';
import { useToast } from '@/components/ui/use-toast';

const Admin = () => {
  const [verifications, setVerifications] = useState(mockVerifications);
  const [selectedVerification, setSelectedVerification] = useState(null);
  const [remarks, setRemarks] = useState('');
  const { toast } = useToast();

  const pendingVerifications = verifications.filter(v => v.status === 'Pending');
  const otherVerifications = verifications.filter(v => v.status !== 'Pending');

  const handleVerificationSelect = (verification) => {
    setSelectedVerification(verification);
    setRemarks(verification.remarks || '');
  };

  const handleApprove = () => {
    if (selectedVerification) {
      const updatedVerifications = verifications.map(v =>
        v.id === selectedVerification.id
          ? { ...v, status: 'Verified', remarks: remarks || 'Approved' }
          : v
      );
      
      setVerifications(updatedVerifications);
      toast({
        title: "Verification Approved",
        description: `${selectedVerification.name}'s request has been approved`,
      });
      
      setSelectedVerification(null);
      setRemarks('');
    }
  };

  const handleReject = () => {
    if (selectedVerification) {
      if (!remarks) {
        toast({
          variant: "destructive",
          title: "Remarks Required",
          description: "Please provide a reason for rejection",
        });
        return;
      }
      
      const updatedVerifications = verifications.map(v =>
        v.id === selectedVerification.id
          ? { ...v, status: 'Rejected', remarks }
          : v
      );
      
      setVerifications(updatedVerifications);
      toast({
        title: "Verification Rejected",
        description: `${selectedVerification.name}'s request has been rejected`,
      });
      
      setSelectedVerification(null);
      setRemarks('');
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-aadhaar-primary">
        Admin Verification Panel
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="card mb-6">
            <h2 className="text-xl font-semibold mb-4">Pending Verifications</h2>
            {pendingVerifications.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 border-b">ID</th>
                      <th className="text-left p-3 border-b">Name</th>
                      <th className="text-left p-3 border-b">Aadhaar</th>
                      <th className="text-left p-3 border-b">Request Type</th>
                      <th className="text-left p-3 border-b">Date</th>
                      <th className="text-left p-3 border-b">Status</th>
                      <th className="text-left p-3 border-b">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingVerifications.map(verification => (
                      <tr key={verification.id} className="hover:bg-gray-50">
                        <td className="p-3 border-b">{verification.id}</td>
                        <td className="p-3 border-b">{verification.name}</td>
                        <td className="p-3 border-b">{verification.aadhaarNumber}</td>
                        <td className="p-3 border-b">{verification.requestType}</td>
                        <td className="p-3 border-b">{verification.requestDate}</td>
                        <td className="p-3 border-b">
                          <StatusBadge status={verification.status} />
                        </td>
                        <td className="p-3 border-b">
                          <button 
                            className="text-aadhaar-primary hover:underline"
                            onClick={() => handleVerificationSelect(verification)}
                          >
                            Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center py-4 text-gray-500">No pending verifications</p>
            )}
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Recent Verifications</h2>
            {otherVerifications.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 border-b">ID</th>
                      <th className="text-left p-3 border-b">Name</th>
                      <th className="text-left p-3 border-b">Aadhaar</th>
                      <th className="text-left p-3 border-b">Request Type</th>
                      <th className="text-left p-3 border-b">Date</th>
                      <th className="text-left p-3 border-b">Status</th>
                      <th className="text-left p-3 border-b">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {otherVerifications.map(verification => (
                      <tr key={verification.id} className="hover:bg-gray-50">
                        <td className="p-3 border-b">{verification.id}</td>
                        <td className="p-3 border-b">{verification.name}</td>
                        <td className="p-3 border-b">{verification.aadhaarNumber}</td>
                        <td className="p-3 border-b">{verification.requestType}</td>
                        <td className="p-3 border-b">{verification.requestDate}</td>
                        <td className="p-3 border-b">
                          <StatusBadge status={verification.status} />
                        </td>
                        <td className="p-3 border-b">{verification.remarks || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center py-4 text-gray-500">No recent verifications</p>
            )}
          </div>
        </div>

        <div>
          {selectedVerification ? (
            <div className="card sticky top-8">
              <h2 className="text-xl font-semibold mb-4">Review Verification</h2>
              <div className="mb-4">
                <h3 className="font-medium">{selectedVerification.name}</h3>
                <p className="text-sm text-gray-600">
                  {selectedVerification.aadhaarNumber}
                </p>
                <div className="flex items-center mt-1">
                  <span className="text-sm text-gray-600 mr-2">
                    Request Type:
                  </span>
                  <span className="font-medium">
                    {selectedVerification.requestType}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Admin Remarks
                </label>
                <textarea
                  className="input-field min-h-[100px]"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Enter your remarks or reason for rejection..."
                ></textarea>
              </div>

              <div className="flex space-x-2">
                <button
                  className="btn bg-aadhaar-rejected text-white hover:bg-red-600 flex-1"
                  onClick={handleReject}
                >
                  Reject
                </button>
                <button
                  className="btn bg-aadhaar-success text-white hover:bg-green-600 flex-1"
                  onClick={handleApprove}
                >
                  Approve
                </button>
              </div>
              
              <button
                className="btn btn-secondary w-full mt-2"
                onClick={() => {
                  setSelectedVerification(null);
                  setRemarks('');
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="card">
              <div className="text-center py-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-gray-400 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h2 className="text-lg font-medium mb-1">
                  Select a verification to review
                </h2>
                <p className="text-gray-500">
                  Click "Review" on any pending verification to begin
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
