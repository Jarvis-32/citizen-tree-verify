
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button.tsx';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-aadhaar-primary text-white py-16">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Aadhaar Registration & Family Tree</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Complete your Aadhaar verification and build your family tree in one place
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-medium px-6 py-2 rounded-full shadow-md transition-all duration-300">
                Get Started
              </Button>
            </Link>
            <Link to="/family-tree">
              <Button className="bg-white text-indigo-700 hover:bg-gray-100 font-medium px-6 py-2 rounded-full shadow-md border border-indigo-200 transition-all duration-300">
                View Family Tree
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card text-center p-8">
            <div className="mb-4 bg-aadhaar-secondary rounded-full w-16 h-16 flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-aadhaar-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Secure Verification</h2>
            <p className="text-gray-600">
              Verify your identity using your Aadhaar card with our secure verification process
            </p>
          </div>

          <div className="card text-center p-8">
            <div className="mb-4 bg-aadhaar-secondary rounded-full w-16 h-16 flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-aadhaar-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Family Tree</h2>
            <p className="text-gray-600">
              Build and visualize your family connections across multiple generations
            </p>
          </div>

          <div className="card text-center p-8">
            <div className="mb-4 bg-aadhaar-secondary rounded-full w-16 h-16 flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-aadhaar-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Quick Admin Approval</h2>
            <p className="text-gray-600">
              Get your information verified quickly through our streamlined admin verification process
            </p>
          </div>
        </div>
      </div>

      <div className="bg-aadhaar-secondary py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mb-4 shadow-md text-aadhaar-primary font-bold">1</div>
              <h3 className="font-bold mb-2">Verify Aadhaar</h3>
              <p className="text-gray-600">Enter your Aadhaar number to verify your identity</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mb-4 shadow-md text-aadhaar-primary font-bold">2</div>
              <h3 className="font-bold mb-2">Update Information</h3>
              <p className="text-gray-600">Update your personal information if needed</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mb-4 shadow-md text-aadhaar-primary font-bold">3</div>
              <h3 className="font-bold mb-2">Admin Verification</h3>
              <p className="text-gray-600">Wait for admin to verify your updated information</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mb-4 shadow-md text-aadhaar-primary font-bold">4</div>
              <h3 className="font-bold mb-2">Build Family Tree</h3>
              <p className="text-gray-600">Add family members and build your family tree</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
