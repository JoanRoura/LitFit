// import React from 'react';
// import { View, Text } from 'react-native';
// import { useSet } from '../hooks/useSet';
// import { Exercise } from '../interfaces/exerciseInterface';
// import { styles } from '../theme/appTheme';

// interface Props {
//     exercises: Exercise[];
// }

// const ExerciseList = ({ exercises }: Props) => {
//     return (
//         <View>
//             {exercises.map((exercise) => (
//                 <ExerciseItem key={exercise.id} exercise={exercise} />
//             ))}
//         </View>
//     );
// };

// const ExerciseItem = ({ exercise }: { exercise: Exercise }) => {
//     const { sets } = useSet(exercise.id!);

//     return (
//         <View>
//             <Text style={styles.text}>{exercise.name}</Text>
//             <View>
//                 {sets.map((set: any, index: any) => (
//                     <Text key={index} style={styles.text}>
//                         {`Set ${index + 1}: ${set.reps} reps`}
//                     </Text>
//                 ))}
//             </View>
//         </View>
//     );
// };

// export default ExerciseList;
