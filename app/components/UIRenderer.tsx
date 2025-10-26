'use client';

import React, { useState } from 'react';
import { UIComponent } from '../types';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface UIRendererProps {
  components: UIComponent[];
  onAction: (action: string, data?: any) => void;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export default function UIRenderer({ components, onAction }: UIRendererProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const renderButton = (component: Extract<UIComponent, { type: 'button' }>) => {
    const variantClasses = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white',
      secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
      danger: 'bg-red-600 hover:bg-red-700 text-white'
    };
    const className = variantClasses[component.variant || 'primary'];
    
    return (
      <button
        onClick={() => onAction(component.action)}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${className}`}
      >
        {component.label}
      </button>
    );
  };

  const renderInput = (component: Extract<UIComponent, { type: 'input' }>) => {
    const [value, setValue] = useState('');
    
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium">{component.label}</label>
        <div className="flex gap-2">
          <input
            type={component.inputType || 'text'}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={component.placeholder}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => {
              onAction(component.action, { value });
              setValue('');
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
    );
  };

  const renderForm = (component: Extract<UIComponent, { type: 'form' }>) => {
    const [localFormData, setLocalFormData] = useState<Record<string, string>>({});
    
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onAction(component.action, localFormData);
          setLocalFormData({});
        }}
        className="space-y-4 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800"
      >
        {component.fields.map((field, idx) => (
          <div key={idx} className="space-y-1">
            <label className="block text-sm font-medium">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={localFormData[field.name] || ''}
              onChange={(e) => setLocalFormData({ ...localFormData, [field.name]: e.target.value })}
              placeholder={field.placeholder}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          {component.submitLabel}
        </button>
      </form>
    );
  };

  const renderTable = (component: Extract<UIComponent, { type: 'table' }>) => {
    return (
      <div className="overflow-x-auto">
        {component.caption && (
          <div className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {component.caption}
          </div>
        )}
        <table className="min-w-full border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              {component.headers.map((header, idx) => (
                <th key={idx} className="px-4 py-2 text-left text-sm font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {component.rows.map((row, rowIdx) => (
              <tr key={rowIdx} className="border-t border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="px-4 py-2 text-sm">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderChart = (component: Extract<UIComponent, { type: 'chart' }>) => {
    const renderChartContent = () => {
      if (component.chartType === 'line') {
        return (
          <LineChart data={component.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={component.xKey || 'name'} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={component.yKey || 'value'} stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        );
      } else if (component.chartType === 'bar') {
        return (
          <BarChart data={component.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={component.xKey || 'name'} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={component.yKey || 'value'} fill="#8884d8" />
          </BarChart>
        );
      } else {
        return (
          <PieChart>
            <Pie
              data={component.data}
              dataKey={component.yKey || 'value'}
              nameKey={component.xKey || 'name'}
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {component.data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );
      }
    };

    return (
      <div className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800">
        {component.title && (
          <div className="mb-2 text-sm font-semibold text-center">{component.title}</div>
        )}
        <ResponsiveContainer width="100%" height="90%">
          {renderChartContent()}
        </ResponsiveContainer>
      </div>
    );
  };

  const renderCard = (component: Extract<UIComponent, { type: 'card' }>) => {
    return (
      <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm">
        <h3 className="text-lg font-semibold mb-2">{component.title}</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{component.content}</p>
        {component.actions && (
          <div className="flex gap-2 flex-wrap">
            {component.actions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => onAction(action.action)}
                className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderList = (component: Extract<UIComponent, { type: 'list' }>) => {
    const ListTag = component.ordered ? 'ol' : 'ul';
    return (
      <ListTag className={`space-y-1 ${component.ordered ? 'list-decimal' : 'list-disc'} list-inside`}>
        {component.items.map((item, idx) => (
          <li key={idx} className="text-sm">{item}</li>
        ))}
      </ListTag>
    );
  };

  const renderSelect = (component: Extract<UIComponent, { type: 'select' }>) => {
    const [value, setValue] = useState('');
    
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium">{component.label}</label>
        <div className="flex gap-2">
          <select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select an option</option>
            {component.options.map((option, idx) => (
              <option key={idx} value={option.value}>{option.label}</option>
            ))}
          </select>
          <button
            onClick={() => {
              if (value) {
                onAction(component.action, { value });
              }
            }}
            disabled={!value}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-3">
      {components.map((component, idx) => (
        <div key={idx}>
          {component.type === 'button' && renderButton(component)}
          {component.type === 'input' && renderInput(component)}
          {component.type === 'form' && renderForm(component)}
          {component.type === 'table' && renderTable(component)}
          {component.type === 'chart' && renderChart(component)}
          {component.type === 'card' && renderCard(component)}
          {component.type === 'list' && renderList(component)}
          {component.type === 'select' && renderSelect(component)}
        </div>
      ))}
    </div>
  );
}
