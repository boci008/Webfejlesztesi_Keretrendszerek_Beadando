export interface MedicationRequest {
    id?: string;
    // from Resource: id, meta, implicitRules, and language
  // from DomainResource: text, contained, extension, and modifierExtension
    identifier ?: string[]; // External ids for this request
    status: 'active' | 'on-hold' | 'cancelled' | 'completed' | 'entered-in-error' | 'stopped' | 'draft' | 'unknown'; // R!  active | on-hold | cancelled | completed | entered-in-error | stopped | draft | unknown
    // https://stackoverflow.com/questions/26855423/how-to-require-a-specific-string-in-typescript-interface
    statusReason ?: string; // Reason for current status
    intent: 'proposal' | 'plan' | 'order' | 'original-order' | 'reflex-order' | 'filler-order' | 'instance-order' | 'option'; // R!  proposal | plan | order | original-order | reflex-order | filler-order | instance-order | option
    category ?: string[]; // Type of medication usage
    priority ?: string; // routine | urgent | asap | stat
    doNotPerform ?: boolean; // True if request is prohibiting action
    reportedBoolean ?: boolean; // reported[x]: Reported rather than primary record.
    medication: string; // medication[x]: Medication to be taken.
    subject: string; // R!  Who or group medication request is for
    encounter ?: string; // Encounter created as part of encounter/admission/stay
    supportingInformation ?: string[]; // Information to support ordering of the medication
    authoredOn ?: Date; // When request was initially authored
    requester ?: string; // Who/What requested the Request
    performer ?: string; // Intended performer of administration
    performerType ?: string; // Desired kind of performer of the medication administration
    recorder ?: string; // Person who entered the request
    reasonCode ?: string[]; // Reason or indication for ordering or not ordering the medication
    reasonReference ?: string[]; // Condition or observation that supports why the prescription is being written
    instantiatesCanonical ?: string[]; // Instantiates FHIR protocol or definition
    instantiatesUri ?: string[]; // Instantiates external protocol or definition
    basedOn ?: string[]; // What request fulfills
    groupIdentifier ?: string; // Composite request this is part of
    courseOfTherapyType ?: string; // Overall pattern of medication administration
    insurance ?: string[]; // Associated insurance coverage
    note ?: string[]; // Information about the prescription
    dosageInstruction ?: string[]; // How the medication should be taken
    dispenseRequest ?: { // Medication supply authorization
        initialFill ?: { // First fill details
        quantity ?: string, // First fill quantity
        duration ?: string // First fill duration
        },
        dispenseInterval ?: string, // Minimum period of time between dispenses
        validityPeriod ?: string, // Time period supply is authorized for
        numberOfRepeatsAllowed ?: number, // Number of refills authorized
        quantity ?: number, // Amount of medication to supply per dispense
        expectedSupplyDuration ?: number, // Number of days supply per dispense
        performer ?: string // Intended dispenser
    };
    substitution ?: { // Any restrictions on medication substitution
        allowedBoolean: boolean, // allowed[x]: Whether substitution is allowed or not.
        reason ?: string // Why should (not) substitution be made
    };
    priorPrescription ?: MedicationRequest; // An order/prescription that is being replaced
    detectedIssue ?: string[]; // Clinical Issue with action
    eventHistory ?: string[]; // A list of events of interest in the lifecycle
}
