import { useState } from "react";
import { motion } from "framer-motion";
import { useOnboarding } from "@/context/OnboardingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, Lock, User, Phone, Check, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import AvatarSelector from "./AvatarSelector";
import { Eye, EyeOff, Check, X, User, Mail, Lock, ArrowRight } from "lucide-react";
import { zodFrMessages } from "@/lib/validation-fr";

interface AccountCreationProps {
  onComplete?: () => void;
}

// Step 1: Basic Info Schema
const basicInfoSchema = z.object({
  fullName: z.string()
    .min(2, zodFrMessages.min_fullname),
  email: z.string()
    .email(zodFrMessages.invalid_email),
  password: z.string()
    .min(8, zodFrMessages.min_password),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: zodFrMessages.password_mismatch,
  path: ["confirmPassword"]
});

// Step 2: Phone Verification Schema
const phoneSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number must be valid")
});

// Step 3: Profile Setup Schema
const profileSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters")
});
export const AccountCreation = ({
  onComplete
}: AccountCreationProps) => {
  const {
    setFullName,
    setEmail,
    setPassword,
    setPhoneNumber,
    setVerificationCode,
    profilePicture,
    setProfilePicture,
    setUsername
  } = useOnboarding();
  const [subStep, setSubStep] = useState(1);
  const [verificationCode, setVerificationCodeLocal] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // Ajout d'un état pour afficher ou masquer le mot de passe
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Forms
  const basicInfoForm = useForm({
    resolver: zodResolver(
      z.object({
        fullName: z.string()
          .min(2, zodFrMessages.min_fullname),
        email: z.string()
          .email(zodFrMessages.invalid_email),
        password: z.string()
          .min(8, zodFrMessages.min_password),
        confirmPassword: z.string()
      }).refine(data => data.password === data.confirmPassword, {
        message: zodFrMessages.password_mismatch,
        path: ["confirmPassword"]
      })
    ),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });
  const phoneForm = useForm({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phoneNumber: ""
    }
  });
  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: ""
    }
  });

  // Form submissions
  const onBasicInfoSubmit = (data: z.infer<typeof basicInfoSchema>) => {
    setFullName(data.fullName);
    setEmail(data.email);
    setPassword(data.password);
    setSubStep(2);
  };
  const onPhoneSubmit = (data: z.infer<typeof phoneSchema>) => {
    setPhoneNumber(data.phoneNumber);
    setIsVerifying(true);
    toast.success("Code de vérification envoyé à votre téléphone");
  };
  const onVerifyCode = () => {
    if (verificationCode.length === 6) {
      setVerificationCode(verificationCode);
      setSubStep(3);
      setIsVerifying(false);
    } else {
      toast.error("Le code doit avoir 6 chiffres");
    }
  };
  const onProfileSubmit = (data: z.infer<typeof profileSchema>) => {
    setUsername(data.username);
    setSubStep(4); // Show success screen
  };
  const handleContinue = () => {
    if (onComplete) {
      onComplete();
    }
  };

  // Skip the current step (for prototype testing)
  const skipStep = () => {
    if (subStep === 1) {
      // Set default values for basic info
      setFullName("Utilisateur Test");
      setEmail("test@monavenir.com");
      setPassword("password123");
      setSubStep(2);
    } else if (subStep === 2) {
      // Set default values for phone verification
      setPhoneNumber("+212612345678");
      setVerificationCode("123456");
      setSubStep(3);
    } else if (subStep === 3) {
      // Set default values for profile
      setUsername("utilisateur_test");
      setSubStep(4);
    } else if (subStep === 4) {
      // Continue to next step
      handleContinue();
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };
  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1
    },
    exit: {
      y: -20,
      opacity: 0
    }
  };
  return <div className="px-4 py-4 max-w-md mx-auto">
      <div className="w-full max-w-md mx-auto">
        {/* Progress indicator */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4].map(s => <div key={s} className={`h-2 rounded-full flex-1 mx-1 ${subStep >= s ? "bg-gradient-to-r from-[#1F6FEB] to-[#8E44AD]" : "bg-gray-200 dark:bg-gray-700"}`} />)}
        </div>

        <div className="text-right mb-2">
          <Button variant="ghost" size="sm" className="text-xs text-gray-500" onClick={skipStep}>
            {subStep < 4 ? "Ignorer cette étape" : "Terminer"}
          </Button>
        </div>

        {/* Step 1: Basic Information */}
        {subStep === 1 && <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6 mb-2">
            {/* Avatar facultatif */}
            <div className="flex flex-col items-center mb-1">
              <AvatarSelector profilePicture={profilePicture} onSelectPicture={setProfilePicture} />
              <div className="text-xs text-gray-500 mt-1">Photo de profil (optionnel)</div>
            </div>

            {/* Texte d'intro */}
            <motion.div variants={itemVariants}>
              <h1 className="text-2xl font-bold text-center mb-2">Créer votre compte</h1>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-2">
                Créez votre profil pour personnaliser votre expérience.
              </p>
            </motion.div>

            <Form {...basicInfoForm}>
              <form onSubmit={basicInfoForm.handleSubmit(onBasicInfoSubmit)} className="space-y-5">
                {/* Nom complet */}
                <FormField
                  control={basicInfoForm.control}
                  name="fullName"
                  render={({ field }) => {
                    const state = basicInfoForm.getFieldState("fullName");
                    const value = field.value;
                    const touched = state.isTouched || value.length > 0;
                    const error = state.error;
                    return (
                      <FormItem>
                        <FormLabel className={error ? "text-[#e54e47]" : "text-gray-700"}>
                          Nom complet
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              placeholder="Ex. Mohamed El Fassi"
                              className={`
                                bg-gray-50 dark:bg-gray-800 shadow border border-gray-200 dark:border-gray-700 px-10 py-2 focus:ring-[#1F6FEB] transition-all 
                                ${error ? "border-[#e54e47] focus:border-[#e54e47]" : ""}
                              `}
                              autoComplete="name"
                            />
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            {/* Validation icon */}
                            {touched && (
                              error
                                ? <X className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#e54e47]" aria-label="erreur" />
                                : value.length > 1
                                  ? <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" aria-label="valide" />
                                  : null
                            )}
                          </div>
                        </FormControl>
                        <div className="text-xs text-gray-400 mt-1">Votre nom tel qu'il apparaît sur vos documents</div>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                {/* Email */}
                <FormField
                  control={basicInfoForm.control}
                  name="email"
                  render={({ field }) => {
                    const state = basicInfoForm.getFieldState("email");
                    const value = field.value;
                    const touched = state.isTouched || value.length > 0;
                    const error = state.error;
                    return (
                      <FormItem>
                        <FormLabel className={error ? "text-[#e54e47]" : "text-gray-700"}>
                          Email
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type="email"
                              placeholder="exemple@domaine.com"
                              className={`
                                bg-gray-50 dark:bg-gray-800 shadow border border-gray-200 dark:border-gray-700 px-10 py-2 focus:ring-[#1F6FEB] transition-all 
                                ${error ? "border-[#e54e47] focus:border-[#e54e47]" : ""}
                              `}
                              autoComplete="email"
                            />
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            {touched && (
                              error
                                ? <X className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#e54e47]" aria-label="erreur" />
                                : /\S+@\S+\.\S+/.test(value)
                                  ? <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" aria-label="valide" />
                                  : null
                            )}
                          </div>
                        </FormControl>
                        <div className="text-xs text-gray-400 mt-1">Adresse à laquelle vous recevrez nos notifications</div>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                {/* Mot de passe */}
                <FormField
                  control={basicInfoForm.control}
                  name="password"
                  render={({ field }) => {
                    const state = basicInfoForm.getFieldState("password");
                    const touched = state.isTouched || field.value.length > 0;
                    const error = state.error;
                    return (
                      <FormItem>
                        <FormLabel className={error ? "text-[#e54e47]" : "text-gray-700"}>
                          Mot de passe
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="Votre mot de passe"
                              className={`
                                bg-gray-50 dark:bg-gray-800 shadow border border-gray-200 dark:border-gray-700 px-10 py-2 focus:ring-[#1F6FEB] transition-all 
                                ${error ? "border-[#e54e47] focus:border-[#e54e47]" : ""}
                              `}
                              autoComplete="new-password"
                            />
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <button
                              type="button"
                              className="absolute right-9 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-gray-700 transition"
                              tabIndex={-1}
                              onClick={() => setShowPassword((v) => !v)}
                            >
                              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                            {touched && (
                              error
                                ? <X className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#e54e47]" aria-label="erreur" />
                                : field.value.length >= 8
                                  ? <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" aria-label="valide" />
                                  : null
                            )}
                          </div>
                        </FormControl>
                        <div className="text-xs text-gray-400 mt-1">Au moins 8 caractères, dont une majuscule</div>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                {/* Confirmation */}
                <FormField
                  control={basicInfoForm.control}
                  name="confirmPassword"
                  render={({ field }) => {
                    const state = basicInfoForm.getFieldState("confirmPassword");
                    const touched = state.isTouched || field.value.length > 0;
                    const error = state.error;
                    // On ne montre la coche de validation que si ça matche ET c'est non vide
                    const isValid =
                      field.value.length > 0 &&
                      field.value === basicInfoForm.watch("password") &&
                      !error;
                    return (
                      <FormItem>
                        <FormLabel className={error ? "text-[#e54e47]" : "text-gray-700"}>
                          Confirmer le mot de passe
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirmez votre mot de passe"
                              className={`
                                bg-gray-50 dark:bg-gray-800 shadow border border-gray-200 dark:border-gray-700 px-10 py-2 focus:ring-[#1F6FEB] transition-all 
                                ${error ? "border-[#e54e47] focus:border-[#e54e47]" : ""}
                              `}
                              autoComplete="new-password"
                            />
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <button
                              type="button"
                              className="absolute right-9 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-gray-700 transition"
                              tabIndex={-1}
                              onClick={() => setShowConfirmPassword((v) => !v)}
                            >
                              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                            {touched && (
                              error
                                ? <X className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#e54e47]" aria-label="erreur" />
                                : isValid
                                  ? <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" aria-label="valide" />
                                  : null
                            )}
                          </div>
                        </FormControl>
                        <div className="text-xs text-gray-400 mt-1">Saisissez à nouveau le mot de passe choisi</div>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                {/* Conditions & bouton */}
                <div className="flex flex-col gap-2 pt-2">
                  <div className="text-xs text-gray-500 text-center mb-2 leading-relaxed">
                    En vous inscrivant, vous acceptez nos{" "}
                    <a href="#" className="text-blue-500 underline underline-offset-2 hover:opacity-80 transition-all duration-150">
                      Conditions d'utilisation
                    </a>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#1F6FEB] to-[#8E44AD] text-white shadow-md py-3 transition-all duration-150 active:scale-98"
                    style={{ minHeight: 48, fontSize: 16, fontWeight: 600 }}
                  >
                    Continuer <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Form>
          </motion.div>}

        {/* Step 2: Phone Verification */}
        {subStep === 2 && <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            <motion.div variants={itemVariants}>
              <h1 className="text-2xl font-bold text-center mb-2">Vérifiez votre téléphone</h1>
              <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
                Nous enverrons un code par SMS pour vérifier votre identité
              </p>
            </motion.div>

            {!isVerifying ? <Form {...phoneForm}>
                <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-4">
                  <FormField control={phoneForm.control} name="phoneNumber" render={({
              field
            }) => <FormItem>
                        <FormLabel>Numéro de téléphone</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input {...field} placeholder="+212 6XX XXX XXX" className="pl-10" />
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />

                  <motion.div variants={itemVariants}>
                    <Button type="submit" className="w-full bg-gradient-to-r from-[#1F6FEB] to-[#8E44AD] text-white">
                      Envoyer le code
                    </Button>
                  </motion.div>
                </form>
              </Form> : <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                <motion.div variants={itemVariants}>
                  <p className="text-center mb-4">
                    Entrez le code à 6 chiffres envoyé au numéro 
                    <span className="font-medium"> {phoneForm.getValues().phoneNumber}</span>
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-center">
                  <InputOTP maxLength={6} value={verificationCode} onChange={setVerificationCodeLocal} render={({
              slots
            }) => <InputOTPGroup>
                        {slots.map((slot, idx) => <InputOTPSlot key={idx} {...slot} index={idx} />)}
                      </InputOTPGroup>} />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button onClick={onVerifyCode} className="w-full bg-gradient-to-r from-[#1F6FEB] to-[#8E44AD] text-white">
                    Vérifier le code
                  </Button>
                </motion.div>

                <motion.div variants={itemVariants} className="text-center">
                  <button type="button" onClick={() => setIsVerifying(false)} className="text-sm text-[#1F6FEB] hover:underline">
                    Modifier le numéro
                  </button>
                </motion.div>
              </motion.div>}
          </motion.div>}

        {/* Step 3: Profile Setup */}
        {subStep === 3 && <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            <motion.div variants={itemVariants}>
              <h1 className="text-2xl font-bold text-center mb-2">Personnalisez votre profil</h1>
              <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
                Ajoutez une photo et choisissez un nom d'utilisateur unique
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-center mb-6">
              <AvatarSelector profilePicture={profilePicture} onSelectPicture={setProfilePicture} />
            </motion.div>

            <Form {...profileForm}>
              <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                <FormField control={profileForm.control} name="username" render={({
              field
            }) => <FormItem>
                      <FormLabel>Nom d'utilisateur</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input {...field} placeholder="@username" className="pl-10" />
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                <motion.div variants={itemVariants}>
                  <Button type="submit" className="w-full bg-gradient-to-r from-[#1F6FEB] to-[#8E44AD] text-white">
                    Finaliser le profil
                  </Button>
                </motion.div>
              </form>
            </Form>
          </motion.div>}

        {/* Step 4: Success Screen */}
        {subStep === 4 && <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8 text-center">
            <motion.div initial={{
          scale: 0
        }} animate={{
          scale: 1
        }} transition={{
          type: "spring",
          damping: 12
        }} className="w-24 h-24 rounded-full bg-gradient-to-r from-[#1F6FEB] to-[#8E44AD] flex items-center justify-center mx-auto">
              <Check className="h-12 w-12 text-white" />
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-2xl font-bold">
              🎉 Votre compte a été créé avec succès!
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-400">
              C'est le moment de connaître un peu plus vos habitudes financières.
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <Button onClick={handleContinue} className="w-full bg-gradient-to-r from-[#1F6FEB] to-[#8E44AD] text-white">
                Continuer <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>}
      </div>
    </div>;
};
export default AccountCreation;
