import { generateMockDataFromSchema } from '@/actions/mock-data-generator';
import useInspectorStore from '@/stores/inspector';
import React, { useState } from 'react'

import SSCSVParser from '@/lib/sscsv-parser';
import MockDataResult from './mock-data/mock-data-result';

export default function MockDataGeneration() {
  // const [ ]
  const [ loading, setLoading ] = useState();
  const [ mockData, setMockData ] = useState<object | null>(null); 

  const { mainSchemaText } = useInspectorStore();
  
  async function getMockData() {
    const response = await generateMockDataFromSchema(mainSchemaText, 5);

    const parser = new SSCSVParser();
    const parsedData = parser.parse(response);
    setMockData(parsedData.data);
  }
  
  return (
    <div className=''>
      <button 
        className='px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold'
        onClick={getMockData}
      >Generate</button>
      {
        mockData && <MockDataResult data={mockData as {[_:string]:object[]}} />
      }
    </div>
  );
}