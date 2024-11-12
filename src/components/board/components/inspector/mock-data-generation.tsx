import { generateMockDataFromSchema } from '@/actions/mock-data-generator';
import useInspectorStore from '@/stores/inspector';
import React, { FormEvent, useState } from 'react'

import SSCSVParser from '@/lib/sscsv-parser';
import MockDataResult from './mock-data/mock-data-result';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LoaderCircle } from 'lucide-react';

export default function MockDataGeneration() {
  // const [ ]
  const [ loading, setLoading ] = useState(false);
  const [ mockData, setMockData ] = useState<object | null>(null); 
  const [ numOfRows, setNumOfRows ] = useState<number | null>(null);

  const { mainSchemaText } = useInspectorStore();
  
  const handleNumOfRowsSelect = (val: string) => setNumOfRows(parseInt(val));
  
  async function getMockData(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if ( !numOfRows ) return;
    
    setLoading(true);
    const response = await generateMockDataFromSchema(mainSchemaText, numOfRows);

    const parser = new SSCSVParser();
    const parsedData = parser.parse(response);
    setMockData(parsedData.data);
    setLoading(false);
  }
  
  if ( loading ) return <div className='flex flex-col items-center justify-center h-[70vh] gap-1 py-10'>
    <LoaderCircle size={28} className='text-emerald-500 animate-spin'/>
    <span className='font-bold text-white/20 font-sans'>AI is generating your mock data</span>
  </div>
  
  return (
    <div className=''>
      <form onSubmit={getMockData} className='flex items-center gap-2'>
        <Select value={numOfRows?.toString()} onValueChange={handleNumOfRowsSelect}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Number of Rows" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem defaultChecked defaultValue="5" value="5" descriptor="Ideal for accuracy of your schema.">5 rows</SelectItem>
            <SelectItem value="10" descriptor="Ideal for using in other applications.">10 rows</SelectItem>
            <SelectItem value="20" descriptor="Not recommended. Uses a lot of tokens.">20 rows</SelectItem>
          </SelectContent>
        </Select>
        <button 
          className='px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs'
        >{mockData ? "Regenerate" : "Generate"}</button>
      </form>
      {
        mockData && <MockDataResult data={mockData as {[_:string]:object[]}} />
      }
    </div>
  );
}