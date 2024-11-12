import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { FormEvent, useState } from 'react'

type ExportOptions = "django" | "prisma" | "eloquent" | "drizzle";

export default function ExportSchemaToORMSection() {
  const [ output, setOutput ] = useState("");
  const [ exportOption, setExportOption ] = useState<ExportOptions>("django");
  
  const handleChangeExportOption = (option: ExportOptions) => setExportOption(option);
  
  return (
    <div>
      <form onSubmit={() => {}} className='flex items-center gap-2'>
          <Select value={exportOption} onValueChange={handleChangeExportOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Export Option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="django" descriptor="Export to django models and migrate">Django</SelectItem>
              <SelectItem value="prisma" descriptor="Export to prisma models and migrate">Prisma</SelectItem>
              <SelectItem disabled value="eloquent" descriptor="Export to eloquent models and migrate">Eloquent</SelectItem>
              <SelectItem disabled value="drizzle" descriptor="Export to drizzle models and migrate">Drizzle</SelectItem>
            </SelectContent>
          </Select>
          <button 
            className='px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm'
          >{output ? "Regenerate" : "Generate"}</button>
        </form>
    </div>    
  );
}