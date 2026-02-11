'use client';

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Search, MapPin } from "lucide-react";
import { GGOButton } from "../ggo/GGOButton";
import { FooterDisclaimer } from "../ggo/FooterDisclaimer";
import { getProcedures, getLocations, type Procedure, type Location } from "../../lib/sanity/queries";
import Image from 'next/image';
import { urlForImage } from '@/lib/sanity/image';

interface ProcedurePickerScreenProps {
  onNext: (selection: { procedure: Procedure; location: Location }) => void;
}

export function ProcedurePickerScreen({ onNext }: ProcedurePickerScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSite, setSelectedSite] = useState<Location | null>(null);
  const [selectedProcedure, setSelectedProcedure] = useState<Procedure | null>(null);
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch procedures and locations from Sanity
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [proceduresData, locationsData] = await Promise.all([
          getProcedures(),
          getLocations()
        ]);

        // Merge Sanity data over hardcoded procedures to guarantee minimum coverage
        setProcedures(mergeProceduresWithFallback(proceduresData));

        if (!locationsData || locationsData.length === 0) {
          console.log('Sanity returned no locations, using hardcoded fallback');
          setLocations(getHardcodedLocations());
        } else {
          setLocations(locationsData);
        }
      } catch (error) {
        console.error('Error fetching data from Sanity:', error);
        console.log('Using hardcoded content library as fallback');
        setProcedures(getHardcodedProcedures());
        setLocations(getHardcodedLocations());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to get hardcoded procedures
  function getHardcodedProcedures(): Procedure[] {
    return [
      {
        _id: "hardcoded-circumcision",
        name: "Circumcision",
        slug: { current: "circumcision" },
        totalRecoveryDays: 14,
        category: "urological",
        isActive: true,
        description: "Surgical removal of the foreskin",
      } as Procedure,
      {
        _id: "hardcoded-frenuloplasty",
        name: "Frenuloplasty",
        slug: { current: "frenuloplasty" },
        totalRecoveryDays: 10,
        category: "urological",
        isActive: true,
        description: "Surgical correction of a tight or short frenulum",
      } as Procedure,
      {
        _id: "hardcoded-varicocele-single",
        name: "Varicocele Repair (Single-sided)",
        slug: { current: "varicocele-single" },
        totalRecoveryDays: 21,
        category: "urological",
        isActive: true,
        description: "Microsurgical repair of enlarged veins in the scrotum",
      } as Procedure,
      {
        _id: "hardcoded-varicocele-bilateral",
        name: "Varicocele Repair (Bilateral)",
        slug: { current: "varicocele-bilateral" },
        totalRecoveryDays: 28,
        category: "urological",
        isActive: true,
        description: "Microsurgical repair of varicoceles on both sides",
      } as Procedure,
      {
        _id: "hardcoded-tese",
        name: "Microscope-Assisted TeSE",
        slug: { current: "tese" },
        totalRecoveryDays: 7,
        category: "fertility",
        isActive: true,
        description: "Testicular sperm extraction for fertility treatment",
      } as Procedure,
      {
        _id: "hardcoded-flexible-cystoscopy",
        name: "Flexible Cystoscopy",
        slug: { current: "flexible-cystoscopy" },
        totalRecoveryDays: 3,
        category: "diagnostic",
        isActive: true,
        description: "Bladder examination using a flexible camera",
      } as Procedure,
      {
        _id: "hardcoded-rigid-cystoscopy",
        name: "Rigid Cystoscopy & Bladder Biopsy",
        slug: { current: "rigid-cystoscopy-biopsy" },
        totalRecoveryDays: 5,
        category: "diagnostic",
        isActive: true,
        description: "Bladder examination and tissue sampling under anaesthetic",
      } as Procedure,
      {
        _id: "hardcoded-turp",
        name: "TURP",
        slug: { current: "turp" },
        totalRecoveryDays: 28,
        category: "urological",
        isActive: true,
        description: "Transurethral resection of the prostate",
      } as Procedure,
    ];
  }


  function getProcedureSlugKey(procedure: Procedure): string | null {
    const slug = procedure.slug?.current?.trim().toLowerCase();
    return slug ? slug : null;
  }


  function mergeProcedureWithFallback(fallback: Procedure, override: Procedure): Procedure {
    const merged: Procedure = {
      ...fallback,
      ...override,
      slug: override.slug ?? fallback.slug,
    };

    for (const [key, value] of Object.entries(fallback)) {
      const mergedValue = (merged as unknown as Record<string, unknown>)[key];
      if (mergedValue === undefined || mergedValue === null) {
        (merged as unknown as Record<string, unknown>)[key] = value;
      }
    }

    return merged;
  }

  // Merge Sanity procedures on top of hardcoded defaults (slug match)
  function mergeProceduresWithFallback(sanityProcedures?: Procedure[] | null): Procedure[] {
    const hardcoded = getHardcodedProcedures();
    if (!sanityProcedures || sanityProcedures.length === 0) {
      console.log('Sanity returned no procedures, using hardcoded content library');
      return hardcoded;
    }

    const hardcodedBySlug = new Map<string, Procedure>();
    const hardcodedOrder: string[] = [];

    for (const procedure of hardcoded) {
      const slugKey = getProcedureSlugKey(procedure);
      if (!slugKey) {
        continue;
      }
      hardcodedBySlug.set(slugKey, procedure);
      hardcodedOrder.push(slugKey);
    }

    const sanityOnly: Procedure[] = [];

    for (const procedure of sanityProcedures) {
      const slugKey = getProcedureSlugKey(procedure);
      if (!slugKey) {
        sanityOnly.push(procedure);
        continue;
      }

      const fallback = hardcodedBySlug.get(slugKey);
      if (fallback) {
        hardcodedBySlug.set(slugKey, mergeProcedureWithFallback(fallback, procedure));
      } else {
        sanityOnly.push(procedure);
      }
    }

    const merged = hardcodedOrder
      .map((slugKey) => hardcodedBySlug.get(slugKey))
      .filter((procedure): procedure is Procedure => Boolean(procedure));

    return [...merged, ...sanityOnly];
  }

  // Helper function to get hardcoded locations
  function getHardcodedLocations(): Location[] {
    return [
      {
        _id: "fallback-location-chelsea",
        name: "Chelsea",
        slug: { current: "chelsea" },
        shortName: "Chelsea",
        address: { street: "", city: "London", postcode: "SW10", country: "UK" },
        contacts: {
          main: { phone: "+44 20 0000 0000" },
        },
        isActive: true,
      } as Location,
      {
        _id: "fallback-location-highgate",
        name: "Highgate",
        slug: { current: "highgate" },
        shortName: "Highgate",
        address: { street: "", city: "London", postcode: "N6", country: "UK" },
        contacts: {
          main: { phone: "+44 20 0000 0001" },
        },
        isActive: true,
      } as Location,
    ];
  }

  const filteredProcedures = procedures.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNext = () => {
    if (selectedProcedure && selectedSite) {
      onNext({ procedure: selectedProcedure, location: selectedSite });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 py-12 px-6 md:px-24">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h1 className="mb-4 text-ggo-navy">Loading procedures and locations...</h1>
              <p className="text-ggo-text-muted font-medium">
                Please wait while we fetch the latest data.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ggo-teal"></div>
            </div>
          </div>
        </div>
        <FooterDisclaimer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 py-12 px-6 md:px-24">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Header */}
          <div className="mb-12">
            <h1 className="mb-4 text-ggo-navy">Select your hospital and procedure</h1>
            <p className="text-ggo-text-muted font-medium">
              Here's where we begin.
            </p>
          </div>

          {/* Site Selector - FIRST per Board feedback */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <h3 className="mb-4 text-ggo-navy flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Hospital Site
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {locations.map((location) => {
                const isSelected = selectedSite?._id === location._id;
                return (
                  <motion.button
                    key={location._id}
                    onClick={() => setSelectedSite(location)}
                    className={`
                    p-6 rounded-xl transition-all duration-300 text-left shadow-md
                    ${isSelected
                        ? 'bg-ggo-teal text-white ring-4 ring-ggo-teal/30'
                        : 'bg-white text-ggo-navy hover:bg-ggo-light'
                      }
                  `}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {location.logo?.asset && (
                        <div className="h-8 w-8 rounded bg-white/70 border border-ggo-navy/10 flex items-center justify-center overflow-hidden">
                          <Image
                            src={urlForImage(location.logo).width(64).height(64).fit('max').url()}
                            alt={location.logo?.alt || `${location.name} logo`}
                            width={24}
                            height={24}
                          />
                        </div>
                      )}
                      <h4 className="font-medium">{location.name}</h4>
                    </div>
                    <p className={`text-xs mt-1 font-medium ${isSelected ? 'text-white/80' : 'text-ggo-text-muted'}`}>
                      {location.shortName || 'GGO Med Ltd.'}
                    </p>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ggo-text-muted" />
              <input
                type="text"
                placeholder="Search procedures..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border-2 border-transparent focus:border-ggo-teal focus:outline-none transition-colors shadow-md"
              />
            </div>
          </motion.div>

          {/* Procedure Chips */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <h3 className="mb-4 text-ggo-navy">Procedure</h3>
            <div className="flex flex-wrap gap-2">
              {filteredProcedures.map((procedure) => {
                const isSelected = selectedProcedure?._id === procedure._id;
                return (
                  <motion.button
                    key={procedure._id}
                    onClick={() => setSelectedProcedure(procedure)}
                    className={`
                    px-4 py-2 rounded-xl transition-all duration-200 shadow-sm
                    ${isSelected
                        ? 'bg-ggo-teal text-white shadow-md scale-105'
                        : 'bg-white text-ggo-navy hover:bg-ggo-teal/10 hover:shadow-md'
                      }
                  `}
                    style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      padding: '8px 16px',
                    }}
                    whileHover={{ scale: isSelected ? 1.05 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {procedure.name}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>

          {/* Summary & Next Button */}
          {selectedProcedure && selectedSite && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
                <h4 className="mb-2 text-ggo-navy">Your selection</h4>
                <p className="text-ggo-text-muted font-medium">
                  {selectedProcedure.name} at {selectedSite.name}
                </p>
              </div>
              <div className="text-center">
                <GGOButton
                  variant="primary"
                  onClick={handleNext}
                  className="min-h-[48px]"
                >
                  Continue
                </GGOButton>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      <FooterDisclaimer />
    </div>
  );
}
