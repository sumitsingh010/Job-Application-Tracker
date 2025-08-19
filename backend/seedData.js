const Application = require('./models/Application');
const mongoose = require('mongoose');
require('dotenv').config();

// Demo data
const demoApplications = [
  // Applied Stage
  {
    candidateName: "Arjun Sharma",
    role: "Frontend Developer",
    yearsOfExperience: 3,
    resumeLink: "https://linkedin.com/in/arjun-sharma-dev",
    email: "arjun.sharma@gmail.com",
    phone: "+91-9876543210",
    notes: "Expert in React.js and Next.js. Built 5+ e-commerce platforms. IIT Delhi graduate.",
    status: "Applied"
  },
  {
    candidateName: "Priya Patel",
    role: "UI/UX Designer",
    yearsOfExperience: 4,
    resumeLink: "https://behance.net/priya-patel",
    email: "priya.patel@design.com",
    phone: "+91-8765432109",
    notes: "Award-winning designer. Worked with Flipkart and Zomato. Strong in Figma and Adobe Suite.",
    status: "Applied"
  },
  {
    candidateName: "Rohit Kumar",
    role: "Data Scientist",
    yearsOfExperience: 2,
    resumeLink: "https://github.com/rohit-kumar-ds",
    email: "rohit.kumar@analytics.com",
    phone: "+91-7654321098",
    notes: "Machine Learning specialist. Published 3 research papers. Expert in Python and TensorFlow.",
    status: "Applied"
  },
  {
    candidateName: "Sneha Reddy",
    role: "Backend Developer",
    yearsOfExperience: 5,
    resumeLink: "https://portfolio.sneha-reddy.dev",
    email: "sneha.reddy@backend.com",
    phone: "+91-6543210987",
    notes: "Microservices architect. Scaled applications to 1M+ users. AWS certified.",
    status: "Applied"
  },

  // Interview Stage
  {
    candidateName: "Vikash Singh",
    role: "Full Stack Developer",
    yearsOfExperience: 6,
    resumeLink: "https://vikash-singh.portfolio.dev",
    email: "vikash.singh@fullstack.com",
    phone: "+91-5432109876",
    notes: "MERN stack expert. Led development teams at Paytm. Strong system design skills.",
    status: "Interview"
  },
  {
    candidateName: "Anjali Gupta",
    role: "DevOps Engineer",
    yearsOfExperience: 4,
    resumeLink: "https://github.com/anjali-devops",
    email: "anjali.gupta@devops.com",
    phone: "+91-4321098765",
    notes: "Kubernetes expert. Automated CI/CD for 50+ projects. Multi-cloud experience.",
    status: "Interview"
  },
  {
    candidateName: "Ravi Mehta",
    role: "Mobile Developer",
    yearsOfExperience: 3,
    resumeLink: "https://play.google.com/developer/ravi-mehta",
    email: "ravi.mehta@mobile.com",
    phone: "+91-3210987654",
    notes: "React Native & Flutter expert. Published 10+ apps with 100K+ downloads.",
    status: "Interview"
  },

  // Offer Stage
  {
    candidateName: "Kavya Nair",
    role: "Product Manager",
    yearsOfExperience: 7,
    resumeLink: "https://kavya-nair-pm.com",
    email: "kavya.nair@product.com",
    phone: "+91-2109876543",
    notes: "Ex-Google PM. Launched 3 successful products. MBA from ISB Hyderabad.",
    status: "Offer"
  },
  {
    candidateName: "Aditya Joshi",
    role: "Security Engineer",
    yearsOfExperience: 5,
    resumeLink: "https://aditya-security.github.io",
    email: "aditya.joshi@security.com",
    phone: "+91-1098765432",
    notes: "Cybersecurity specialist. CISSP certified. Prevented 20+ security breaches.",
    status: "Offer"
  },

  // Rejected Stage
  {
    candidateName: "Rahul Agarwal",
    role: "QA Engineer",
    yearsOfExperience: 2,
    resumeLink: "https://rahul-qa.testing.com",
    email: "rahul.agarwal@qa.com",
    phone: "+91-0987654321",
    notes: "Automation testing expert. Selenium and Cypress specialist. Good technical skills but limited experience.",
    status: "Rejected"
  },

  // Hired Stage
  {
    candidateName: "Deepika Choudhary",
    role: "Tech Lead",
    yearsOfExperience: 8,
    resumeLink: "https://deepika-tech-lead.dev",
    email: "deepika.c@techlead.com",
    phone: "+91-9988776655",
    notes: "Exceptional leadership skills. Built scalable architecture for unicorn startup. Team of 15 developers.",
    status: "Hired"
  },
  {
    candidateName: "Manish Verma",
    role: "AI Engineer",
    yearsOfExperience: 4,
    resumeLink: "https://manish-ai.research.com",
    email: "manish.verma@ai.com",
    phone: "+91-8877665544",
    notes: "PhD in AI from IISc. Published 15+ papers. Built recommendation systems for major e-commerce.",
    status: "Hired"
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/job-tracker';
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Application.deleteMany({});
    console.log('🗑️ Cleared existing applications');

    // Insert demo data
    const applications = await Application.insertMany(demoApplications);
    console.log(`📝 Created ${applications.length} demo applications`);

    // Show summary
    const statusCounts = await Application.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    
    console.log('\n📊 Application Status Summary:');
    statusCounts.forEach(({ _id, count }) => {
      console.log(`   ${_id}: ${count}`);
    });

    console.log('\n🎉 Demo data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Only run if called directly (not imported)
if (require.main === module) {
  seedDatabase();
}

module.exports = { demoApplications, seedDatabase };
