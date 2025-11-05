import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Comprehensive email validation utility
const validateEmail = (email: string) => {
  // Basic format check
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!email) {
    return { isValid: false, message: 'Email is required' };
  }
  
  if (email.length > 254) {
    return { isValid: false, message: 'Email is too long' };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }
  
  // Check for common typos
  const commonDomainTypos = {
    'gmail.co': 'gmail.com',
    'gamil.com': 'gmail.com',
    'gmai.com': 'gmail.com',
    'yahoo.co': 'yahoo.com',
    'hotmai.com': 'hotmail.com',
    'hotmial.com': 'hotmail.com',
    'outlok.com': 'outlook.com',
  };
  
  const domain = email.split('@')[1]?.toLowerCase();
  if (domain && commonDomainTypos[domain as keyof typeof commonDomainTypos]) {
    return { 
      isValid: false, 
      message: `Did you mean ${email.split('@')[0]}@${commonDomainTypos[domain as keyof typeof commonDomainTypos]}?`,
      suggestion: `${email.split('@')[0]}@${commonDomainTypos[domain as keyof typeof commonDomainTypos]}`
    };
  }
  
  // Check for missing TLD
  if (domain && !domain.includes('.')) {
    return { isValid: false, message: 'Email domain appears to be missing (.com, .org, etc.)' };
  }
  
  return { isValid: true, message: '' };
};

export const PreorderSection = () => {
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [emailSuggestion, setEmailSuggestion] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    
    // Clear previous errors and suggestions
    setEmailError('');
    setEmailSuggestion('');
    
    // Only validate if user has typed something
    if (newEmail.trim()) {
      const validation = validateEmail(newEmail.trim());
      if (!validation.isValid) {
        setEmailError(validation.message);
        if (validation.suggestion) {
          setEmailSuggestion(validation.suggestion);
        }
      }
    }
  };

  const handleSuggestionClick = () => {
    setEmail(emailSuggestion);
    setEmailError('');
    setEmailSuggestion('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsValidating(true);

    const trimmedEmail = email.trim();
    const validation = validateEmail(trimmedEmail);

    if (!validation.isValid) {
      setEmailError(validation.message);
      if (validation.suggestion) {
        setEmailSuggestion(validation.suggestion);
      }
      setIsValidating(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/waitlist/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMessage(data.message);
        setIsSubmitted(true);
        setEmailError('');
      } else {
        setEmailError(data.detail || data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setEmailError('Unable to connect to server. Please try again.');
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <section id="preorder" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-background relative">
      {/* Paper background texture */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23paper)' opacity='0.03'/%3E%3C/svg%3E")`,
          backgroundColor: isDark ? 'transparent' : 'hsl(45, 20%, 96%)',
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-8 sm:mb-12 leading-tight text-foreground">
            Try Theater now.
          </h2>

          <div className="max-w-md mx-auto">
            <div className="flex flex-col items-center justify-center">
              <form onSubmit={handleSubmit} className="w-full">
                <div className="flex flex-col gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={handleEmailChange}
                    className={`w-full rounded-full border px-6 py-4 text-base text-foreground placeholder-muted-foreground bg-background focus:outline-none focus:ring-2 disabled:opacity-50 transition-all duration-300 ${
                      emailError
                        ? 'border-muted-foreground/40 focus:border-muted-foreground focus:ring-muted-foreground/20'
                        : isSubmitted
                        ? 'border-foreground/50'
                        : 'border-border hover:border-foreground/30 focus:border-foreground focus:ring-foreground/20'
                    }`}
                    disabled={isValidating || isSubmitted}
                    required
                  />

                  {/* Reserved space for error/success/button - fixed height to prevent layout shift */}
                  <div className="min-h-[60px] flex flex-col items-center justify-center gap-2">
                    {isSubmitted ? (
                      <p className="text-sm text-foreground text-center font-medium whitespace-pre-line">{successMessage}</p>
                    ) : emailError ? (
                      <>
                        <p className="text-sm text-muted-foreground text-center">{emailError}</p>
                        {emailSuggestion && (
                          <button
                            type="button"
                            onClick={handleSuggestionClick}
                            className="text-sm text-muted-foreground hover:text-foreground text-center underline"
                          >
                            Use: {emailSuggestion}
                          </button>
                        )}
                      </>
                    ) : email.trim() && validateEmail(email.trim()).isValid ? (
                      <button
                        type="submit"
                        disabled={isValidating}
                        className="w-full rounded-full bg-foreground px-8 py-4 text-base font-medium text-background transition-all duration-300 hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isValidating ? 'Submitting...' : 'Reserve Access'}
                      </button>
                    ) : null}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
