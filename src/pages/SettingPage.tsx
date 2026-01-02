import TargetGroupCard from "../features/targetGroup/components/TargetGroupCard"
import PrerequisiteCard from "../features/prerequisite/components/PrerequisiteCard"
import ExerciseTypeCard from "../features/exerciseType/components/ExerciseTypeCard"

const SettingPage = () => {
  return (
    <>
      <PrerequisiteCard />
      <TargetGroupCard />
      <ExerciseTypeCard />
    </>
  )
}

export default SettingPage
