import { Link } from "react-router-dom";
import img1 from '../assets/solar.jpg'
import LoadCalculator from "../components/LoadCalculator";
// import img2 from '../assets/solar3.jpeg'

// pages/Home
const Home = () => {
  return (
    <>
    <div className=" w-[100vw] -ml-[6.1vw] -my-[6.1vh]">
        <div className=" h-[90vh] bg-gradient-to-br to-[#f7c9af] from-[#fae3d9]">
          <nav className="h-16 px-8 flex justify-between items-center shadow-lg">
            <h1 className="text-3xl font-extrabold text-orange-500">SolarBridge</h1>
            <div className="flex items-center space-x-8">
                {['Home', 'About', 'Contact Us'].map((item) => (
                <Link key={item} to='/' className="text-lg font-medium hover:text-orange-600 transition-colors">
                    {item}
                </Link>
                ))}
            </div>
            </nav>
            <div className="flex flex-col lg:flex-row items-center justify-between py-16 px-8 bg-gradient-to-br to-[#f7c9af] from-[#fae3d9]">
                <div className="lg:w-1/2 mb-8 lg:mb-0">
                    <img src={img1} alt="Solar panel" className="rounded-lg shadow-2xl object-cover w-full h-[400px]" />
                </div>
                <div className="lg:w-1/2 lg:pl-16">
                    <h2 className="text-5xl font-bold text-orange-800 mb-6">Transform Your Energy</h2>
                    <p className="text-2xl text-gray-700 mb-8">Effortless, Accurate Solar Savings Calculations at Your Fingertips</p>
                    <button className="bg-orange-500 text-white font-bold py-3 px-6 rounded-full hover:bg-orange-700 transition-colors">
                    Calculate Savings
                    </button>
                </div>
                </div>
        </div>
        <LoadCalculator />
        <div className="py-16 px-8 bg-white">
            <h3 className="text-3xl font-bold text-center mb-12">Why Choose SolarBridge?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                { title: 'Accurate Calculations', description: 'Get precise solar savings estimates.' },
                { title: 'User-Friendly', description: 'Easy-to-use interface for all users.' },
                { title: 'Expert Support', description: '24/7 support from solar energy experts.' },
                ].map((feature) => (
                <div key={feature.title} className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                </div>
                ))}
            </div>
        </div>
        <div className="bg-orange-500 text-white py-16 px-8 text-center">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Saving?</h3>
            <p className="text-xl mb-8">Calculate your potential solar savings today!</p>
            <button className="bg-white text-orange-500 font-bold py-3 px-6 rounded-full hover:bg-gray-100 transition-colors">
                Get Started
            </button>
        </div>
        <footer className="bg-gray-600 text-white py-8 px-8">
            <div className="container mx-auto flex flex-wrap justify-between">
                <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <h5 className="text-2xl font-bold mb-4">SolarBridge</h5>
                <p>Transforming energy, one calculation at a time.</p>
                </div>
                <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <h5 className="text-xl font-semibold mb-4">Quick Links</h5>
                <ul>
                    {['Home', 'About', 'Contact', 'Privacy Policy'].map((item) => (
                    <li key={item} className="mb-2">
                        <Link to='/' className="hover:text-blue-400 transition-colors">{item}</Link>
                    </li>
                    ))}
                </ul>
                </div>
                <div className="w-full md:w-1/3">
                <h5 className="text-xl font-semibold mb-4">Contact Us</h5>
                <p>Email: info@solarbridge.com</p>
                <p>Phone: (123) 456-7890</p>
                </div>
            </div>
            </footer>
    </div>
    </>
  );
};

export default Home;