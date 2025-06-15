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
interface AccountCreationProps {
  onComplete?: () => void;
}

// Step 1: Basic Info Schema
const basicInfoSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
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

  // Forms
  const basicInfoForm = useForm({
    resolver: zodResolver(basicInfoSchema),
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
        {subStep === 1 && <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            <motion.div variants={itemVariants}>
              
              <h1 className="text-2xl font-bold text-center mb-2">Créer votre compte</h1>
              <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
                Commençons par quelques informations de base
              </p>
            </motion.div>

            <Form {...basicInfoForm}>
              <form onSubmit={basicInfoForm.handleSubmit(onBasicInfoSubmit)} className="space-y-4">
                <FormField control={basicInfoForm.control} name="fullName" render={({
              field
            }) => <FormItem>
                      <FormLabel>Nom complet</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input {...field} placeholder="Votre nom complet" className="pl-10" />
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                

                <FormField control={basicInfoForm.control} name="password" render={({
              field
            }) => <FormItem>
                      <FormLabel>Mot de passe</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input {...field} type="password" placeholder="Votre mot de passe" className="pl-10" />
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                <FormField control={basicInfoForm.control} name="confirmPassword" render={({
              field
            }) => <FormItem>
                      <FormLabel>Confirmer le mot de passe</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input {...field} type="password" placeholder="Confirmez votre mot de passe" className="pl-10" />
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                <motion.div variants={itemVariants} className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  En vous inscrivant, vous acceptez nos <a href="#" className="text-blue-500 hover:underline">Conditions d'utilisation</a>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button type="submit" className="w-full bg-gradient-to-r from-[#1F6FEB] to-[#8E44AD] text-white">
                    Continuer <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
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