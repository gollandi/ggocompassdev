import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MapPin, Clock, ExternalLink, AlertTriangle, Copy, Check } from "lucide-react";
import { getEmergencyContacts } from "../../lib/sanity/queries";

interface EmergencyContactsProps {
  procedureSlug?: string;
  locationSlug?: string;
  className?: string;
  compact?: boolean;
}

interface EmergencyContactData {
  procedure: {
    name: string;
    emergencyContacts?: {
      urgentLine?: string;
      consultantTeam?: string;
      specialistNurse?: string;
    };
  };
  location: {
    name: string;
    contacts: {
      main: { phone: string; email?: string; hours?: string };
      booking?: { phone?: string; email?: string; hours?: string };
      ward?: { phone?: string; nurseStation?: string; hours?: string };
      emergency?: {
        urgentLine?: string;
        outOfHours?: string;
        consultantSecretary?: string;
      };
    };
    address: {
      street: string;
      city: string;
      postcode: string;
    };
  };
  ukEmergencyNumbers: {
    emergency: string;
    medicalAdvice: string;
    description: string;
  };
}

export function EmergencyContacts({ 
  procedureSlug, 
  locationSlug, 
  className = "",
  compact = false 
}: EmergencyContactsProps) {
  const [contactData, setContactData] = useState<EmergencyContactData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  useEffect(() => {
    if (procedureSlug && locationSlug) {
      getEmergencyContacts(procedureSlug, locationSlug)
        .then(setContactData)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [procedureSlug, locationSlug]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPhone(text);
      setTimeout(() => setCopiedPhone(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const PhoneButton = ({ number, label, priority = "normal" }: { number: string; label: string; priority?: "emergency" | "urgent" | "normal" }) => {
    const getButtonStyle = () => {
      switch (priority) {
        case "emergency":
          return "bg-red-600 hover:bg-red-700 text-white";
        case "urgent":
          return "bg-orange-600 hover:bg-orange-700 text-white";
        default:
          return "bg-ggo-teal hover:bg-ggo-teal/90 text-white";
      }
    };

    return (
      <button
        onClick={() => copyToClipboard(number)}
        className={`
          flex items-center justify-between w-full p-3 rounded-lg transition-all
          ${getButtonStyle()}
          hover:scale-[1.02] active:scale-[0.98]
        `}
      >
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          <div className="text-left">
            <div className="font-medium">{number}</div>
            <div className="text-xs opacity-90">{label}</div>
          </div>
        </div>
        <div className="ml-2">
          {copiedPhone === number ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </div>
      </button>
    );
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-xl p-6 shadow-md ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-12 bg-gray-100 rounded"></div>
            <div className="h-12 bg-gray-100 rounded"></div>
            <div className="h-12 bg-gray-100 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!contactData) {
    return (
      <div className={`bg-white rounded-xl p-6 shadow-md ${className}`}>
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-red-600" />
          <h3 className="text-lg font-semibold text-ggo-navy">UK Emergency Numbers</h3>
        </div>
        <div className="space-y-3">
          <PhoneButton number="999" label="Life-threatening emergencies" priority="emergency" />
          <PhoneButton number="111" label="Urgent medical advice (NHS)" priority="urgent" />
        </div>
      </div>
    );
  }

  if (compact) {
    return (
      <div className={`bg-white rounded-lg p-4 shadow-sm ${className}`}>
        <div className="space-y-2">
          <PhoneButton number="999" label="Emergency" priority="emergency" />
          <PhoneButton number="111" label="NHS 111" priority="urgent" />
          {contactData.location.contacts.emergency?.urgentLine && (
            <PhoneButton 
              number={contactData.location.contacts.emergency.urgentLine} 
              label="Clinical urgent line" 
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl p-6 shadow-md ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-red-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-ggo-navy">Emergency Contacts</h3>
          <p className="text-sm text-ggo-text-muted">
            {contactData.procedure.name} at {contactData.location.name}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* UK Emergency Numbers */}
        <div>
          <h4 className="text-sm font-semibold text-ggo-navy mb-2">UK Emergency Numbers</h4>
          <div className="space-y-2">
            <PhoneButton number="999" label="Life-threatening emergencies" priority="emergency" />
            <PhoneButton number="111" label="Urgent medical advice (NHS)" priority="urgent" />
          </div>
        </div>

        {/* Hospital/Clinic Emergency Contacts */}
        <div>
          <h4 className="text-sm font-semibold text-ggo-navy mb-2">
            {contactData.location.name} Contacts
          </h4>
          <div className="space-y-2">
            {contactData.location.contacts.emergency?.urgentLine && (
              <PhoneButton 
                number={contactData.location.contacts.emergency.urgentLine} 
                label="Clinical urgent line" 
                priority="urgent"
              />
            )}
            
            {contactData.location.contacts.ward?.phone && (
              <PhoneButton 
                number={contactData.location.contacts.ward.phone} 
                label="Ward contact" 
              />
            )}
            
            {contactData.location.contacts.main.phone && (
              <PhoneButton 
                number={contactData.location.contacts.main.phone} 
                label="Main reception" 
              />
            )}
            
            {contactData.location.contacts.emergency?.outOfHours && (
              <PhoneButton 
                number={contactData.location.contacts.emergency.outOfHours} 
                label="Out of hours" 
              />
            )}
          </div>
        </div>

        {/* Procedure-Specific Contacts */}
        {contactData.procedure.emergencyContacts && (
          <div>
            <h4 className="text-sm font-semibold text-ggo-navy mb-2">
              {contactData.procedure.name} Team
            </h4>
            <div className="space-y-2">
              {contactData.procedure.emergencyContacts.urgentLine && (
                <PhoneButton 
                  number={contactData.procedure.emergencyContacts.urgentLine} 
                  label="Specialist urgent line" 
                  priority="urgent"
                />
              )}
              
              {contactData.procedure.emergencyContacts.consultantTeam && (
                <PhoneButton 
                  number={contactData.procedure.emergencyContacts.consultantTeam} 
                  label="Consultant team" 
                />
              )}
              
              {contactData.procedure.emergencyContacts.specialistNurse && (
                <PhoneButton 
                  number={contactData.procedure.emergencyContacts.specialistNurse} 
                  label="Specialist nurse" 
                />
              )}
            </div>
          </div>
        )}

        {/* Address Information */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-ggo-text-muted mt-0.5" />
            <div>
              <h5 className="text-sm font-medium text-ggo-navy">Hospital Address</h5>
              <p className="text-sm text-ggo-text-muted">
                {contactData.location.address.street}<br />
                {contactData.location.address.city} {contactData.location.address.postcode}
              </p>
            </div>
          </div>
        </div>

        {/* General Guidance */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-blue-600 mt-0.5" />
            <div>
              <h5 className="text-sm font-medium text-blue-800">When to Call</h5>
              <ul className="text-sm text-blue-700 space-y-1 mt-1">
                <li>• <strong>999:</strong> Severe bleeding, difficulty breathing, loss of consciousness</li>
                <li>• <strong>111:</strong> Concerning symptoms outside normal hours</li>
                <li>• <strong>Clinical team:</strong> Questions about your specific recovery</li>
              </ul>
            </div>
          </div>
        </div>

        {copiedPhone && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center text-sm text-green-600 font-medium"
          >
            Copied {copiedPhone} to clipboard
          </motion.div>
        )}
      </div>
    </div>
  );
}
