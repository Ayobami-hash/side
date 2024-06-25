import React from "react";
import { FaBolt, FaSolarPanel, FaBatteryFull, FaPlug, FaClock } from "react-icons/fa";

// ... keep your existing interfaces ...
interface Appliance {
    id: number;
    name: string;
}

interface Calculation {
    id: number;
    appliance: Appliance;
    quantity: number;
    power_rating: number;
}

export interface LoadCalculation {
    id: string;
    total_load: number;
    inverter_rating: number;
    backup_time: number;
    battery_capacity: number;
    system_voltage: number;
    total_battery_capacity: number;
    numbers_of_batteries: number;
    total_solar_panel_capacity_needed: number;
    solar_panel_watt: number;
    numbers_of_solar_panel: number;
    total_current: number;
    created: string;
    updated: string;
    calc: Calculation[];
}

interface ResultComponentProps {
    result: LoadCalculation;
}

const formatValue = (value: number, unit: string): string => {
  if (value >= 1000 && (unit === 'W' || unit === 'Ah')) {
    return `${(value / 1000).toFixed(2)} k${unit}`;
  }
  return `${value} ${unit}`;
}

const ResultCard: React.FC<{ icon: React.ReactNode; value: string; label: string }> = ({ icon, value, label }) => (
  <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center transition-all hover:shadow-lg hover:scale-105">
    <div className="text-orange-400 mb-2">{icon}</div>
    <div className="text-2xl font-bold text-gray-800">{value}</div>
    <div className="text-xs text-gray-500 text-center mt-1">{label}</div>
  </div>
);

const ResultComponent: React.FC<ResultComponentProps> = ({ result }) => {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Calculation Results</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <ResultCard 
          icon={<FaBolt size={24} />}
          value={formatValue(result.total_load, 'W')}
          label="Total Load"
        />
        <ResultCard 
          icon={<FaSolarPanel size={24} />}
          value={result.numbers_of_solar_panel.toString()}
          label="Solar Panels Needed"
        />
        <ResultCard 
          icon={<FaBatteryFull size={24} />}
          value={result.numbers_of_batteries.toString()}
          label="Batteries Needed"
        />
        <ResultCard 
          icon={<FaSolarPanel size={24} />}
          value={formatValue(result.total_solar_panel_capacity_needed, 'W')}
          label="Total Solar Capacity"
        />
        <ResultCard 
          icon={<FaBatteryFull size={24} />}
          value={formatValue(result.total_battery_capacity, 'Ah')}
          label="Total Battery Capacity"
        />
        <ResultCard 
          icon={<FaPlug size={24} />}
          value={formatValue(result.inverter_rating, 'W')}
          label="Inverter Rating"
        />
        <ResultCard 
          icon={<FaClock size={24} />}
          value={`${result.backup_time} hrs`}
          label="Backup Time"
        />
        <ResultCard 
          icon={<FaBatteryFull size={24} />}
          value={formatValue(result.battery_capacity, 'Ah')}
          label="Battery Capacity"
        />
        <ResultCard 
          icon={<FaSolarPanel size={24} />}
          value={`${result.solar_panel_watt} W`}
          label="Solar Panel Capacity"
        />
        <ResultCard 
          icon={<FaBolt size={24} />}
          value={`${result.system_voltage} V`}
          label="System Voltage"
        />
      </div>
    </div>
  );
}

export default ResultComponent;