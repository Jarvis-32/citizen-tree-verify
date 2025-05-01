
// Mock Aadhaar data
export const mockAadhaarData = [
  {
    aadhaarNumber: "1234 5678 9012",
    name: "Rajesh Kumar",
    dateOfBirth: "1985-05-15",
    gender: "Male",
    address: "123 Main St, Bangalore, Karnataka, 560001",
    phone: "9876543210",
    email: "rajesh.kumar@example.com",
  },
  {
    aadhaarNumber: "2345 6789 0123",
    name: "Priya Sharma",
    dateOfBirth: "1990-08-23",
    gender: "Female",
    address: "456 Park Ave, Mumbai, Maharashtra, 400001",
    phone: "8765432109",
    email: "priya.sharma@example.com",
  },
  {
    aadhaarNumber: "3456 7890 1234",
    name: "Amit Patel",
    dateOfBirth: "1978-11-30",
    gender: "Male",
    address: "789 Garden Rd, Ahmedabad, Gujarat, 380001",
    phone: "7654321098",
    email: "amit.patel@example.com",
  },
  {
    aadhaarNumber: "4567 8901 2345",
    name: "Neha Singh",
    dateOfBirth: "1992-02-14",
    gender: "Female",
    address: "101 River View, Delhi, 110001",
    phone: "6543210987",
    email: "neha.singh@example.com",
  },
  {
    aadhaarNumber: "5678 9012 3456",
    name: "Suresh Reddy",
    dateOfBirth: "1982-07-08",
    gender: "Male",
    address: "202 Hill Top, Hyderabad, Telangana, 500001",
    phone: "5432109876",
    email: "suresh.reddy@example.com",
  }
];

// Mock family relationship data
export const mockFamilyRelations = [
  {
    id: 1,
    name: "Ramesh Kumar",
    gender: "Male",
    aadhaarNumber: "1111 2222 3333",
    relationships: {
      spouse: 2,
      children: [3, 4],
      siblings: [],
      parents: [5, 6]
    },
    generation: 1
  },
  {
    id: 2,
    name: "Sunita Kumar",
    gender: "Female",
    aadhaarNumber: "2222 3333 4444",
    relationships: {
      spouse: 1,
      children: [3, 4],
      siblings: [],
      parents: [7, 8]
    },
    generation: 1
  },
  {
    id: 3,
    name: "Rahul Kumar",
    gender: "Male",
    aadhaarNumber: "3333 4444 5555",
    relationships: {
      spouse: null,
      children: [],
      siblings: [4],
      parents: [1, 2]
    },
    generation: 0
  },
  {
    id: 4,
    name: "Pooja Kumar",
    gender: "Female",
    aadhaarNumber: "4444 5555 6666",
    relationships: {
      spouse: 9,
      children: [10],
      siblings: [3],
      parents: [1, 2]
    },
    generation: 0
  },
  {
    id: 5,
    name: "Mohan Kumar",
    gender: "Male",
    aadhaarNumber: "5555 6666 7777",
    relationships: {
      spouse: 6,
      children: [1],
      siblings: [],
      parents: []
    },
    generation: 2
  },
  {
    id: 6,
    name: "Lata Kumar",
    gender: "Female",
    aadhaarNumber: "6666 7777 8888",
    relationships: {
      spouse: 5,
      children: [1],
      siblings: [],
      parents: []
    },
    generation: 2
  },
  {
    id: 7,
    name: "Rakesh Sharma",
    gender: "Male",
    aadhaarNumber: "7777 8888 9999",
    relationships: {
      spouse: 8,
      children: [2],
      siblings: [],
      parents: []
    },
    generation: 2
  },
  {
    id: 8,
    name: "Meena Sharma",
    gender: "Female",
    aadhaarNumber: "8888 9999 0000",
    relationships: {
      spouse: 7,
      children: [2],
      siblings: [],
      parents: []
    },
    generation: 2
  },
  {
    id: 9,
    name: "Vikram Singh",
    gender: "Male",
    aadhaarNumber: "9999 0000 1111",
    relationships: {
      spouse: 4,
      children: [10],
      siblings: [],
      parents: []
    },
    generation: 0
  },
  {
    id: 10,
    name: "Aarav Singh",
    gender: "Male",
    aadhaarNumber: "0000 1111 2222",
    relationships: {
      spouse: null,
      children: [],
      siblings: [],
      parents: [4, 9]
    },
    generation: -1
  }
];

// Mock verification data
export const mockVerifications = [
  {
    id: "VER-001",
    aadhaarNumber: "1234 5678 9012",
    name: "Rajesh Kumar",
    requestDate: "2023-04-15",
    status: "Verified",
    remarks: "All documents verified successfully",
    requestType: "Information Update"
  },
  {
    id: "VER-002",
    aadhaarNumber: "2345 6789 0123",
    name: "Priya Sharma",
    requestDate: "2023-04-16",
    status: "Pending",
    requestType: "Address Change"
  },
  {
    id: "VER-003",
    aadhaarNumber: "3456 7890 1234",
    name: "Amit Patel",
    requestDate: "2023-04-14",
    status: "Rejected",
    remarks: "Insufficient documentation",
    requestType: "Phone Number Update"
  },
  {
    id: "VER-004",
    aadhaarNumber: "4567 8901 2345",
    name: "Neha Singh",
    requestDate: "2023-04-13",
    status: "Pending",
    requestType: "Email Update"
  },
  {
    id: "VER-005",
    aadhaarNumber: "5678 9012 3456",
    name: "Suresh Reddy",
    requestDate: "2023-04-12",
    status: "Pending",
    requestType: "Name Correction"
  }
];

// Add TypeScript interface for verification records
export const VerificationRecord = {
  id: String,
  aadhaarNumber: String,
  name: String,
  requestDate: String,
  status: String,
  remarks: String,
  requestType: String
};
