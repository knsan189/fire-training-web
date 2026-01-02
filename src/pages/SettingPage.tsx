import TargetGroupCard from "../features/targetGroup/components/TargetGroupCard"
import PrerequisiteCard from "../features/prerequisite/components/PrerequisiteCard"
import ExerciseTypeCard from "../features/exerciseType/components/ExerciseTypeCard"

const SettingPage = () => {
  return (
    <>
      <ExerciseTypeCard />
      <TargetGroupCard />
      <PrerequisiteCard />
    </>
  )
}

export default SettingPage
