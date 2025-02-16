// src/services/abTestingUtils.ts
export type Variant = 'A' | 'B';

// Assign user to variant and store in localStorage if not already present
export function getUserVariant(): Variant {
    let variant = localStorage.getItem('userVariant') as Variant;

    if (!variant) {
        variant = Math.random() < 0.5 ? 'A' : 'B'; // Randomly assign A or B
        localStorage.setItem('userVariant', variant);
    }

    return variant;
}

// Track user interactions with event labels (always gets latest variant)
export function trackEvent(action: string, label: string) {
    const currentVariant = localStorage.getItem('userVariant') || 'Unknown'; // 🆕 Dynamic variant check
    const events = JSON.parse(localStorage.getItem('abTestingEvents') || '[]');
    const newEvent = {
        action,
        label: `${label} for Variant ${currentVariant}`, // 🆕 Attach current variant
        timestamp: new Date().toISOString(),
    };
    events.push(newEvent);
    localStorage.setItem('abTestingEvents', JSON.stringify(events));
}
