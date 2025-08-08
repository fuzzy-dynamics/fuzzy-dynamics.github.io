import { useState } from 'react';
import { AuthButtons } from './AuthButtons';
import { SlidingEaseVerticalBars } from './SlidingEaseVerticalBars';

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
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [emailSuggestion, setEmailSuggestion] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
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
        if (data.already_exists) {
          // User is already on the waitlist
          setSuccessMessage(data.message);
          setIsSubmitted(true);
        } else if (data.verification_sent) {
          // Need to verify email
          setShowVerification(true);
          setEmailError('');
        }
      } else {
        setEmailError(data.detail || data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setEmailError('Unable to connect to server. Please try again.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setVerificationError('');

    if (!verificationCode.trim() || verificationCode.length !== 6) {
      setVerificationError('Please enter a valid 6-digit code.');
      setIsVerifying(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/waitlist/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email.trim(), 
          verification_code: verificationCode.trim() 
        }),
      });

      const data = await response.json();

      if (response.ok && data.success && data.verified) {
        setSuccessMessage(data.message);
        setIsSubmitted(true);
        setShowVerification(false);
      } else {
        setVerificationError(data.message || 'Invalid verification code. Please try again.');
      }
    } catch (error) {
      setVerificationError('Unable to connect to server. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    setIsValidating(true);
    setVerificationError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/waitlist/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.success && data.verification_sent) {
        setVerificationError('');
        // Show a temporary success message
        setVerificationError('New verification code sent! Please check your email.');
        setTimeout(() => setVerificationError(''), 3000);
      } else {
        setVerificationError(data.message || 'Failed to resend code. Please try again.');
      }
    } catch (error) {
      setVerificationError('Unable to connect to server. Please try again.');
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <section id="preorder" className="pt-8 sm:pt-12 pb-16 sm:pb-24 bg-background relative">
      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="xl:grid xl:grid-cols-2 xl:gap-16 2xl:gap-20 xl:items-start max-w-7xl mx-auto">
          {/* Animated Background - Left Side */}
          <div className="hidden xl:flex justify-center items-start xl:pl-20 2xl:pl-24 xl:pt-8">
            <div className="w-full max-w-lg 2xl:max-w-xl">
              <SlidingEaseVerticalBars />
            </div>
          </div>

          {/* Content - Right Side */}
          <div className="text-center xl:pr-8 2xl:pr-12">
            <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 leading-tight">
              Join the future of
              <span className="block text-primary">
                making
              </span>
            </h2>

            <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto xl:mx-0 px-4 sm:px-0">
              {/* Fixed height container to prevent layout shifts */}
              <div className="min-h-[420px] flex flex-col justify-center">
                {!isSubmitted ? (
                  <div className="flex h-full w-full flex-col items-center justify-center">
                    {!showVerification ? (
                      <form onSubmit={handleSubmit} className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md">
                        <div className="flex flex-col gap-4">
                          <div className="space-y-2">
                            <input
                              type="email"
                              placeholder="Enter your email address"
                              value={email}
                              onChange={handleEmailChange}
                              className={`w-full rounded-lg border px-4 py-3 text-foreground placeholder-muted-foreground bg-background focus:outline-none focus:ring-1 disabled:opacity-50 transition-all duration-300 ${
                                emailError 
                                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                                  : 'border-border hover:border-primary/50 focus:border-primary focus:ring-primary'
                              }`}
                              disabled={isValidating}
                              required
                            />
                            {emailError && (
                              <p className="text-sm text-red-500 text-left">{emailError}</p>
                            )}
                            {emailSuggestion && (
                              <button
                                type="button"
                                onClick={handleSuggestionClick}
                                className="text-sm text-primary hover:text-primary/80 text-left underline"
                              >
                                Use: {emailSuggestion}
                              </button>
                            )}
                          </div>
                          <button
                            type="submit"
                            disabled={!!emailError || !email.trim() || isValidating}
                            className="w-full rounded-md bg-primary px-6 py-3 text-[16px] font-medium text-primary-foreground transition-colors duration-300 hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <span className="flex items-center justify-center gap-2">
                              {isValidating ? 'Validating...' : 'Reserve Access'}
                            </span>
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md">
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-semibold text-foreground mb-2">Check your email</h3>
                          <p className="text-muted-foreground text-sm">
                            We've sent a 6-digit verification code to <span className="font-medium">{email}</span>
                          </p>
                        </div>
                        
                        <form onSubmit={handleVerificationSubmit} className="space-y-4">
                          <div className="space-y-2">
                            <input
                              type="text"
                              placeholder="Enter 6-digit code"
                              value={verificationCode}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                                setVerificationCode(value);
                                setVerificationError('');
                              }}
                              className={`w-full rounded-lg border px-4 py-3 text-center text-2xl tracking-widest font-mono text-foreground placeholder-muted-foreground bg-background focus:outline-none focus:ring-1 disabled:opacity-50 transition-all duration-300 ${
                                verificationError 
                                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                                  : 'border-border hover:border-primary/50 focus:border-primary focus:ring-primary'
                              }`}
                              disabled={isVerifying}
                              maxLength={6}
                              required
                            />
                            {verificationError && (
                              <p className={`text-sm text-left ${verificationError.includes('sent') ? 'text-green-600' : 'text-red-500'}`}>
                                {verificationError}
                              </p>
                            )}
                          </div>
                          
                          <div className="space-y-3">
                            <button
                              type="submit"
                              disabled={verificationCode.length !== 6 || isVerifying}
                              className="w-full rounded-md bg-primary px-6 py-3 text-[16px] font-medium text-primary-foreground transition-colors duration-300 hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {isVerifying ? 'Verifying...' : 'Verify Code'}
                            </button>
                            
                            <div className="text-center">
                              <button
                                type="button"
                                onClick={handleResendCode}
                                disabled={isValidating}
                                className="text-sm text-muted-foreground hover:text-foreground underline disabled:opacity-50"
                              >
                                Didn't receive the code? Resend
                              </button>
                            </div>
                            
                            <div className="text-center">
                              <button
                                type="button"
                                onClick={() => {
                                  setShowVerification(false);
                                  setVerificationCode('');
                                  setVerificationError('');
                                }}
                                className="text-sm text-muted-foreground hover:text-foreground underline"
                              >
                                Change email address
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    )}
                    
                    {!showVerification && (
                      <div className="mt-8">
                        <AuthButtons />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center space-y-4 flex flex-col justify-center">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">You're in!</h3>
                    <p className="text-muted-foreground">
                      {successMessage || "We'll notify you when early access opens. Check your email for next steps. Mail us if you have any ideas or questions."}
                    </p>
                  </div>
                )}
                
                {!isSubmitted && (
                  <div className="flex items-center justify-center mt-6">
                    <div className="tech-mono text-muted-foreground">
                      Limited Beta • Starting Soon
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};