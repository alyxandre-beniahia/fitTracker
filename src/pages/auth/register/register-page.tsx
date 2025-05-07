import Stepper, { Step } from "@/components/stepper";
import { useState } from "react";
import { RegisterForm } from "./step1/register.form";
import { ProfileForm } from "./step2/profile.form";
import { ObjectifForm } from "./step3/objectif.form";

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleAccountCreated = () => {
    // Passer à l'étape suivante après création réussie du compte
    setCurrentStep(2);
  };

  return (
    <Stepper
      initialStep={currentStep}
      onStepChange={(step) => {
        setCurrentStep(step);
        console.log(step);
      }}
      onFinalStepCompleted={() => console.log("All steps completed!")}
    >
      <Step>
        <RegisterForm onSuccess={handleAccountCreated} />
      </Step>
      <Step>
        <ProfileForm />
      </Step>
      <Step>
        <ObjectifForm />
      </Step>
    </Stepper>
  );
}
