export interface StepProps {
  onNext: () => void
  onPrevious: () => void
  isFirstStep?: boolean
  isLastStep?: boolean
}
