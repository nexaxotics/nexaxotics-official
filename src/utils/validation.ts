export interface ValidationResult {
    isValid: boolean;
    error?: string;
}

export const validateWhatsApp = (phone: string): ValidationResult => {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Check if it's empty
    if (!cleaned) {
        return { isValid: false, error: 'Phone number is required' };
    }
    
    // Check if it's a valid Indian phone number (10 digits) or international (with country code)
    if (cleaned.length === 10) {
        // Indian mobile numbers start with 6, 7, 8, or 9
        if (!/^[6-9]/.test(cleaned)) {
            return { isValid: false, error: 'Invalid Indian mobile number' };
        }
        return { isValid: true };
    }
    
    // International format with country code (11-15 digits)
    if (cleaned.length >= 11 && cleaned.length <= 15) {
        return { isValid: true };
    }
    
    return { isValid: false, error: 'Phone number must be 10 digits or include country code' };
};

export const validateBusinessName = (name: string): ValidationResult => {
    const trimmed = name.trim();
    
    if (!trimmed) {
        return { isValid: false, error: 'Business name is required' };
    }
    
    if (trimmed.length < 2) {
        return { isValid: false, error: 'Business name must be at least 2 characters' };
    }
    
    if (trimmed.length > 100) {
        return { isValid: false, error: 'Business name must be less than 100 characters' };
    }
    
    return { isValid: true };
};

export const validateCity = (city: string): ValidationResult => {
    const trimmed = city.trim();
    
    if (!trimmed) {
        return { isValid: false, error: 'City is required' };
    }
    
    if (trimmed.length < 2) {
        return { isValid: false, error: 'City name must be at least 2 characters' };
    }
    
    // Only allow letters, spaces, hyphens, and common diacritics
    if (!/^[a-zA-Z\s\-À-ÿ]+$/.test(trimmed)) {
        return { isValid: false, error: 'City name can only contain letters, spaces, and hyphens' };
    }
    
    return { isValid: true };
};

export const formatWhatsAppNumber = (phone: string): string => {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // If it's 10 digits, add +91 for India
    if (cleaned.length === 10) {
        return `+91${cleaned}`;
    }
    
    // If it already has country code, add + if missing
    if (cleaned.length > 10 && !phone.startsWith('+')) {
        return `+${cleaned}`;
    }
    
    return phone;
};
