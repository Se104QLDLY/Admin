import React from 'react';

interface TeamMember {
  image: string;
  name: string;
  role: string;
}

interface TeamProps {
  className?: string;
}

const teamMembers: TeamMember[] = [
  {
    image: '/team/member1.jpg',
    name: 'Nguyễn Văn A',
    role: 'Founder & CEO'
  },
  {
    image: '/team/member2.jpg',
    name: 'Trần Thị B',
    role: 'Product Manager'
  },
  {
    image: '/team/member3.jpg',
    name: 'Lê Văn C',
    role: 'Technical Lead'
  },
  {
    image: '/team/member4.jpg',
    name: 'Phạm Thị D',
    role: 'Marketing Director'
  }
];

export const Team: React.FC<TeamProps> = ({ className = '' }) => {
  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Đối tác của chúng tôi
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center bg-white rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all p-6 border-2 border-blue-100">
              <div className="relative mb-4 aspect-square overflow-hidden rounded-xl shadow-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-blue-800 mb-1">{member.name}</h3>
              <p className="text-blue-600 font-medium">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;