
import React, { useState } from 'react';
import { mockFamilyRelations } from '../services/mockData';
import { useToast } from '@/components/ui/use-toast';

interface FamilyMember {
  id: number;
  name: string;
  gender: string;
  aadhaarNumber: string;
  relationships: {
    spouse: number | null;
    children: number[];
    siblings: number[];
    parents: number[];
  };
  generation: number;
}

interface FamilyMemberCardProps {
  member: FamilyMember;
  isSelected: boolean;
  onSelect: (member: FamilyMember) => void;
}

const FamilyMemberCard: React.FC<FamilyMemberCardProps> = ({ member, isSelected, onSelect }) => {
  const cardClasses = `p-3 rounded-lg shadow border ${
    isSelected 
      ? 'border-aadhaar-primary bg-blue-50' 
      : 'border-gray-200 bg-white'
  } ${
    member.gender === 'Male' 
      ? 'border-l-4 border-l-blue-500' 
      : 'border-l-4 border-l-pink-500'
  }`;

  return (
    <div 
      className={cardClasses}
      onClick={() => onSelect(member)}
    >
      <h3 className="font-semibold text-sm">{member.name}</h3>
      <p className="text-xs text-gray-500">{member.aadhaarNumber}</p>
    </div>
  );
};

const FamilyTree: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [newMember, setNewMember] = useState({
    name: '',
    gender: 'Male',
    aadhaarNumber: '',
    relationship: 'child',
  });
  const { toast } = useToast();

  const handleSelectMember = (member: FamilyMember) => {
    setSelectedMember(member);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMember.name && newMember.aadhaarNumber) {
      toast({
        title: "Family Member Added",
        description: `${newMember.name} has been added to your family tree`,
      });
      
      // Reset form
      setNewMember({
        name: '',
        gender: 'Male',
        aadhaarNumber: '',
        relationship: 'child',
      });
    } else {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewMember({
      ...newMember,
      [e.target.name]: e.target.value,
    });
  };

  // Group family members by generation for display
  const familyByGeneration = mockFamilyRelations.reduce((acc: { [key: number]: FamilyMember[] }, member) => {
    const gen = member.generation;
    if (!acc[gen]) {
      acc[gen] = [];
    }
    acc[gen].push(member);
    return acc;
  }, {});

  // Sort generations in descending order (oldest first)
  const sortedGenerations = Object.keys(familyByGeneration)
    .map(Number)
    .sort((a, b) => b - a);

  // Get related members for a selected member
  const getRelatedMembers = (member: FamilyMember | null) => {
    if (!member) return { parents: [], spouse: null, siblings: [], children: [] };
    
    const parents = mockFamilyRelations.filter(m => member.relationships.parents.includes(m.id));
    const spouse = member.relationships.spouse 
      ? mockFamilyRelations.find(m => m.id === member.relationships.spouse) 
      : null;
    const siblings = mockFamilyRelations.filter(m => member.relationships.siblings.includes(m.id));
    const children = mockFamilyRelations.filter(m => member.relationships.children.includes(m.id));
    
    return { parents, spouse, siblings, children };
  };

  const related = getRelatedMembers(selectedMember);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-aadhaar-primary">Family Tree</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="card mb-6">
            <h2 className="text-xl font-semibold mb-4">Family Visualization</h2>
            
            {sortedGenerations.map(gen => (
              <div key={gen} className="mb-8">
                <h3 className="text-md font-medium mb-2 text-aadhaar-primary border-b pb-1">
                  Generation {gen} 
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    {gen === 2 ? '(Grandparents)' : gen === 1 ? '(Parents)' : gen === 0 ? '(Self/Siblings)' : '(Children)'}
                  </span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {familyByGeneration[gen].map(member => (
                    <FamilyMemberCard 
                      key={member.id}
                      member={member}
                      isSelected={selectedMember?.id === member.id}
                      onSelect={handleSelectMember}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="card mb-6">
            <h2 className="text-xl font-semibold mb-4">Add Family Member</h2>
            <form onSubmit={handleAddMember}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="input-field"
                    value={newMember.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Gender</label>
                  <select
                    name="gender"
                    className="input-field"
                    value={newMember.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Aadhaar Number</label>
                  <input
                    type="text"
                    name="aadhaarNumber"
                    className="input-field"
                    value={newMember.aadhaarNumber}
                    onChange={handleInputChange}
                    placeholder="XXXX XXXX XXXX"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Relationship to You</label>
                  <select
                    name="relationship"
                    className="input-field"
                    value={newMember.relationship}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="parent">Parent</option>
                    <option value="spouse">Spouse</option>
                    <option value="child">Child</option>
                    <option value="sibling">Sibling</option>
                    <option value="grandparent">Grandparent</option>
                  </select>
                </div>

                <div>
                  <button type="submit" className="btn btn-primary w-full">
                    Add Member
                  </button>
                </div>
              </div>
            </form>
          </div>

          {selectedMember && (
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Member Details</h2>
              <div className="mb-3">
                <h3 className="font-semibold text-lg">{selectedMember.name}</h3>
                <p className="text-sm text-gray-600">Aadhaar: {selectedMember.aadhaarNumber}</p>
                <p className="text-sm text-gray-600">Gender: {selectedMember.gender}</p>
              </div>

              <div className="space-y-3">
                {related.parents.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-aadhaar-primary">Parents:</h4>
                    <ul className="pl-3 text-sm">
                      {related.parents.map(parent => (
                        <li key={parent.id}>{parent.name}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {related.spouse && (
                  <div>
                    <h4 className="text-sm font-medium text-aadhaar-primary">Spouse:</h4>
                    <p className="pl-3 text-sm">{related.spouse.name}</p>
                  </div>
                )}

                {related.siblings.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-aadhaar-primary">Siblings:</h4>
                    <ul className="pl-3 text-sm">
                      {related.siblings.map(sibling => (
                        <li key={sibling.id}>{sibling.name}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {related.children.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-aadhaar-primary">Children:</h4>
                    <ul className="pl-3 text-sm">
                      {related.children.map(child => (
                        <li key={child.id}>{child.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FamilyTree;
