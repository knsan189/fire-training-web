import TargetGroupCard from "../features/targetGroup/components/TargetGroupCard"
import PrerequisiteCard from "../features/prerequisite/components/PrerequisiteCard"
import ExerciseTypeCard from "../features/exerciseType/components/ExerciseTypeCard"
import EquipmentCard from "../features/equipment/components/EquipmentCard"

const SettingPage = () => {
  return (
    <>
      <ExerciseTypeCard />
      <TargetGroupCard />
      <PrerequisiteCard />
      <EquipmentCard />
    </>
  )
}

export default SettingPage
