import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCircleCheck } from "react-icons/fa6";
import Dropdown from '../subcomponents/Dropdown';
import ResultComponent, { LoadCalculation } from './ResultComponent';

const apiUrl = import.meta.env.VITE_API_BASE_URL;


interface Appliance {
  id: number;
  name: string;
  quantity: number;
}

interface SelectedAppliance {
  appliance: {
    name: string;
  };
  quantity: number;
  power_rating: number;
}


const LoadCalculator: React.FC = () => {
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [selectedAppliances, setSelectedAppliances] = useState<number[]>([]);
  const [selectedAppliances2, setSelectedAppliances2] = useState<SelectedAppliance[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [loads, setLoads] = useState<{ [key: number]: number }>({});

  const [ backupTime, setBackupTime ] = useState<number>();
  const [ batteryCapacity, setBatteryCapacity ] = useState<string>('Select an Option');
  const [batteryCapacityValue, setBatteryCapacityValue] = useState<number | null>(null);
  const [ systemVoltage, setSystemVoltage ] = useState<string>('Select an Option');
  const [systemVoltageValue, setSystemVoltageValue] = useState<number | null>(null);
  const [ solarPanelWatt, setSolarPanelWatt ] = useState<string>('Select an Option');
  const [solarPanelWattValue, setSolarPanelWattValue] = useState<number | null>(null);

  // const [selectedAppliances, setSelectedAppliances] = useState<SelectedAppliance[]>([]);
  const [totalLoad, setTotalLoad] = useState<number>(0);
  const [recommendedInvertor, setRecommendedInvertor] = useState<number>(0);
  const [ result, setResult ] = useState<LoadCalculation | null >(null);

  const [ loading, setLoading ] = useState<boolean>(false);

  const postMessage = {
    "backup_time": backupTime,
    "battery_capacity": batteryCapacityValue,
    "system_voltage": systemVoltageValue,
    "solar_panel_watt": solarPanelWattValue,
      "calc": selectedAppliances2
  }

  useEffect(() => {
    fetchAppliances();
  }, []);

  useEffect(() => {
    const updatedSelectedAppliances = selectedAppliances.map(id => {
      const appliance = appliances.find(app => app.id === id);
      if (appliance) {
        return {
          appliance: {
            name: appliance.name
          },
          quantity: quantities[id] || 0,
          power_rating: loads[id] || 0
        };
      }
      return null;
    }).filter((app): app is SelectedAppliance => app !== null);
  
    setSelectedAppliances2(updatedSelectedAppliances);
  }, [selectedAppliances, quantities, loads, appliances]);


  // console.log(selectedAppliances)
  const fetchAppliances = async () => {
    try {
      const response = await axios.get<Appliance[]>(`${apiUrl}/appliances/`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // If the server requires credentials like cookies or HTTP authentication
      });
    // When setting appliances, you might need to add a default power:
    setAppliances(response.data.map(app => ({ ...app }))); // Example default power
    } catch (error) {
      console.error('Error fetching appliances:', error);
    }
  };

  const handleApplianceSelect = (applianceId: number) => {
    if (selectedAppliances.includes(applianceId)) {
      // Deselect the appliance
      setSelectedAppliances(selectedAppliances.filter(id => id !== applianceId));
      // Remove the quantity for this appliance
      const newQuantities = { ...quantities };
      const newLoads = { ...loads };
      delete newQuantities[applianceId];
      delete newLoads[applianceId];
      setQuantities(newQuantities);
      setLoads(newLoads);
    } else {
      // Select the appliance
      setSelectedAppliances([...selectedAppliances, applianceId]);
      // Set initial quantity to 1 and load to 100
      setQuantities({ ...quantities, [applianceId]: 1 });
      setLoads({ ...loads, [applianceId]: 100 });
    }
    calculateTotalLoad();
  };

  const handleQuantityChange = (applianceId: number, quantity: string) => {
    const newQuantity = parseInt(quantity) || 0;
    setQuantities({ ...quantities, [applianceId]: newQuantity });
    calculateTotalLoad();
  };

  const handleLoadChange = (applianceId: number, load: string) => {
    const newLoad = parseInt(load) || 0;
    setLoads({ ...loads, [applianceId]: newLoad });
    calculateTotalLoad();
  };

  const handleBackupTime = (time: number) => {
    setBackupTime(time);
  };
  const handleBatteryCapacity = (option: string) => {
    setBatteryCapacity(option);
    const value = parseInt(option.split(' ')[0]);
    setBatteryCapacityValue(value);
  };
  const handleSystemVoltage = (option: string) => {
    setSystemVoltage(option);
    const value = parseInt(option);
    setSystemVoltageValue(value);
  };
  const handleSolarPanelWatt = (option: string) => {
    setSolarPanelWatt(option);
    const value = parseInt(option.split('W')[0]);
    setSolarPanelWattValue(value);
  };

  const calculateTotalLoad = () => {
    const total = selectedAppliances2.reduce((sum, app) => sum + (app.power_rating * app.quantity), 0);
    setTotalLoad(total);
    setRecommendedInvertor(Math.ceil(total / 0.8 / 100) * 100);
  };
  
  const handleCalculate = async() => {
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/calculate/`, postMessage, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // If the server requires credentials like cookies or HTTP authentication
      });
    // When setting appliances, you might need to add a default power:
      console.log(response.data);
      setResult(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error calculating data:', error);
      setLoading(false);
    }
    console.log(totalLoad);
    console.log(recommendedInvertor);
  }

  return (
    <div className="max-w-5xl mx-auto py-[20vh] ">
      <h2 className="text-2xl font-bold mb-10 text-orange-400">Load Calculator</h2>
      <div className="flex">
        <div className="w-[100vw] pr-4 relative flex justify-between gap-10 -ml-[6rem] -mr-[8rem] " >
          <table className="w-2/3">
            <thead>
              <tr>
                <th className="text-center">Appliance</th>
                <th className="text-center">Quantity</th>
                <th className="text-center">Power Rating (W)</th>
              </tr>
            </thead>
            <tbody>
              {appliances.map((app, index) => (
                <tr key={index}>
                  <td className='w-1/3'>
                    <div className='py-2 flex items-center justify-center'>
                      <button 
                        className={`border px-7 py-4 relative rounded-2xl w-[16rem] shadow-md ${selectedAppliances.includes(app.id) ? 'bg-orange-300 text-white flex items-center' : '' } `}
                        onClick={() => handleApplianceSelect(app.id)}
                      >
                       {app.name}
                       {
                        selectedAppliances.includes(app.id) && (
                          <div className='absolute right-4'>
                            <FaCircleCheck size={22} />
                          </div>
                        )
                       }
                      </button>
                    </div>
                  </td>
                  <td className='w-1/3'>
                    <input
                      type="text"
                      value={quantities[app.id] || ''}
                      placeholder='How Many?'
                      disabled={!selectedAppliances.includes(app.id)}
                      title='quantity'
                      onChange={(e) => handleQuantityChange(app.id, e.target.value)}
                      className={`w-[10rem] border rounded-lg ${selectedAppliances.includes(app.id) ? 'cursor-text border-orange-200 outline-orange-200' : 'cursor-not-allowed'} pl-9 py-3`}
                    />
                  </td>
                  <td className='w-1/3'>
                    <input 
                      type="text"
                      value={loads[app.id] || ''}
                      placeholder='Power Rating (W)'
                      title='Load'
                      disabled={!selectedAppliances.includes(app.id)}
                      onChange={(e) => handleLoadChange(app.id, e.target.value)}
                      className={`w-[14rem] border rounded-lg ${selectedAppliances.includes(app.id) ? 'cursor-text border-orange-200 outline-orange-200' : 'cursor-not-allowed'} pl-10 py-3`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='flex flex-col w-1/3 items-start mt-10 gap-7 border-l p-4 text-base right-0 '>
            <label htmlFor="">
              How many hours of backup you need during a power outage? 
              <input type="number" min={1} max={9223372036854776000} onChange={(e) => handleBackupTime(e.target.valueAsNumber)} value={backupTime} className='ml-6 border border-orange-200 outline-orange-300 p-2 rounded-xl shadow-md' />
              <span className=' text-xs italic ml-1 '>(in hrs)</span>
            </label>
            <div className='flex flex-col gap-4 text-base items-center'>
                What type of battery capacity do you desire?
                <div>
                  <Dropdown options={['150Ah 12V', '200Ah 12V', '220Ah 12V', '250Ah 12V']} onSelect={handleBatteryCapacity} value={batteryCapacity} />
                </div>
            </div>
            <div className='flex flex-col gap-4 text-base items-center'>
              What type of system voltage do you desire?
              <div>
                <Dropdown options={['12V', '24V', '48V']} onSelect={handleSystemVoltage} value={systemVoltage} />
              </div>
            </div>
            <div className='flex flex-col gap-4 text-base items-center'>
              How many watts do you desire for the solar panel?
              <div>
               <Dropdown options={['300W', '350W', '400W', '450W']} onSelect={handleSolarPanelWatt} value={solarPanelWatt} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-12 mb-20'>
        <button className={`w-[30vw] border py-6 rounded-full shadow-sm bg-orange-400 text-white text-xl ${loading ? 'opacity-25 cursor-wait': ''} `} disabled={loading} onClick={handleCalculate} > {loading ? 'Calculating...' : 'Calculate'} </button>
      </div>
      {result !== null && <ResultComponent result={result} />}
    </div>
  );
};

export default LoadCalculator;