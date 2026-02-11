'use client';

import { useRouter } from 'next/navigation';
import { ProcedurePickerScreen } from '@/components/screens/ProcedurePickerScreen';
import type { Procedure, Location } from '@/lib/sanity/queries';
import { saveProcedureSelection, saveSiteSelection, dispatchSelectionChange } from '@/utils/userPreferences';

export default function ProcedurePage() {
  const router = useRouter();

  const handleProcedureNext = ({ procedure, location }: { procedure: Procedure; location: Location }) => {
    sessionStorage.setItem('ggo-procedure', procedure.name);
    sessionStorage.setItem('ggo-procedure-slug', procedure.slug?.current || '');
    sessionStorage.setItem('ggo-procedure-id', procedure._id);
    sessionStorage.setItem('ggo-site', location.name);
    sessionStorage.setItem('ggo-site-slug', location.slug?.current || '');
    sessionStorage.setItem('ggo-site-id', location._id);
    saveProcedureSelection({
      name: procedure.name,
      slug: procedure.slug?.current || '',
      id: procedure._id,
    });
    saveSiteSelection({
      name: location.name,
      slug: location.slug?.current || '',
      id: location._id,
    });
    dispatchSelectionChange();
    
    // Check mode - explore mode skips date input
    const mode = sessionStorage.getItem('ggo-mode');
    if (mode === 'explore') {
      router.push('/timeline');
    } else {
      router.push('/date');
    }
  };

  return (
    <ProcedurePickerScreen
      onNext={handleProcedureNext}
    />
  );
}
